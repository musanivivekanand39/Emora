import { auth, db, isFirebaseConfigured } from "./firebase.js";
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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
    welcome.replaceChildren("Welcome ", document.createElement("br"), nameLine, wave);
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
  const streakDots = document.querySelector(".streak-dots");
  if (streakDots) {
    const ticks = document.createDocumentFragment();
    const visibleTickCount = Math.min(count, 7);
    for (let day = 0; day < visibleTickCount; day += 1) {
      const tick = document.createElement("i");
      tick.textContent = "✓";
      ticks.append(tick);
    }
    streakDots.replaceChildren(ticks);
  }
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
  try {
    const cleanEmail = (user.email || "").trim().toLowerCase();
    const cleanName = user.displayName || userData.name || userData.displayName || (cleanEmail ? cleanEmail.split("@")[0] : "Member");
    if (cleanEmail) {
      await saveUserData(user, {
        email: cleanEmail,
        name: cleanName,
        username: userData.username || cleanEmail.split("@")[0]
      });
    }
  } catch (syncErr) {
    console.warn("Unable to sync email to Firestore:", syncErr);
  }
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

function requireUser() {
  if (!auth?.currentUser) throw new Error("You must be logged in to perform this action.");
  return auth.currentUser;
}

async function searchUsersByEmail(searchQuery) {
  const user = requireUser();
  const raw = String(searchQuery || "").trim();
  const trimmedLower = raw.toLowerCase();
  if (!trimmedLower) return [];

  const foundDocsMap = new Map();

  // 1. Direct query: lowercase email
  try {
    const qEmail = query(collection(db, "users"), where("email", "==", trimmedLower));
    const snap = await getDocs(qEmail);
    snap.docs.forEach((docSnap) => foundDocsMap.set(docSnap.id, docSnap));
  } catch (err) {
    console.warn("Direct email query error:", err);
  }

  // 2. Direct query: raw email
  if (foundDocsMap.size === 0 && raw !== trimmedLower) {
    try {
      const qEmailExact = query(collection(db, "users"), where("email", "==", raw));
      const snapExact = await getDocs(qEmailExact);
      snapExact.docs.forEach((docSnap) => foundDocsMap.set(docSnap.id, docSnap));
    } catch (_e) {}
  }

  // 3. Direct query: username
  if (foundDocsMap.size === 0) {
    try {
      const qUser = query(collection(db, "users"), where("username", "==", raw));
      const snapUser = await getDocs(qUser);
      snapUser.docs.forEach((docSnap) => foundDocsMap.set(docSnap.id, docSnap));
    } catch (_e) {}
  }

  // 4. Robust fallback collection scan: catches any user regardless of case,
  // leading/trailing whitespace, or whether email was stored in profile/email fields!
  if (foundDocsMap.size === 0) {
    try {
      const allUsersSnap = await getDocs(collection(db, "users"));
      for (const docSnap of allUsersSnap.docs) {
        if (docSnap.id === user.uid) continue;
        const d = docSnap.data() || {};
        const dEmail = String(d.email || d.userEmail || d.profile?.email || "").toLowerCase().trim();
        const dUsername = String(d.username || "").toLowerCase().trim();
        const dName = String(d.name || d.displayName || "").toLowerCase().trim();

        const matchEmail = Boolean(dEmail && (
          dEmail === trimmedLower ||
          dEmail.startsWith(trimmedLower) ||
          trimmedLower.startsWith(dEmail) ||
          (trimmedLower.includes("@") && dEmail.includes(trimmedLower)) ||
          (!trimmedLower.includes("@") && dEmail.split("@")[0] === trimmedLower)
        ));

        const matchUser = Boolean(dUsername && (dUsername === trimmedLower || dUsername === raw.toLowerCase()));
        const matchName = Boolean(dName && (dName === trimmedLower || (trimmedLower.length >= 3 && dName.includes(trimmedLower))));

        if (matchEmail || matchUser || matchName) {
          foundDocsMap.set(docSnap.id, docSnap);
        }
      }
    } catch (scanErr) {
      console.warn("User fallback scan error:", scanErr);
    }
  }

  const results = [];
  for (const userDoc of foundDocsMap.values()) {
    if (userDoc.id === user.uid) continue;

    const data = userDoc.data();
    const otherUid = userDoc.id;

    const q1 = query(collection(db, "friendships"), where("user1", "==", user.uid), where("user2", "==", otherUid));
    const q2 = query(collection(db, "friendships"), where("user1", "==", otherUid), where("user2", "==", user.uid));
    const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    const isFriend = !s1.empty || !s2.empty;

    let relationship = "none";
    let pendingRequestId = null;

    if (isFriend) {
      relationship = "friends";
    } else {
      const sentQuery = query(collection(db, "friendRequests"), where("senderId", "==", user.uid), where("receiverId", "==", otherUid), where("status", "==", "pending"));
      const receivedQuery = query(collection(db, "friendRequests"), where("senderId", "==", otherUid), where("receiverId", "==", user.uid), where("status", "==", "pending"));
      const [sentSnap, receivedSnap] = await Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]);

      if (!sentSnap.empty) {
        relationship = "pending_sent";
        pendingRequestId = sentSnap.docs[0].id;
      } else if (!receivedSnap.empty) {
        relationship = "pending_received";
        pendingRequestId = receivedSnap.docs[0].id;
      }
    }

    results.push({
      uid: otherUid,
      name: data.name || data.displayName || data.username || (data.email ? String(data.email).split("@")[0] : "Member"),
      email: data.email || data.userEmail || data.profile?.email || "",
      username: data.username || "",
      relationship,
      pendingRequestId
    });
  }
  return results;
}

const searchUsersByUsername = searchUsersByEmail;

async function sendFriendRequest(receiverId) {
  const user = requireUser();
  if (receiverId === user.uid) throw new Error("You cannot send a friend request to yourself.");

  const targetSnap = await getDoc(doc(db, "users", receiverId));
  if (!targetSnap.exists()) throw new Error("User not found.");
  const targetData = targetSnap.data();

  const q1 = query(collection(db, "friendships"), where("user1", "==", user.uid), where("user2", "==", receiverId));
  const q2 = query(collection(db, "friendships"), where("user1", "==", receiverId), where("user2", "==", user.uid));
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  if (!s1.empty || !s2.empty) throw new Error("You are already friends with this user.");

  const sentQ = query(collection(db, "friendRequests"), where("senderId", "==", user.uid), where("receiverId", "==", receiverId), where("status", "==", "pending"));
  const recvQ = query(collection(db, "friendRequests"), where("senderId", "==", receiverId), where("receiverId", "==", user.uid), where("status", "==", "pending"));
  const [sentSnap, recvSnap] = await Promise.all([getDocs(sentQ), getDocs(recvQ)]);
  if (!sentSnap.empty || !recvSnap.empty) throw new Error("A friend request is already pending.");

  const mySnap = await getDoc(doc(db, "users", user.uid));
  const myData = mySnap.exists() ? mySnap.data() : {};

  const requestDoc = await addDoc(collection(db, "friendRequests"), {
    senderId: user.uid,
    receiverId: receiverId,
    senderName: myData.name || myData.displayName || user.displayName || "Member",
    senderEmail: user.email || myData.email || "",
    senderUsername: myData.username || "",
    receiverName: targetData.name || targetData.displayName || "Member",
    receiverEmail: targetData.email || "",
    receiverUsername: targetData.username || "",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return { id: requestDoc.id };
}

async function getReceivedFriendRequests() {
  const user = requireUser();
  const q = query(collection(db, "friendRequests"), where("receiverId", "==", user.uid), where("status", "==", "pending"));
  const snap = await getDocs(q);
  const list = snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  list.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
  return list;
}

async function getSentFriendRequests() {
  const user = requireUser();
  const q = query(collection(db, "friendRequests"), where("senderId", "==", user.uid), where("status", "==", "pending"));
  const snap = await getDocs(q);
  const list = snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  list.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
  return list;
}

async function acceptFriendRequest(requestId) {
  const user = requireUser();
  const reqRef = doc(db, "friendRequests", requestId);
  const reqSnap = await getDoc(reqRef);
  if (!reqSnap.exists()) throw new Error("Friend request does not exist.");
  const data = reqSnap.data();
  if (data.receiverId !== user.uid) throw new Error("Unauthorized to accept this friend request.");
  if (data.status !== "pending") throw new Error("This request is no longer pending.");

  await updateDoc(reqRef, {
    status: "accepted",
    updatedAt: serverTimestamp()
  });

  const users = [user.uid, data.senderId].sort();
  const friendshipId = users.join("_");
  const conversationId = users.join("_");

  await setDoc(doc(db, "friendships", friendshipId), {
    users,
    user1: users[0],
    user2: users[1],
    conversationId,
    createdAt: serverTimestamp()
  }, { merge: true });

  return { friendshipId, conversationId };
}

async function rejectFriendRequest(requestId) {
  const user = requireUser();
  const reqRef = doc(db, "friendRequests", requestId);
  const reqSnap = await getDoc(reqRef);
  if (!reqSnap.exists()) throw new Error("Friend request does not exist.");
  const data = reqSnap.data();
  if (data.receiverId !== user.uid) throw new Error("Unauthorized to reject this friend request.");

  await updateDoc(reqRef, {
    status: "rejected",
    updatedAt: serverTimestamp()
  });
  return true;
}

async function cancelFriendRequest(requestId) {
  const user = requireUser();
  const reqRef = doc(db, "friendRequests", requestId);
  const reqSnap = await getDoc(reqRef);
  if (!reqSnap.exists()) return true;
  const data = reqSnap.data();
  if (data.senderId !== user.uid) throw new Error("Unauthorized to cancel this friend request.");

  await deleteDoc(reqRef);
  return true;
}

async function getFriendsList() {
  const user = requireUser();
  const q1 = query(collection(db, "friendships"), where("user1", "==", user.uid));
  const q2 = query(collection(db, "friendships"), where("user2", "==", user.uid));
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  const friendsMap = new Map();
  const allDocs = [...s1.docs, ...s2.docs];

  for (const docSnap of allDocs) {
    if (friendsMap.has(docSnap.id)) continue;
    const fData = docSnap.data();
    const otherUid = fData.user1 === user.uid ? fData.user2 : fData.user1;
    friendsMap.set(docSnap.id, {
      friendshipId: docSnap.id,
      conversationId: fData.conversationId || docSnap.id,
      createdAt: fData.createdAt,
      otherUid
    });
  }

  const list = [];
  for (const item of friendsMap.values()) {
    try {
      const uSnap = await getDoc(doc(db, "users", item.otherUid));
      const uData = uSnap.exists() ? uSnap.data() : {};
      list.push({
        friendshipId: item.friendshipId,
        conversationId: item.conversationId,
        createdAt: item.createdAt,
        friend: {
          uid: item.otherUid,
          name: uData.name || uData.displayName || uData.username || "Member",
          email: uData.email || "",
          username: uData.username || ""
        }
      });
    } catch (_err) {
      list.push({
        friendshipId: item.friendshipId,
        conversationId: item.conversationId,
        createdAt: item.createdAt,
        friend: {
          uid: item.otherUid,
          name: "Member",
          username: ""
        }
      });
    }
  }

  return list;
}

async function sendLiveChatMessage(conversationId, text) {
  const user = requireUser();
  const cleanText = String(text || "").trim();
  if (!cleanText) throw new Error("Message cannot be empty.");
  if (!conversationId) throw new Error("Invalid conversation.");

  const mySnap = await getDoc(doc(db, "users", user.uid));
  const myData = mySnap.exists() ? mySnap.data() : {};
  const senderName = myData.name || myData.displayName || user.displayName || "Member";

  const msgRef = await addDoc(collection(db, "conversations", conversationId, "messages"), {
    senderId: user.uid,
    senderName,
    senderEmail: user.email || myData.email || "",
    text: cleanText,
    createdAt: serverTimestamp(),
    timestamp: Date.now()
  });

  return { id: msgRef.id };
}

function subscribeLiveChatMessages(conversationId, onUpdate, onError) {
  if (!conversationId) return () => {};
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    onUpdate(messages);
  }, (err) => {
    console.error("Live chat snapshot error:", err);
    if (typeof onError === "function") onError(err);
  });
}

const friendsApi = {
  searchUsersByEmail,
  searchUsersByUsername,
  sendFriendRequest,
  getReceivedFriendRequests,
  getSentFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getFriendsList,
  sendLiveChatMessage,
  subscribeLiveChatMessages
};

window.emoraFriends = friendsApi;

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
  saveDoctorRating,
  get currentUser() { return auth?.currentUser || null; },
  db,
  auth,
  ...friendsApi
};
