import crypto from "node:crypto";
import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import nodemailer from "nodemailer";
import { z } from "zod";

const BCRYPT_ROUNDS = 12;
const LOGIN_MESSAGE = "Incorrect email or password";
const INVALID_MESSAGE = "Invalid request.";
const SIGNUP_MESSAGE = "Unable to create account. Please try again.";
const RESET_MESSAGE = "If that email is registered, you'll receive a reset link";
const MAX_REQUESTS = 10;
const WINDOW_MS = 60_000;
const LOCK_MS = 15 * 60_000;

function firebaseApp() {
  if (admin.apps.length) return admin.app();
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "{}");
  return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = () => firebaseApp().firestore();
const auth = () => firebaseApp().auth();

// User-facing strings are normalized before validation. Passwords deliberately are
// not sanitized/mutated: changing a password silently would lower entropy and make
// its stored value differ from what the person entered. Unsafe characters are rejected.
const plainText = (value) => String(value ?? "")
  .replace(/<[^>]*>/g, "")
  .replace(/[\u0000-\u001F\u007F]/g, "")
  .trim();
const emailValue = (value) => plainText(value).toLowerCase();
const nameValue = (value) => plainText(value).replace(/[^a-zA-Z0-9 .'-]/g, "").replace(/\s+/g, " ");

const email = z.string().transform(emailValue).pipe(z.string().email().max(254));
const password = z.string().min(12).max(128).refine((value) => !/[<>\u0000-\u001F\u007F]/.test(value));
const username = z.string().transform(nameValue).pipe(z.string().min(3).max(30).regex(/^[a-zA-Z0-9][a-zA-Z0-9 .'-]*$/));
const displayName = z.string().transform(nameValue).pipe(z.string().min(1).max(80).regex(/^[a-zA-Z0-9][a-zA-Z0-9 .'-]*$/));
const loginSchema = z.object({ email, password }).strict();
const signupSchema = z.object({ email, password, username, displayName }).strict();
const resetSchema = z.object({ email }).strict();
const newPasswordSchema = z.object({ token: z.string().length(64).regex(/^[a-f0-9]+$/), password }).strict();

// Replace this in-memory Map with Redis/Upstash in multi-instance production.
const attempts = new Map();
const rateBuckets = new Map();
const accountKey = (email) => crypto.createHash("sha256").update(email).digest("hex");
const safeEqual = (left, right) => {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

function rateLimit(request, response, next) {
  const now = Date.now();
  const ip = request.ip || "unknown";
  const bucket = rateBuckets.get(ip) || { count: 0, startedAt: now };
  if (now - bucket.startedAt >= WINDOW_MS) Object.assign(bucket, { count: 0, startedAt: now });
  bucket.count += 1;
  rateBuckets.set(ip, bucket);
  if (bucket.count > MAX_REQUESTS) return response.status(429).json({ message: LOGIN_MESSAGE });
  next();
}

function canAttempt(email) {
  const state = attempts.get(accountKey(email));
  const now = Date.now();
  return !state || (state.lockedUntil || state.nextAllowedAt || 0) <= now;
}

function registerFailure(email) {
  const key = accountKey(email);
  const state = attempts.get(key) || { failures: 0 };
  state.failures += 1;
  state.nextAllowedAt = Date.now() + Math.min(8_000, 500 * 2 ** (state.failures - 1));
  if (state.failures >= 5) state.lockedUntil = Date.now() + LOCK_MS;
  attempts.set(key, state);
  return state.lockedUntil;
}
const clearFailures = (email) => attempts.delete(accountKey(email));

async function sendResetEmail(email, token) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
  await transporter.sendMail({ from: process.env.MAIL_FROM, to: email, subject: "Reset your Emora password", text: `Reset your password: ${resetUrl}` });
}

async function storeResetToken(userId, email) {
  const token = crypto.randomBytes(32).toString("hex");
  await db().collection("authUsers").doc(userId).update({
    resetTokenHash: crypto.createHash("sha256").update(token).digest("hex"),
    resetExpiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + LOCK_MS)
  });
  sendResetEmail(email, token).catch((error) => console.error("Password reset email failed", { userId, message: error.message }));
}

async function verifyAndUpgradePassword(userRef, user, suppliedPassword) {
  const stored = user.passwordHash || "";
  if (stored.startsWith("$2")) {
    const matches = await bcrypt.compare(suppliedPassword, stored);
    if (matches && bcrypt.getRounds(stored) < BCRYPT_ROUNDS) await userRef.update({ passwordHash: await bcrypt.hash(suppliedPassword, BCRYPT_ROUNDS) });
    return matches;
  }
  // One-time legacy migration. Existing Firebase Authentication hashes cannot be
  // exported; those accounts must use a password-reset flow before this API is enabled.
  const legacyPassword = stored.startsWith("legacy_plain:") ? stored.slice(13) : "";
  if (!legacyPassword || !safeEqual(suppliedPassword, legacyPassword)) return false;
  await userRef.update({ passwordHash: await bcrypt.hash(suppliedPassword, BCRYPT_ROUNDS), migratedAt: admin.firestore.FieldValue.serverTimestamp() });
  return true;
}

export function createAuthRouter() {
  const router = express.Router();

  router.post("/login", rateLimit, async (request, response, next) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) { console.warn("Auth validation failed", { route: "login", ip: request.ip }); return response.status(401).json({ message: LOGIN_MESSAGE }); }
    const { email, password: suppliedPassword } = parsed.data;
    try {
      if (!canAttempt(email)) return response.status(401).json({ message: LOGIN_MESSAGE });
      const query = await db().collection("authUsers").where("email", "==", email).limit(1).get();
      const record = query.docs[0];
      const valid = record && await verifyAndUpgradePassword(record.ref, record.data(), suppliedPassword);
      if (!valid) {
        const lockedUntil = registerFailure(email);
        if (lockedUntil && record) await storeResetToken(record.id, email);
        return response.status(401).json({ message: LOGIN_MESSAGE });
      }
      clearFailures(email);
      const token = await auth().createCustomToken(record.id);
      response.json({ token });
    } catch (error) { next(error); }
  });

  router.post("/signup", async (request, response, next) => {
    const parsed = signupSchema.safeParse(request.body);
    if (!parsed.success) { console.warn("Auth validation failed", { route: "signup", ip: request.ip }); return response.status(400).json({ message: INVALID_MESSAGE }); }
    const { email, password: suppliedPassword, username: safeUsername, displayName: safeDisplayName } = parsed.data;
    try {
      const existing = await db().collection("authUsers").where("email", "==", email).limit(1).get();
      if (!existing.empty) return response.status(400).json({ message: SIGNUP_MESSAGE });
      const user = await auth().createUser({ email, displayName: safeDisplayName });
      await db().collection("authUsers").doc(user.uid).set({ email, username: safeUsername, displayName: safeDisplayName, passwordHash: await bcrypt.hash(suppliedPassword, BCRYPT_ROUNDS), createdAt: admin.firestore.FieldValue.serverTimestamp() });
      await db().collection("users").doc(user.uid).set({ name: safeDisplayName, username: safeUsername, email, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      response.status(201).json({ message: "Account created. Please log in." });
    } catch (error) {
      if (error.code === "auth/email-already-exists") return response.status(400).json({ message: SIGNUP_MESSAGE });
      next(error);
    }
  });

  router.post("/password-reset", async (request, response, next) => {
    const parsed = resetSchema.safeParse(request.body);
    if (!parsed.success) { console.warn("Auth validation failed", { route: "password-reset", ip: request.ip }); return response.json({ message: RESET_MESSAGE }); }
    try {
      const query = await db().collection("authUsers").where("email", "==", parsed.data.email).limit(1).get();
      if (!query.empty) await storeResetToken(query.docs[0].id, parsed.data.email);
      response.json({ message: RESET_MESSAGE });
    } catch (error) { next(error); }
  });

  router.post("/password-reset/confirm", async (request, response, next) => {
    const parsed = newPasswordSchema.safeParse(request.body);
    if (!parsed.success) { console.warn("Auth validation failed", { route: "password-reset-confirm", ip: request.ip }); return response.status(400).json({ message: INVALID_MESSAGE }); }
    try {
      const hash = crypto.createHash("sha256").update(parsed.data.token).digest("hex");
      const query = await db().collection("authUsers").where("resetTokenHash", "==", hash).limit(1).get();
      const record = query.docs[0];
      const expiresAt = record?.data().resetExpiresAt?.toMillis?.() || 0;
      if (!record || expiresAt < Date.now()) return response.status(400).json({ message: INVALID_MESSAGE });
      await record.ref.update({ passwordHash: await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS), resetTokenHash: admin.firestore.FieldValue.delete(), resetExpiresAt: admin.firestore.FieldValue.delete() });
      clearFailures(record.data().email);
      response.json({ message: "Password updated." });
    } catch (error) { next(error); }
  });

  return router;
}
