// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyAfq2MpB60hnJQU5A-YWvnRnP1TZA0AF9s",
  authDomain: "the-sounds-of-houston.firebaseapp.com",
  projectId: "the-sounds-of-houston",
  storageBucket: "the-sounds-of-houston.firebasestorage.app",
  messagingSenderId: "290434520996",
  appId: "1:290434520996:web:d14f1c29fb2105bfa6d331",
  measurementId: "G-C5B3J7V891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
