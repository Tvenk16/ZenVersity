// src/components/Journal.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import {
  collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Journal() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => onAuthStateChanged(auth, u => {
    setUser(u);
    if (u) {
      const q = query(collection(db, "users", u.uid, "journals"), orderBy("createdAt", "desc"));
      return onSnapshot(q, snap => setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    } else {
      setNotes([]);
    }
  }), []);

  const addNote = async () => {
    if (!user || !text) return;
    if (editing) {
      await updateDoc(doc(db, "users", user.uid, "journals", editing), { text });
      setEditing(null);
      setText("");
      return;
    }
    await addDoc(collection(db, "users", user.uid, "journals"), {
      text,
      createdAt: new Date().toISOString()
    });
    setText("");
  };

  const del = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "journals", id));
  };

  const startEdit = (note) => {
    setEditing(note.id);
    setText(note.text);
  };

  return (
    <div className="card">
      {!user ? <p>Sign in to use Journal.</p> : (
        <>
          <h3>Journal</h3>
          <textarea value={text} onChange={e => setText(e.target.value)} />
          <button onClick={addNote}>{editing ? "Save edit" : "Save entry"}</button>
          <ul>
            {notes.map(n => (
              <li key={n.id}>
                <p>{n.text}</p>
                <small>{new Date(n.createdAt).toLocaleString()}</small>
                <div>
                  <button onClick={() => startEdit(n)}>Edit</button>
                  <button onClick={() => del(n.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
