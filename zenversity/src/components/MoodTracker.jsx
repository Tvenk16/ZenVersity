// src/components/MoodTracker.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MoodTracker() {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let unsubSnap = null;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (unsubSnap) {
        unsubSnap();
        unsubSnap = null;
      }

      if (u) {
        const q = query(collection(db, "users", u.uid, "moods"), orderBy("createdAt", "desc"));
        unsubSnap = onSnapshot(q, (snap) => setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
      } else {
        setEntries([]);
      }
    });

    return () => {
      unsubAuth();
      if (unsubSnap) unsubSnap();
    };
  }, []);

  const saveMood = async () => {
    if (!user || !mood) return;
    await addDoc(collection(db, "users", user.uid, "moods"), {
      mood,
      createdAt: new Date().toISOString()
    });
    setMood("");
  };

  return (
    <div className="card">
      {!user ? (
        <p>Please sign in to save moods.</p>
      ) : (
        <>
          <h3>How are you feeling?</h3>
          <input value={mood} onChange={e => setMood(e.target.value)} placeholder="Type feeling or emoji" />
          <button onClick={saveMood}>Save</button>
          <ul>
            {entries.map(e => (
              <li key={e.id}>{e.mood} — {new Date(e.createdAt).toLocaleString()}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
