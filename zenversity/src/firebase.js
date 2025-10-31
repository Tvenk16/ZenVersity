// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Add Google sign-in helper
export const googleProvider = new GoogleAuthProvider();

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider)
    .then(result => {
      console.log("User logged in:", result.user);
      return result.user;
    })
    .catch(error => {
      console.error("Google sign-in error:", error);
      throw error;
    });
}

// Sign out wrapper
export function signOutUser() {
  return fbSignOut(auth).catch(err => {
    console.error('Sign-out error:', err);
    throw err;
  });
}

// onAuthChange: register a listener and return unsubscribe
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Save a mood entry to Firestore under the authenticated user's document
export async function saveMood(mood) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "users", user.uid, "moods"), {
      mood,
      timestamp: new Date()
    });
  } catch (err) {
    console.error('Error saving mood:', err);
    throw err;
  }
}

// Fetch moods for the currently authenticated user
export async function getMoods() {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "moods"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error fetching moods:', err);
    return [];
  }
}
