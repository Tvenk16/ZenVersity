
import React, { useState, useEffect } from 'react';
// import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
// import { db } from '../services/firebase';

const WeeklySummary = ({ userId = 'demoUser' }) => {
  const [summaryData, setSummaryData] = useState({
    mood: [],
    stress: [],
    journal: [],
    tasks: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = this week, 1 = last week, etc.

  useEffect(() => {
    if (!userId) return;

    const getWeekRange = (weeksAgo) => {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() - (weeksAgo * 7));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return { start: startOfWeek, end: endOfWeek };
    };

    const { start, end } = getWeekRange(selectedWeek);

    // Firestore queries would go here, but are commented out for now
    // ...

    // For now, use mock data for UI preview
    setSummaryData({
      mood: [
        { value: 7, timestamp: new Date(start) },
        { value: 6, timestamp: new Date(start.getTime() + 86400000) },
        { value: 8, timestamp: new Date(start.getTime() + 2 * 86400000) }
      ],
      stress: [
        { level: 3, timestamp: new Date(start) },
        { level: 4, timestamp: new Date(start.getTime() + 86400000) }
      ],
      journal: [
        { entry: 'Had a good day', timestamp: new Date(start) },
        { entry: 'Felt stressed about exams', timestamp: new Date(start.getTime() + 2 * 86400000) }
      ],
      tasks: [
        { completed: true, timestamp: new Date(start), name: 'Submit application' },
        { completed: false, timestamp: new Date(start.getTime() + 3 * 86400000), name: 'Write essay' }
      ]
    });
    setLoading(false);

    // Uncomment and use Firestore logic when ready
    // ...

    // return () => { unsubscribes.forEach(unsubscribe => unsubscribe()); };
  }, [userId, selectedWeek]);

  const getWeekLabel = (weeksAgo) => {
    const { start, end } = getWeekRange(weeksAgo);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (weeksAgo === 0) return `This Week (${startStr} - ${endStr})`;
    if (weeksAgo === 1) return `Last Week (${startStr} - ${endStr})`;
    return `${weeksAgo} Weeks Ago (${startStr} - ${endStr})`;
  };

  const getWeekRange = (weeksAgo) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() - (weeksAgo * 7));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return { start: startOfWeek, end: endOfWeek };
  };

  const calculateAverages = () => {
    const moodValues = summaryData.mood.map(m => m.value || m.scale || 5);
    const stressValues = summaryData.stress.map(s => s.level);
    return {
      avgMood: moodValues.length > 0 ? Math.round((moodValues.reduce((a, b) => a + b, 0) / moodValues.length) * 10) / 10 : 0,
      avgStress: stressValues.length > 0 ? Math.round((stressValues.reduce((a, b) => a + b, 0) / stressValues.length) * 10) / 10 : 0,
      totalEntries: moodValues.length + stressValues.length,
      journalEntries: summaryData.journal.length,
      tasksCompleted: summaryData.tasks.filter(t => t.completed).length,
      totalTasks: summaryData.tasks.length
    };
  };

  const getMoodTrend = () => {
    const moods = summaryData.mood.sort((a, b) => a.timestamp - b.timestamp);
    if (moods.length < 2) return 'stable';
    const firstHalf = moods.slice(0, Math.floor(moods.length / 2));
    const secondHalf = moods.slice(Math.floor(moods.length / 2));
    const firstAvg = firstHalf.reduce((sum, m) => sum + (m.value || m.scale || 5), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, m) => sum + (m.value || m.scale || 5), 0) / secondHalf.length;
    const diff = secondAvg - firstAvg;
    if (diff > 0.5) return 'improving';
    if (diff < -0.5) return 'declining';
    return 'stable';
  };

  const getStressTrend = () => {
    const stressLevels = summaryData.stress.sort((a, b) => a.timestamp - b.timestamp);
    if (stressLevels.length < 2) return 'stable';
    const firstHalf = stressLevels.slice(0, Math.floor(stressLevels.length / 2));
    const secondHalf = stressLevels.slice(Math.floor(stressLevels.length / 2));
    const firstAvg = firstHalf.reduce((sum, s) => sum + s.level, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s.level, 0) / secondHalf.length;
    const diff = secondAvg - firstAvg;
    if (diff > 0.5) return 'increasing';
    if (diff < -0.5) return 'decreasing';
    return 'stable';
  };

  const getTopStressors = () => {
    const stressSources = {};
    summaryData.stress.forEach(s => {
      if (s.source) {
        stressSources[s.source] = (stressSources[s.source] || 0) + 1;
      }
    });
    return Object.entries(stressSources)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([source, count]) => ({ source, count }));
  };

  const generateInsights = () => {
    const stats = calculateAverages();
    const insights = [];
    if (stats.avgMood >= 7) {
      insights.push({ type: 'positive', icon: '😊', text: `Great week for mood! Your average was ${stats.avgMood}/10.` });
    } else if (stats.avgMood <= 4) {
      insights.push({ type: 'concern', icon: '🤗', text: `Your mood averaged ${stats.avgMood}/10 this week. Consider self-care activities.` });
    }
    if (stats.avgStress >= 7) {
      insights.push({ type: 'warning', icon: '⚠️', text: `High stress levels detected (${stats.avgStress}/10). Time for stress management?` });
    } else if (stats.avgStress <= 3) {
      insights.push({ type: 'positive', icon: '😌', text: `Low stress week! Average was ${stats.avgStress}/10. Well done!` });
    }
    if (stats.journalEntries >= 5) {
      insights.push({ type: 'positive', icon: '📝', text: `Excellent journaling habit! ${stats.journalEntries} entries this week.` });
    }
    if (stats.totalTasks > 0 && (stats.tasksCompleted / stats.totalTasks) >= 0.8) {
      insights.push({ type: 'positive', icon: '✅', text: `Great productivity! Completed ${stats.tasksCompleted}/${stats.totalTasks} tasks.` });
    }
    const moodTrend = getMoodTrend();
    const stressTrend = getStressTrend();
    if (moodTrend === 'improving') {
      insights.push({ type: 'positive', icon: '📈', text: 'Your mood has been improving throughout the week!' });
    }
    if (stressTrend === 'decreasing') {
      insights.push({ type: 'positive', icon: '📉', text: 'Your stress levels have been decreasing. Great job!' });
    }
    return insights.slice(0, 4);
  };

  if (loading) {
    return (
      <div className="weekly-summary loading">
        <p>Generating your weekly summary...</p>
      </div>
    );
  }

  const stats = calculateAverages();
  const insights = generateInsights();
  const topStressors = getTopStressors();

  return (
    <div className="weekly-summary bg-white rounded-lg shadow p-6 mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Weekly Summary 📈</h2>
      <div className="flex justify-center mb-4 gap-2">
        <select 
          value={selectedWeek} 
          onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
          className="px-3 py-1 rounded border bg-white text-blue-500 border-blue-500"
        >
          <option value={0}>This Week</option>
          <option value={1}>Last Week</option>
          <option value={2}>2 Weeks Ago</option>
          <option value={3}>3 Weeks Ago</option>
          <option value={4}>4 Weeks Ago</option>
        </select>
        <div className="week-range text-gray-500 ml-2 flex items-center">{getWeekLabel(selectedWeek)}</div>
      </div>
      <div className="summary-stats grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="stat-card mood bg-blue-50 rounded p-4 flex flex-col items-center">
          <h4 className="font-semibold mb-1">😊 Average Mood</h4>
          <div className="text-2xl font-bold">{stats.avgMood}/10</div>
          <div className="trend text-xs text-gray-500">{getMoodTrend()}</div>
        </div>
        <div className="stat-card stress bg-red-50 rounded p-4 flex flex-col items-center">
          <h4 className="font-semibold mb-1">😰 Average Stress</h4>
          <div className="text-2xl font-bold">{stats.avgStress}/10</div>
          <div className="trend text-xs text-gray-500">{getStressTrend()}</div>
        </div>
        <div className="stat-card journal bg-yellow-50 rounded p-4 flex flex-col items-center">
          <h4 className="font-semibold mb-1">📝 Journal Entries</h4>
          <div className="text-2xl font-bold">{stats.journalEntries}</div>
        </div>
        <div className="stat-card tasks bg-green-50 rounded p-4 flex flex-col items-center">
          <h4 className="font-semibold mb-1">✅ Tasks Completed</h4>
          <div className="text-2xl font-bold">{stats.tasksCompleted}/{stats.totalTasks}</div>
          <div className="percentage text-xs text-gray-500">
            {stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0}%
          </div>
        </div>
      </div>
      {topStressors.length > 0 && (
        <div className="top-stressors mb-4">
          <h4 className="font-semibold mb-2">🎯 Top Stress Sources</h4>
          <div className="flex flex-col gap-1">
            {topStressors.map((stressor, index) => (
              <div key={stressor.source} className="flex items-center gap-2">
                <span className="font-bold">#{index + 1}</span>
                <span>{stressor.source}</span>
                <span className="text-xs text-gray-500">{stressor.count} times</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="weekly-insights mb-4">
        <h4 className="font-semibold mb-2">💡 Weekly Insights</h4>
        {insights.length === 0 ? (
          <div className="no-insights text-gray-500">
            <p>Track more data throughout the week to get personalized insights!</p>
          </div>
        ) : (
          <div className="insights-list flex flex-col gap-2">
            {insights.map((insight, index) => (
              <div key={index} className={`insight-item flex items-center gap-2 ${insight.type}`}>
                <span className="text-xl">{insight.icon}</span>
                <span>{insight.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="week-highlights mb-4">
        <h4 className="font-semibold mb-2">🌟 Week Highlights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="highlight-card bg-purple-50 rounded p-3">
            <h5 className="font-semibold mb-1">Most Active Day</h5>
            <p>{summaryData.mood.length > 0 || summaryData.stress.length > 0 || summaryData.journal.length > 0 ? 
              (() => {
                const dayCount = {};
                [...summaryData.mood, ...summaryData.stress, ...summaryData.journal].forEach(item => {
                  const day = item.timestamp.toLocaleDateString('en-US', { weekday: 'long' });
                  dayCount[day] = (dayCount[day] || 0) + 1;
                });
                const mostActive = Object.entries(dayCount).sort(([,a], [,b]) => b - a)[0];
                return mostActive ? `${mostActive[0]} (${mostActive[1]} activities)` : 'No data';
              })() : 'No data'
            }</p>
          </div>
          <div className="highlight-card bg-indigo-50 rounded p-3">
            <h5 className="font-semibold mb-1">Check-in Streak</h5>
            <p>{stats.totalEntries > 0 ? `${stats.totalEntries} total check-ins` : 'Start tracking!'}</p>
          </div>
        </div>
      </div>
      {stats.totalEntries === 0 && (
        <div className="empty-week bg-gray-50 rounded p-4 mt-4">
          <h4 className="font-semibold mb-2">📭 Quiet Week</h4>
          <p>No mental health data recorded this week. Consider checking in daily to track your patterns and get better insights!</p>
          <div className="suggestions mt-2">
            <h5 className="font-semibold">Try this week:</h5>
            <ul className="list-disc pl-5">
              <li>🎯 Set a daily mood check-in reminder</li>
              <li>📝 Write one journal entry</li>
              <li>📊 Track stress levels when you feel overwhelmed</li>
              <li>✅ Add your upcoming deadlines</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySummary;
