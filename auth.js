import { auth, db, isFirebaseConfigured } from "./firebase.js";
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const authScreen = document.querySelector("#authScreen");
const authStatus = document.querySelector("#authStatus");
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");
let creatingAccount = false;
const showStatus = (message, error = false) => { authStatus.textContent = message; authStatus.classList.toggle("error", error); };
function selectAuthTab(tab) {
  const login = tab === "login";
  loginForm.hidden = !login; signupForm.hidden = login;
  document.querySelectorAll("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button.dataset.authTab === tab));
}
function updateUserUi(user) {
  if (!user) return;
  const name = user.displayName || "Member";
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const welcome = document.querySelector("#welcomeTitle");
  if (welcome) {
    const nameLine = document.createElement("span");
    nameLine.textContent = name;
    welcome.replaceChildren("Welcome", document.createElement("br"), nameLine);
  }
  const avatar = document.querySelector("#profileInitials");
  if (avatar) avatar.textContent = initials;
  const profileAvatar = document.querySelector("#profileAvatar");
  if (profileAvatar) profileAvatar.textContent = initials.charAt(0);
  const profileName = document.querySelector("#profileNameDisplay");
  if (profileName) profileName.textContent = name;
  const profileEmail = document.querySelector("#profileEmailDisplay");
  if (profileEmail) profileEmail.textContent = user.email;
  document.querySelector("#dailyMessage")?.replaceChildren(document.createTextNode("Your journey starts today."));
  document.querySelector("#streakCount")?.replaceChildren(document.createTextNode("Day 1"));
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
}
async function showApp(user) {
  document.body.classList.toggle("authenticated", Boolean(user));
  authScreen.hidden = Boolean(user);
  if (!user) {
    loginForm.reset();
    signupForm.reset();
    return;
  }
  updateUserUi(user);
  await loadUserData(user);
  window.location.hash = "dashboard";
  window.emoraSetView?.("dashboard");
}
const friendlyError = (error) => ({ "auth/email-already-in-use": "An account with this email already exists.", "auth/invalid-credential": "Incorrect email or password.", "auth/weak-password": "Use a password with at least 6 characters.", "auth/invalid-email": "Enter a valid email address." }[error.code] || "Something went wrong. Please try again.");
async function saveUserData(user, data) { if (db && user) await setDoc(doc(db, "users", user.uid), { ...data, updatedAt: serverTimestamp() }, { merge: true }); }

document.querySelectorAll("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => { selectAuthTab(button.dataset.authTab); showStatus(""); }));

if (!isFirebaseConfigured) {
  showStatus("Add your Firebase web configuration in firebase-config.js to enable accounts.", true);
} else {
  await setPersistence(auth, browserLocalPersistence);
  onAuthStateChanged(auth, async (user) => {
    if (creatingAccount) return;
    await showApp(user);
    if (user) showStatus("");
  });
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); const form = new FormData(loginForm);
    try {
      const credential = await signInWithEmailAndPassword(auth, form.get("email"), form.get("password"));
      await showApp(credential.user);
    } catch (error) { showStatus(friendlyError(error), true); }
  });
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); const form = new FormData(signupForm); const name = form.get("name").trim();
    try {
      creatingAccount = true;
      const credential = await createUserWithEmailAndPassword(auth, form.get("email"), form.get("password"));
      await updateProfile(credential.user, { displayName: name });
      await saveUserData(credential.user, { name, email: credential.user.email, createdAt: serverTimestamp() });
      await signOut(auth);
      creatingAccount = false;
      selectAuthTab("login");
      signupForm.reset();
      showStatus("Account created. Please log in.");
    } catch (error) {
      creatingAccount = false;
      showStatus(friendlyError(error), true);
    }
  });
}
function clearLocalWellnessData() {
  Object.keys(localStorage).filter((key) => key.startsWith("emora-")).forEach((key) => localStorage.removeItem(key));
}
window.emoraAuth = {
  signOut: async () => { clearLocalWellnessData(); loginForm.reset(); signupForm.reset(); if (auth) await signOut(auth); },
  saveUserData: (data) => auth?.currentUser ? saveUserData(auth.currentUser, data) : Promise.resolve()
};
