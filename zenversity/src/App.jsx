




import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for demo
const mockMoodData = [
  { date: 'Dec 15', mood: 7, stress: 4, fullDate: '2024-12-15' },
  { date: 'Dec 16', mood: 6, stress: 6, fullDate: '2024-12-16' },
  { date: 'Dec 17', mood: 8, stress: 3, fullDate: '2024-12-17' },
  { date: 'Dec 18', mood: 5, stress: 7, fullDate: '2024-12-18' },
  { date: 'Dec 19', mood: 7, stress: 5, fullDate: '2024-12-19' },
  { date: 'Dec 20', mood: 9, stress: 2, fullDate: '2024-12-20' },
  { date: 'Dec 21', mood: 6, stress: 6, fullDate: '2024-12-21' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moodData, setMoodData] = useState(mockMoodData);
  const [stressData, setStressData] = useState([
    { level: 4, source: 'College Applications', timestamp: new Date('2024-12-21'), emoji: '😐' },
    { level: 7, source: 'Schoolwork', timestamp: new Date('2024-12-20'), emoji: '😫' },
    { level: 3, source: 'Social Situations', timestamp: new Date('2024-12-19'), emoji: '😌' }
  ]);
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      content: "Had a good day today. Submitted my UC application and feeling relieved. The process was stressful but I'm proud of myself for getting it done.",
      timestamp: new Date('2024-12-20'),
      wordCount: 27
    }
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Submit UC Application', dueDate: '2024-12-22', category: 'College Applications', priority: 'high', completed: true },
    { id: 2, taskName: 'Write Stanford Essay', dueDate: '2024-12-25', category: 'Essays', priority: 'high', completed: false },
    { id: 3, taskName: 'Request Transcript', dueDate: '2024-12-28', category: 'Transcripts', priority: 'medium', completed: false }
  ]);

  const tabs = [
    { id: 'dashboard', name: '🏠 Dashboard' },
    { id: 'mood', name: '😊 Mood' },
    { id: 'stress', name: '😰 Stress' },
    { id: 'journal', name: '📝 Journal' },
    { id: 'deadlines', name: '📅 Deadlines' },
    { id: 'insights', name: '📊 Insights' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'mood':
        return <MoodTracker moodData={moodData} setMoodData={setMoodData} />;
      case 'stress':
        return <StressTracker stressData={stressData} setStressData={setStressData} />;
      case 'journal':
        return <Journal journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'deadlines':
        return <DeadlineTracker tasks={tasks} setTasks={setTasks} />;
      case 'insights':
        return <InsightsPage moodData={moodData} stressData={stressData} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white',
          padding: '2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 1rem',
          overflowX: 'auto',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderBottom: `3px solid ${activeTab === tab.id ? '#4f46e5' : 'transparent'}`,
                whiteSpace: 'nowrap',
                color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
                backgroundColor: activeTab === tab.id ? '#f0f9ff' : 'transparent'
              }}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

// ...existing code for Dashboard, MoodTracker, StressTracker, Journal, DeadlineTracker, EncouragementGenerator, InsightsPage, MoodGraph, WeeklySummary (as in your previous message)

export default App;
