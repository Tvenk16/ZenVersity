// src/components/MoodTracker.jsx

import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const emojis = ["😃", "🙂", "😐", "😔", "😢"];

export default function MoodTracker({ userId = 'demoUser' }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMood = async (emoji) => {
    setSelected(emoji);
    setLoading(true);
    try {
      await addDoc(collection(db, "moods"), {
        userId,
        emoji,
        value: emojis.indexOf(emoji) * 2.5 + 2.5, // scale 2.5, 5, 7.5, 10
        timestamp: Timestamp.now(),
        date: new Date().toDateString(),
      });
      setMessage("Mood saved! 🎉");
    } catch (e) {
      setMessage("Error saving mood.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">How are you feeling today?</h2>
      <div className="flex justify-center gap-4 mb-4">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            className={`text-3xl p-2 rounded-full border-2 ${selected === emoji ? "border-blue-500" : "border-gray-200"}`}
            onClick={() => handleMood(emoji)}
            disabled={loading}
          >
            {emoji}
          </button>
        ))}
      </div>
      {message && <div className="text-center text-green-600 mt-2">{message}</div>}
    </div>
  );
}
