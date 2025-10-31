// src/components/Auth.jsx
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function Auth() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div>
        <p>Signed in as {user.displayName || user.email}</p>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{isLogin ? "Log in" : "Sign up"}</h3>
      <form onSubmit={handleEmailAuth}>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{isLogin ? "Log in" : "Create account"}</button>
      </form>
      <button onClick={handleGoogle}>Sign in with Google</button>
      <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create account" : "Have an account?"}</button>
    </div>
  );
}
