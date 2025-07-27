import React, { useState, useEffect } from 'react';
// Firestore imports are commented out for now since you want to focus on UI before connecting to Firestore
// import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
// import { db } from '../services/firebase';

// Helper to get the start and end of a week offset from now
function getWeekRange(weekOffset = 0) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek - 7 * weekOffset);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

// Mock data for UI preview
const mockSummary = {
  mood: [3, 4, 2, 5, 4, 3, 4],
  stress: [2, 3, 2, 4, 3, 2, 3],
  journal: [
    { date: 'Mon', entry: 'Felt good about my essay.' },
    { date: 'Wed', entry: 'A bit stressed about deadlines.' },
    { date: 'Fri', entry: 'Had a relaxing evening.' }
  ],
  tasks: [
    { name: 'Submit UC app', completed: true },
    { name: 'Finish scholarship essay', completed: false },
    { name: 'Request transcript', completed: true }
  ]
};

const WeeklySummary = ({ userId = 'demoUser' }) => {
  const [summaryData, setSummaryData] = useState(mockSummary);
  const [loading, setLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = this week, 1 = last week, etc.

  // Firestore logic would go here, but is omitted for now
  // useEffect(() => { ... }, [userId, selectedWeek]);

  const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="weekly-summary bg-white rounded-lg shadow p-6 mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Weekly Summary 📈</h2>
      <div className="flex justify-center mb-4 gap-2">
        <button
          className={`px-3 py-1 rounded border ${selectedWeek === 0 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setSelectedWeek(0)}
        >
          This Week
        </button>
        <button
          className={`px-3 py-1 rounded border ${selectedWeek === 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setSelectedWeek(1)}
        >
          Last Week
        </button>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Mood Trend</h3>
        <div className="flex gap-2">
          {summaryData.mood.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">{m}</div>
              <div className="text-xs text-gray-500">{weekLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Stress Trend</h3>
        <div className="flex gap-2">
          {summaryData.stress.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">{s}</div>
              <div className="text-xs text-gray-500">{weekLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Journal Highlights</h3>
        <ul className="list-disc pl-5">
          {summaryData.journal.map((j, i) => (
            <li key={i} className="mb-1"><span className="font-bold">{j.date}:</span> {j.entry}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Tasks</h3>
        <ul className="list-disc pl-5">
          {summaryData.tasks.map((t, i) => (
            <li key={i} className={t.completed ? 'text-green-600' : 'text-yellow-600'}>
              {t.completed ? '✅' : '⏳'} {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklySummary;
