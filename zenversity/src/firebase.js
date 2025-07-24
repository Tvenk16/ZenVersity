// src/firebase.js
// Paste your Firebase config here after creating a Firebase project at https://console.firebase.google.com/
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Uncomment for login

const firebaseConfig = {
  apiKey: "AIzaSyBYVBKOBvxia0JyQsspvxGKYDPkHpWLW-8",
  authDomain: "zenversity-730f8.firebaseapp.com",
  projectId: "zenversity-730f8",
  storageBucket: "zenversity-730f8.firebasestorage.app",
  messagingSenderId: "612089061078",
  appId: "1:612089061078:web:5e6dc4f9d093a2da637377",
  measurementId: "G-2HQKW36EMT"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app); // Uncomment for login

export { db /*, auth */ };

