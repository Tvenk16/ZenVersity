// src/components/MoodTracker.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const MoodTracker = ({ userId = 'demoUser' }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodScale, setMoodScale] = useState(5);
  const [recentMoods, setRecentMoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const moods = [
    { emoji: '😄', label: 'Amazing', value: 9 },
    { emoji: '😊', label: 'Good', value: 7 },
    { emoji: '😐', label: 'Okay', value: 5 },
    { emoji: '😔', label: 'Down', value: 3 },
    { emoji: '😭', label: 'Terrible', value: 1 }
  ];

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'moods'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moodsData = [];
      snapshot.forEach((doc) => {
        moodsData.push({ id: doc.id, ...doc.data() });
      });
      setRecentMoods(moodsData.slice(0, 7)); // Last 7 entries
    });

    return () => unsubscribe();
  }, [userId]);

  const handleMoodSubmit = async (mood) => {
    if (!userId) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'moods'), {
        userId,
        mood: mood.label,
        emoji: mood.emoji,
        value: mood.value,
        scale: moodScale,
        timestamp: new Date(),
        date: new Date().toDateString()
      });
      setSelectedMood(mood.label);
      setTimeout(() => setSelectedMood(''), 2000); // Clear selection after 2 seconds
    } catch (error) {
      console.error('Error saving mood:', error);
    }
    setLoading(false);
  };

  const handleScaleSubmit = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'moods'), {
        userId,
        mood: `Scale: ${moodScale}`,
        emoji: moodScale >= 8 ? '😄' : moodScale >= 6 ? '😊' : moodScale >= 4 ? '😐' : moodScale >= 2 ? '😔' : '😭',
        value: moodScale,
        scale: moodScale,
        timestamp: new Date(),
        date: new Date().toDateString()
      });
    } catch (error) {
      console.error('Error saving mood scale:', error);
    }
    setLoading(false);
  };

  return (
    <div className="mood-tracker bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">How are you feeling today? 😊</h2>
      <div className="mood-selector mb-6">
        <h3 className="font-semibold mb-2">Quick Mood Check</h3>
        <div className="flex justify-center gap-2 mb-2">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSubmit(mood)}
              disabled={loading}
              className={`mood-button text-2xl p-2 rounded-full border-2 mx-1 ${selectedMood === mood.label ? 'border-blue-500 bg-blue-100' : 'border-gray-200 bg-white'}`}
            >
              <span className="mood-emoji mr-1">{mood.emoji}</span>
              <span className="mood-label text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mood-scale mb-6">
        <h3 className="font-semibold mb-2">Rate Your Overall Mood (1-10)</h3>
        <div className="flex items-center gap-4 mb-2">
          <input
            type="range"
            min="1"
            max="10"
            value={moodScale}
            onChange={(e) => setMoodScale(parseInt(e.target.value))}
            className="mood-slider w-full"
          />
          <span className="scale-display font-bold">{moodScale}/10</span>
        </div>
        <button 
          onClick={handleScaleSubmit}
          disabled={loading}
          className="submit-button bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
        >
          {loading ? 'Saving...' : 'Save Mood Rating'}
        </button>
      </div>

      <div className="recent-moods">
        <h3 className="font-semibold mb-2">Your Recent Moods</h3>
        <div className="mood-history">
          {recentMoods.map((mood, index) => (
            <div key={mood.id || index} className="mood-entry flex items-center gap-2 mb-1">
              <span className="mood-emoji text-xl">{mood.emoji}</span>
              <span className="mood-info text-sm">
                {mood.mood} - {mood.timestamp && mood.timestamp.toDate ? new Date(mood.timestamp.toDate()).toLocaleDateString() : mood.date}
              </span>
            </div>
          ))}
          {recentMoods.length === 0 && (
            <p className="text-gray-500">No mood entries yet. Log your first mood above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
