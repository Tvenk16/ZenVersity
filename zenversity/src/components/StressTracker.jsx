// ...existing code...
// src/components/StressTracker.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const StressTracker = ({ userId = 'demoUser' }) => {
  const [stressLevel, setStressLevel] = useState(5);
  const [stressSource, setStressSource] = useState('');
  const [recentStress, setRecentStress] = useState([]);
  const [loading, setLoading] = useState(false);

  const stressCategories = [
    'College Applications',
    'Schoolwork',
    'Social Situations',
    'Family Pressure',
    'Future Uncertainty',
    'Time Management',
    'Other'
  ];

  const getStressColor = (level) => {
    if (level <= 3) return '#4ade80'; // Green
    if (level <= 6) return '#fbbf24'; // Yellow
    return '#f87171'; // Red
  };

  const getStressEmoji = (level) => {
    if (level <= 2) return '😌';
    if (level <= 4) return '😐';
    if (level <= 6) return '😰';
    if (level <= 8) return '😫';
    return '🤯';
  };

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'stress'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stressData = [];
      snapshot.forEach((doc) => {
        stressData.push({ id: doc.id, ...doc.data() });
      });
      setRecentStress(stressData.slice(0, 10));
    });

    return () => unsubscribe();
  }, [userId]);

  const handleStressSubmit = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'stress'), {
        userId,
        level: stressLevel,
        source: stressSource,
        emoji: getStressEmoji(stressLevel),
        timestamp: new Date(),
        date: new Date().toDateString()
      });
      
      setStressSource(''); // Reset form
    } catch (error) {
      console.error('Error saving stress level:', error);
    }
    setLoading(false);
  };

  const getAverageStress = () => {
    if (recentStress.length === 0) return 0;
    const sum = recentStress.reduce((acc, stress) => acc + stress.level, 0);
    return (sum / recentStress.length).toFixed(1);
  };

  return (
    <div className="stress-tracker bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Stress Level Check 😰</h2>
      <div className="current-stress mb-4">
        <h3 className="font-semibold mb-2">How stressed are you right now?</h3>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="text-3xl">{getStressEmoji(stressLevel)}</div>
          <div className="font-bold text-2xl" style={{ color: getStressColor(stressLevel) }}>
            {stressLevel}/10
          </div>
        </div>
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            className="w-full"
            style={{ background: `linear-gradient(to right, #4ade80 0%, #fbbf24 50%, #f87171 100%)` }}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>😌 Calm</span>
            <span>😐 Moderate</span>
            <span>🤯 Overwhelmed</span>
          </div>
        </div>
      </div>

      <div className="stress-source mb-4">
        <h3 className="font-semibold mb-2">What's causing your stress?</h3>
        <select
          value={stressSource}
          onChange={(e) => setStressSource(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a category...</option>
          {stressCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStressSubmit}
        disabled={loading || !stressSource}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow mb-4 hover:bg-blue-600 w-full"
      >
        {loading ? 'Saving...' : 'Log Stress Level'}
      </button>

      <div className="stress-insights mb-4">
        <h3 className="font-semibold mb-2">Your Stress Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 rounded p-2 text-center">
            <h4 className="font-bold">Average This Week</h4>
            <div className="text-2xl font-bold" style={{ color: getStressColor(getAverageStress()) }}>
              {getAverageStress()}/10
            </div>
          </div>
          <div className="bg-purple-100 rounded p-2 text-center">
            <h4 className="font-bold">Total Check-ins</h4>
            <div className="text-2xl font-bold">{recentStress.length}</div>
          </div>
        </div>
      </div>

      <div className="recent-stress mb-4">
        <h3 className="font-semibold mb-2">Recent Stress Logs</h3>
        <div>
          {recentStress.map((stress) => (
            <div key={stress.id} className="flex items-center gap-2 mb-1">
              <span className="text-xl">{stress.emoji}</span>
              <span className="font-bold" style={{ color: getStressColor(stress.level) }}>
                {stress.level}/10
              </span>
              <span className="text-sm">{stress.source}</span>
              <span className="text-xs text-gray-500">{new Date(stress.timestamp.toDate()).toLocaleDateString()}</span>
            </div>
          ))}
          {recentStress.length === 0 && (
            <p className="text-gray-500">No stress logs yet. Track your first stress level above!</p>
          )}
        </div>
      </div>

      <div className="stress-tips">
        <h3 className="font-semibold mb-2">Quick Stress Relief Tips 💡</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-100 rounded p-2">
            <h4 className="font-bold">🫁 Breathe</h4>
            <p>Take 5 deep breaths: in for 4, hold for 4, out for 6</p>
          </div>
          <div className="bg-yellow-100 rounded p-2">
            <h4 className="font-bold">🚶‍♀️ Move</h4>
            <p>Take a 5-minute walk or do some stretches</p>
          </div>
          <div className="bg-blue-100 rounded p-2">
            <h4 className="font-bold">📝 Write</h4>
            <p>Jot down what's worrying you in the journal</p>
          </div>
          <div className="bg-purple-100 rounded p-2">
            <h4 className="font-bold">💧 Hydrate</h4>
            <p>Drink a glass of water and take a moment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTracker;
