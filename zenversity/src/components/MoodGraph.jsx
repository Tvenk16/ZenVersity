// src/components/MoodGraph.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { db } from '../firebase';

const MoodGraph = ({ userId = 'demoUser' }) => {
  const [moodData, setMoodData] = useState([]);
  const [stressData, setStressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'all'
  const [chartType, setChartType] = useState('mood'); // 'mood', 'stress', 'both'

  useEffect(() => {
    if (!userId) return;

    const moodQuery = query(
      collection(db, 'moods'),
      where('userId', '==', userId),
      orderBy('timestamp', 'asc')
    );

    const stressQuery = query(
      collection(db, 'stress'),
      where('userId', '==', userId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribeMood = onSnapshot(moodQuery, (snapshot) => {
      const moods = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        moods.push({
          id: doc.id,
          value: data.value || data.scale || 5,
          date: data.timestamp.toDate().toDateString(),
          timestamp: data.timestamp.toDate(),
          emoji: data.emoji || '😐'
        });
      });
      setMoodData(moods);
    });

    const unsubscribeStress = onSnapshot(stressQuery, (snapshot) => {
      const stress = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        stress.push({
          id: doc.id,
          value: data.level,
          date: data.timestamp.toDate().toDateString(),
          timestamp: data.timestamp.toDate(),
          source: data.source
        });
      });
      setStressData(stress);
      setLoading(false);
    });

    return () => {
      unsubscribeMood();
      unsubscribeStress();
    };
  }, [userId]);

  const filterDataByTimeRange = (data) => {
    if (timeRange === 'all') return data;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    if (timeRange === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      cutoffDate.setDate(now.getDate() - 30);
    }
    
    return data.filter(item => item.timestamp >= cutoffDate);
  };

  const processChartData = () => {
    const filteredMoodData = filterDataByTimeRange(moodData);
    const filteredStressData = filterDataByTimeRange(stressData);

    // Group by date and calculate averages
    const dateMap = {};

    filteredMoodData.forEach(item => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, mood: [], stress: [] };
      }
      dateMap[item.date].mood.push(item.value);
    });

    filteredStressData.forEach(item => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, mood: [], stress: [] };
      }
      dateMap[item.date].stress.push(item.value);
    });

    // Calculate averages and format for chart
    return Object.values(dateMap)
      .map(day => ({
        date: new Date(day.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        mood: day.mood.length > 0 ? 
          Math.round((day.mood.reduce((a, b) => a + b, 0) / day.mood.length) * 10) / 10 : null,
        stress: day.stress.length > 0 ? 
          Math.round((day.stress.reduce((a, b) => a + b, 0) / day.stress.length) * 10) / 10 : null,
        fullDate: day.date
      }))
      .filter(day => day.mood !== null || day.stress !== null)
      .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
  };

  const chartData = processChartData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip bg-white p-2 rounded shadow">
          <p className="tooltip-label font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'mood' ? '😊 Mood' : '😰 Stress'}: {entry.value}/10
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getMoodAverage = () => {
    const filtered = filterDataByTimeRange(moodData);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, item) => acc + item.value, 0);
    return Math.round((sum / filtered.length) * 10) / 10;
  };

  const getStressAverage = () => {
    const filtered = filterDataByTimeRange(stressData);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, item) => acc + item.value, 0);
    return Math.round((sum / filtered.length) * 10) / 10;
  };

  if (loading) {
    return (
      <div className="mood-graph loading">
        <p>Loading your mood data...</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="mood-graph empty">
        <h3>📊 Your Mood & Stress Trends</h3>
        <div className="empty-state">
          <p>📈 No data to display yet.</p>
          <p>Start tracking your mood and stress to see patterns over time!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-graph bg-white rounded-lg shadow p-6 mb-6 w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center">📊 Your Mental Health Trends</h3>
      <div className="graph-controls flex flex-col md:flex-row md:justify-between mb-4 gap-2">
        <div className="time-range-buttons flex gap-2 items-center">
          <span className="font-semibold">Time Range:</span>
          {[
            { key: 'week', label: '7 Days' },
            { key: 'month', label: '30 Days' },
            { key: 'all', label: 'All Time' }
          ].map(range => (
            <button
              key={range.key}
              onClick={() => setTimeRange(range.key)}
              className={`px-2 py-1 rounded border ${timeRange === range.key ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="chart-type-buttons flex gap-2 items-center">
          <span className="font-semibold">Show:</span>
          {[
            { key: 'mood', label: '😊 Mood' },
            { key: 'stress', label: '😰 Stress' },
            { key: 'both', label: '📊 Both' }
          ].map(type => (
            <button
              key={type.key}
              onClick={() => setChartType(type.key)}
              className={`px-2 py-1 rounded border ${chartType === type.key ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 border-purple-500'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-stats grid grid-cols-3 gap-2 mb-4">
        <div className="bg-blue-100 rounded p-2 text-center">
          <h4 className="font-bold">😊 Avg Mood</h4>
          <div className="text-2xl font-bold mood">{getMoodAverage()}/10</div>
        </div>
        <div className="bg-red-100 rounded p-2 text-center">
          <h4 className="font-bold">😰 Avg Stress</h4>
          <div className="text-2xl font-bold stress">{getStressAverage()}/10</div>
        </div>
        <div className="bg-green-100 rounded p-2 text-center">
          <h4 className="font-bold">📝 Data Points</h4>
          <div className="text-2xl font-bold">{chartData.length}</div>
        </div>
      </div>
      <div className="chart-container mb-4" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'both' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12 }}
                label={{ value: 'Scale (0-10)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4 }}
                connectNulls={false}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ r: 4 }}
                connectNulls={false}
                name="Stress"
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12 }}
                label={{ value: 'Scale (0-10)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={chartType}
                stroke={chartType === 'mood' ? '#10b981' : '#ef4444'}
                fill={chartType === 'mood' ? '#10b98130' : '#ef444430'}
                strokeWidth={3}
                connectNulls={false}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="chart-insights">
        <h4 className="font-bold mb-2">💡 Insights</h4>
        <div className="flex flex-col gap-2">
          {getMoodAverage() >= 7 && (
            <div className="insight positive flex items-center gap-2 text-green-700">
              <span>🎉</span>
              <span>Your average mood is great! Keep up the positive mindset.</span>
            </div>
          )}
          {getStressAverage() >= 7 && (
            <div className="insight warning flex items-center gap-2 text-red-700">
              <span>⚠️</span>
              <span>Your stress levels seem high. Consider stress management techniques.</span>
            </div>
          )}
          {chartData.length >= 7 && (
            <div className="insight positive flex items-center gap-2 text-blue-700">
              <span>📈</span>
              <span>Great job tracking your mental health consistently!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodGraph;
