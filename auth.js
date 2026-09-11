import { auth, db, isFirebaseConfigured } from "./firebase.js";
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { collection, doc, getDoc, getDocs, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const authScreen = document.querySelector("#authScreen");
const authStatus = document.querySelector("#authStatus");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
const forgotPasswordButton = document.querySelector("#forgotPasswordButton");
let creatingAccount = false;
const showStatus = (message, error = false) => { authStatus.textContent = message; authStatus.classList.toggle("error", error); };
const setAuthHistory = (signedIn) => {
  const url = signedIn ? "#dashboard" : `${window.location.pathname}${window.location.search}`;
  if (signedIn && !window.history.state?.emoraAuthenticated) {
    window.history.pushState({ emoraAuthenticated: true }, "", url);
    return;
  }
  window.history.replaceState({ emoraAuthenticated: signedIn }, "", url);
};
function selectAuthTab(tab) {
  const login = tab === "login";
  loginForm.hidden = !login; signupForm.hidden = login;
  document.querySelectorAll("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button.dataset.authTab === tab));
}
function updateUserUi(user, userData = {}) {
  if (!user) return;
  const emailName = String(user.email || "").split("@")[0];
  const name = String(userData.name || user.displayName || userData.username || emailName || "Member").trim();
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const welcome = document.querySelector("#welcomeTitle");
  if (welcome) {
    const nameLine = document.createElement("span");
    nameLine.className = "user-name";
    nameLine.textContent = name;
    const wave = document.createElement("span");
    wave.className = "wave";
    wave.setAttribute("aria-hidden", "true");
    wave.textContent = "👋";
    welcome.replaceChildren("Welcome", document.createElement("br"), nameLine, wave);
  }
  const avatar = document.querySelector("#profileInitials");
  if (avatar) avatar.textContent = initials;
  const topbarName = document.querySelector("#topbarProfileName");
  if (topbarName) topbarName.textContent = name;
  const profileAvatar = document.querySelector("#profileAvatar");
  if (profileAvatar) profileAvatar.textContent = initials.charAt(0);
  const profileName = document.querySelector("#profileNameDisplay");
  if (profileName) profileName.textContent = name;
  const profileEmail = document.querySelector("#profileEmailDisplay");
  if (profileEmail) profileEmail.textContent = user.email;
}
function getLocalDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function dayDifference(from, to) {
  const start = new Date(`${from}T12:00:00`);
  const end = new Date(`${to}T12:00:00`);
  return Math.round((end - start) / 86_400_000);
}
function renderStreak(streak) {
  const count = Math.max(1, Number(streak) || 1);
  const message = count === 1 ? "Your journey starts today." : "You are building a steady routine.";
  document.querySelector("#dailyMessage")?.replaceChildren(document.createTextNode(message));
  document.querySelector("#streakCount")?.replaceChildren(document.createTextNode(`Day ${count}`));
  document.querySelectorAll("[data-nav-streak-count]").forEach((element) => {
    element.replaceChildren(document.createTextNode(String(count)));
  });
}
async function updateUserStreak(user, data) {
  const today = getLocalDayKey();
  const previousDay = typeof data.lastActiveDate === "string" ? data.lastActiveDate : "";
  const previousStreak = Math.max(1, Number(data.streak) || 1);
  const streak = previousDay === today
    ? previousStreak
    : previousDay && dayDifference(previousDay, today) === 1
      ? previousStreak + 1
      : 1;
  renderStreak(streak);
  if (previousDay !== today || data.streak !== streak) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        streak,
        lastActiveDate: today,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Unable to save user streak", { message: error.message });
    }
  }
}
async function loadUserData(user) {
  const snapshot = await getDoc(doc(db, "users", user.uid));
  const data = snapshot.exists() ? snapshot.data() : {};
  const profile = data.profile || {};
  ["profileAge", "profileGender", "profileLanguage"].forEach((id) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.value = profile[id] || "";
  });
  document.querySelector("#profileAgeDisplay")?.replaceChildren(document.createTextNode(profile.profileAge || "—"));
  document.querySelector("#profileGenderDisplay")?.replaceChildren(document.createTextNode(profile.profileGender || "Prefer not to say"));
  document.querySelector("#profileLanguageDisplay")?.replaceChildren(document.createTextNode(profile.profileLanguage || "English"));
  const goals = data.goals || [];
  document.querySelectorAll(".goal-picker input").forEach((input) => { input.checked = goals.includes(input.value); });
  window.dispatchEvent(new CustomEvent("emora:user-data", { detail: data }));
  return data;
}
async function showApp(user) {
  document.body.classList.toggle("authenticated", Boolean(user));
  authScreen.hidden = Boolean(user);
  if (!user) {
    loginForm.reset();
    signupForm.reset();
    setAuthHistory(false);
    return;
  }
  const userData = await loadUserData(user);
  updateUserUi(user, userData);
  await updateUserStreak(user, userData);
  setAuthHistory(true);
  window.emoraSetView?.("dashboard", { history: "replace" });
}
const loginError = "Incorrect email or password";
const signupError = "Unable to create account. Please try again.";
async function saveUserData(user, data) { if (db && user) await setDoc(doc(db, "users", user.uid), { ...data, updatedAt: serverTimestamp() }, { merge: true }); }

document.querySelectorAll("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => { selectAuthTab(button.dataset.authTab); showStatus(""); }));
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.closest(".password-field")?.querySelector("input");
    if (!input) return;
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.setAttribute("aria-pressed", String(showPassword));
    button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
  });
});

if (!isFirebaseConfigured) {
  document.body.classList.add("auth-ready");
  showStatus("Add your Firebase web configuration in firebase-config.js to enable accounts.", true);
} else {
  await setPersistence(auth, browserSessionPersistence);
  onAuthStateChanged(auth, async (user) => {
    if (creatingAccount) return;
    await showApp(user);
    document.body.classList.add("auth-ready");
    if (user) showStatus("");
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) showApp(auth.currentUser);
  });
  window.addEventListener("popstate", () => {
    // The only entry before the authenticated app is the Login screen. Going
    // back to it ends the session, so Forward cannot expose a cached dashboard.
    if (!window.location.hash && auth.currentUser) {
      clearLocalWellnessData();
      showApp(null);
      signOut(auth);
    } else if (!auth.currentUser) {
      showApp(null);
    }
  });
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); const form = new FormData(loginForm);
    try {
      const credential = await signInWithEmailAndPassword(auth, form.get("email"), form.get("password"));
      await showApp(credential.user);
    } catch (_error) { showStatus(loginError, true); }
  });
  forgotPasswordButton?.addEventListener("click", async () => {
    const email = String(new FormData(loginForm).get("email") || "").trim();
    if (!email) return showStatus("Enter your email address first.", true);
    try {
      await sendPasswordResetEmail(auth, email);
      showStatus("If that email is registered, you'll receive a reset link.");
    } catch (_error) {
      showStatus("If that email is registered, you'll receive a reset link.");
    }
  });
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); const form = new FormData(signupForm);
    try {
      creatingAccount = true;
      const username = String(form.get("username") || "").trim();
      const displayName = String(form.get("displayName") || "").trim();
      const credential = await createUserWithEmailAndPassword(auth, form.get("email"), form.get("password"));
      await updateProfile(credential.user, { displayName });
      await saveUserData(credential.user, { name: displayName, username, email: credential.user.email, createdAt: serverTimestamp() });
      await signOut(auth);
      creatingAccount = false;
      selectAuthTab("login");
      signupForm.reset();
      showStatus("Account created. Please log in.");
    } catch (_error) {
      creatingAccount = false;
      showStatus(signupError, true);
    }
  });
}
function clearLocalWellnessData() {
  Object.keys(localStorage).filter((key) => key.startsWith("emora-")).forEach((key) => localStorage.removeItem(key));
}

function distanceInKm(from, to) {
  const toRadians = (value) => value * Math.PI / 180;
  const earthRadiusKm = 6371;
  const latitudeDistance = toRadians(to.latitude - from.latitude);
  const longitudeDistance = toRadians(to.longitude - from.longitude);
  const a = Math.sin(latitudeDistance / 2) ** 2
    + Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(longitudeDistance / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function getNearbyDoctors(location) {
  if (!db || !auth?.currentUser) return [];
  const doctorsSnapshot = await getDocs(collection(db, "doctors"));
  const doctors = await Promise.all(doctorsSnapshot.docs.map(async (doctorDocument) => {
    const doctor = doctorDocument.data();
    const latitude = Number(doctor.latitude);
    const longitude = Number(doctor.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || doctor.active === false) return null;
    const distanceKm = distanceInKm(location, { latitude, longitude });
    const serviceRadiusKm = Math.max(1, Number(doctor.serviceRadiusKm) || 50);
    if (distanceKm > serviceRadiusKm) return null;
    const ratingsSnapshot = await getDocs(collection(db, "doctors", doctorDocument.id, "ratings"));
    const submittedRatings = ratingsSnapshot.docs
      .map((ratingDocument) => ({ userId: ratingDocument.id, ...ratingDocument.data() }))
      .filter((rating) => Number.isFinite(Number(rating.rating)) && Number(rating.rating) >= 1 && Number(rating.rating) <= 5);
    const ownerRatingCount = Math.max(0, Number(doctor.ratingCount) || 0);
    const ownerRatingAverage = Math.min(5, Math.max(0, Number(doctor.ratingAverage) || 0));
    const submittedTotal = submittedRatings.reduce((sum, rating) => sum + Number(rating.rating), 0);
    const ratingCount = ownerRatingCount + submittedRatings.length;
    const ratingAverage = ratingCount ? ((ownerRatingAverage * ownerRatingCount) + submittedTotal) / ratingCount : 0;
    const ownRating = submittedRatings.find((rating) => rating.userId === auth.currentUser.uid);
    return {
      id: doctorDocument.id,
      ...doctor,
      distanceKm,
      ratingAverage,
      ratingCount,
      userRating: Number(ownRating?.rating) || 0,
      helpReceived: ownRating?.helpReceived === true
    };
  }));
  return doctors.filter(Boolean).sort((a, b) => a.distanceKm - b.distanceKm);
}

async function saveDoctorRating(doctorId, rating) {
  if (!db || !auth?.currentUser) throw new Error("Sign in required");
  const safeRating = Math.min(5, Math.max(1, Number(rating)));
  await setDoc(doc(db, "doctors", doctorId, "ratings", auth.currentUser.uid), {
    userId: auth.currentUser.uid,
    rating: safeRating,
    helpReceived: true,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

window.emoraAuth = {
  signOut: async () => {
    clearLocalWellnessData();
    loginForm.reset();
    signupForm.reset();
    setAuthHistory(false);
    if (auth) await signOut(auth);
  },
  saveUserData: (data) => auth?.currentUser ? saveUserData(auth.currentUser, data) : Promise.resolve(),
  getNearbyDoctors,
  saveDoctorRating
};
