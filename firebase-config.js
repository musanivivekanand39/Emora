// Firebase configuration for the Emora project. This file contains the necessary credentials to connect to Firebase services such as authentication, Firestore, and storage. The configuration is used throughout the application to initialize Firebase and interact with its services.
export const firebaseConfig = {
  apiKey: "AIzaSyCZQbLdwHwJTpg7EMECxt9gyd_ohSkihxc",
  authDomain: "emora-v3241.firebaseapp.com",
  projectId: "emora-v3241",
  storageBucket: "emora-v3241.firebasestorage.app",
  messagingSenderId: "253962138990",
  appId: "1:253962138990:web:27dd191de86ab04d3f3d7f",
  measurementId: "G-N7VFMNLHLS"
};

// Same-origin Vercel Serverless Function; no private key is exposed to the browser.
export const authApiUrl = "/api";
