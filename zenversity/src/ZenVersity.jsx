// Only keep one import block at the top and one implementation of each component.
// Remove all duplicate imports, duplicate ZenVersity function/component definitions, and duplicate export default statements.
// Ensure only one complete, valid implementation of ZenVersity and its dependencies exists in the file.
// (See below for the rest of your code, keeping only one version of each component and import.)

// (Paste all other component code here, ensuring each is defined once, not nested, and all styles are inside JSX)

// Only keep one import block at the top and one implementation of each component.
// Remove all duplicate imports, duplicate ZenVersity function/component definitions, and duplicate export default statements.
// Ensure only one complete, valid implementation of ZenVersity and its dependencies exists in the file.

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

      </main>
    </div>
  );
}

export default ZenVersity;
        return <DeadlineTracker tasks={tasks} setTasks={setTasks} />;
      case 'insights':
        return <InsightsPage moodData={moodData} stressData={stressData} journalEntries={journalEntries} tasks={tasks} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body, html { background: #F9FAFB; font-family: 'Inter', 'Poppins', sans-serif; }
        .zv-nav-btn:focus { outline: 2px solid #4C9AFF; outline-offset: 2px; }
        .zv-nav-btn:active { transform: scale(0.98); }
        .zv-btn, .zv-input, .zv-card { transition: box-shadow 0.15s, background 0.15s, color 0.15s, border 0.15s, transform 0.15s; }
        .zv-btn-primary { background: #4C9AFF; color: #fff; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; border: none; box-shadow: 0 2px 8px rgba(76,154,255,0.10); cursor: pointer; }
        .zv-btn-primary:hover, .zv-btn-primary:focus { background: #3578e5; }
        .zv-btn-secondary { background: #fff; color: #4C9AFF; border: 2px solid #4C9AFF; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; box-shadow: 0 2px 8px rgba(76,154,255,0.07); cursor: pointer; }
        .zv-btn-secondary:hover, .zv-btn-secondary:focus { background: #E3F2FD; }
        .zv-input { border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(76,154,255,0.07); border: 1px solid #e5e7eb; padding: 0.5rem 1rem; font-size: 16px; color: #1F2937; background: #fff; }
        .zv-input:focus { border-color: #4C9AFF; box-shadow: 0 0 0 2px #4C9AFF33; }
        .zv-input::placeholder { color: #9CA3AF; }
        .zv-card { background: #fff; border-radius: 1.5rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 1.5rem; margin-bottom: 1.5rem; }
        .zv-section { background: #fff; border-radius: 2rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 2.5rem; margin-bottom: 2rem; }
        .zv-h1 { font-size: 32px; font-weight: 700; color: #1F2937; font-family: inherit; margin-bottom: 0.5rem; }
        .zv-h2 { font-size: 24px; font-weight: 600; color: #1F2937; font-family: inherit; margin-bottom: 1rem; }
        .zv-body { font-size: 16px; color: #1F2937; font-family: inherit; }
        .zv-small { font-size: 14px; color: #6B7280; }
        .zv-success { color: #4CAF50; }
        .zv-error { color: #F44336; }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #43cea2 0%, #4C9AFF 100%)',
          color: 'white',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(76,154,255,0.10)',
          borderBottomLeftRadius: '2.5rem',
          borderBottomRightRadius: '2.5rem',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 400, margin: '0.5rem 0 0 0', opacity: 0.95, fontFamily: 'inherit' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(76,154,255,0.07)',
            borderRadius: '0 0 2rem 2rem',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0.5rem 0',
            position: 'relative',
            zIndex: 2
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="zv-nav-btn"
              aria-label={tab.name.replace(/[^a-zA-Z ]/g, '')}
              style={{
                background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '1rem',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem 1.5rem 0 0',
                margin: '0 0.25rem',
                cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s, border-bottom 0.15s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
              onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
              onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1rem 2rem 1rem',
          minHeight: 'calc(100vh - 220px)',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          animation: 'fadeIn 0.7s ease',
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Welcome to ZenVersity! 🎓</h2>
      <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Track your mood, manage stress, journal your thoughts, and stay on top of deadlines—all in one place.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <EncouragementGenerator />
      </div>
    </div>
  );
}

// ...rest of the components: MoodTracker, StressTracker, Journal, DeadlineTracker, EncouragementGenerator, InsightsPage, MoodGraph, WeeklySummary...

import React, { useState } from "react";
// Import your subcomponents here
// import Dashboard from "./Dashboard";
// import MoodTracker from "./MoodTracker";

import React, { useState } from "react";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "mood", label: "Mood Tracker" },
  { id: "resources", label: "Resources" },
  { id: "profile", label: "Profile" },
];

const mockMoodData = [
  { date: "2025-08-01", mood: "Happy" },
  { date: "2025-08-02", mood: "Sad" },
  { date: "2025-08-03", mood: "Excited" },
  { date: "2025-08-04", mood: "Anxious" },
];

function ZenVersity() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to ZenVersity! Track your mood, manage stress, and more.</p>
          </div>
        );
      case "mood":
        return (
          <div>
            <h2>Mood Tracker</h2>
            <ul>
              {mockMoodData.map((entry) => (
                <li key={entry.date}>
                  {entry.date}: {entry.mood}
                </li>
              ))}
            </ul>
          </div>
        );
      case "resources":
        return (
          <div>
            <h2>Resources</h2>

import React, { useState } from "react";

const tabs = [
  { key: "dashboard", label: "🏠 Dashboard" },
  { key: "mood", label: "😊 Mood Tracker" },
  { key: "resources", label: "📚 Resources" },
  { key: "profile", label: "👤 Profile" },
];

const mockMoodData = [
  { date: "2025-08-01", mood: "Happy" },
  { date: "2025-08-02", mood: "Sad" },
  { date: "2025-08-03", mood: "Excited" },
  { date: "2025-08-04", mood: "Anxious" },
];

function ZenVersity() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to ZenVersity! Track your mood, manage stress, and more.</p>
          </div>
        );
      case "mood":
        return (
          <div>
            <h2>Mood Tracker</h2>
            <ul>
              {mockMoodData.map((entry) => (
                <li key={entry.date}>
                  {entry.date}: {entry.mood}
                </li>
              ))}
            </ul>
          </div>
        );
      case "resources":
        return (
          <div>
            <h2>Resources</h2>

import React, { useState } from "react";

const tabs = [
  { key: "dashboard", label: "🏠 Dashboard" },
  { key: "mood", label: "😊 Mood Tracker" },
  { key: "resources", label: "📚 Resources" },
  { key: "profile", label: "👤 Profile" },
];

const mockMoodData = [
  { date: "2025-08-01", mood: "Happy" },
  { date: "2025-08-02", mood: "Sad" },
  { date: "2025-08-03", mood: "Excited" },
  { date: "2025-08-04", mood: "Anxious" },
];

function ZenVersity() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to ZenVersity! Track your mood, manage stress, and more.</p>
          </div>
        );
      case "mood":
        return (
          <div>
            <h2>Mood Tracker</h2>
            <ul>
              {mockMoodData.map((entry) => (
                <li key={entry.date}>
                  {entry.date}: {entry.mood}
                </li>
              ))}
            </ul>
          </div>
        );
      case "resources":
        return (
          <div>
            <h2>Resources</h2>
            <p>Helpful links and articles go here.</p>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2>Profile</h2>
            <p>Your profile information.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      <header style={{ background: "#4F8A8B", color: "#fff", padding: "32px 0 16px 0", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "2.5rem", letterSpacing: "2px" }}>ZenVersity</h1>
        <p style={{ margin: "8px 0 0 0", fontSize: "1.2rem", fontWeight: 300 }}>
          Your mental wellness companion
        </p>
      </header>
      <nav style={{ display: "flex", justifyContent: "center", margin: "32px 0 24px 0" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            style={{
              padding: "12px 24px",
              margin: "0 8px",
              border: "none",
              borderRadius: "6px",
              background: activeTab === tab.key ? "#4F8A8B" : "#f0f0f0",
              color: activeTab === tab.key ? "#fff" : "#333",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              boxShadow: activeTab === tab.key ? "0 2px 8px rgba(79,138,139,0.15)" : "none",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main style={{ maxWidth: 800, margin: "0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: 32, minHeight: 400 }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default ZenVersity;
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Welcome to ZenVersity! 🎓</h2>
      <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Track your mood, manage stress, journal your thoughts, and stay on top of deadlines—all in one place.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <EncouragementGenerator />
      </div>
    </div>
  );
}

// ...existing code for MoodTracker, StressTracker, Journal, DeadlineTracker, EncouragementGenerator, InsightsPage, MoodGraph, WeeklySummary...
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demo
import React, { useState } from "react";

const demoTabs = [
  { key: "dashboard", label: "🏠 Dashboard" },
  { key: "mood", label: "😊 Mood Tracker" },
  { key: "resources", label: "📚 Resources" },
  { key: "profile", label: "👤 Profile" },
];

const demoMoodData = [
  { date: "2025-08-01", mood: "Happy" },
  { date: "2025-08-02", mood: "Sad" },
  { date: "2025-08-03", mood: "Excited" },
  { date: "2025-08-04", mood: "Anxious" },
];

function ZenVersity() {
  const [activeTab, setActiveTab] = useState("dashboard");

  function renderContent() {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2>Welcome to ZenVersity! 🎓</h2>
            <p>Track your mood, manage stress, and stay on top of your wellness journey.</p>
          </div>
        );
      case "mood":
        return (
          <div>
            <h2>Mood Tracker</h2>
            <ul>
              {demoMoodData.map((entry) => (
                <li key={entry.date}>{entry.date}: {entry.mood}</li>
              ))}
            </ul>
          </div>
        );
      case "resources":
        return (
          <div>
            <h2>Resources</h2>
            <p>Helpful links and articles coming soon.</p>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2>Profile</h2>
            <p>Your profile details will appear here.</p>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      <header style={{ background: "#4F8A8B", color: "#fff", padding: "32px 0 16px 0", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "2.5rem", letterSpacing: "2px" }}>ZenVersity</h1>
        <p style={{ margin: "8px 0 0 0", fontSize: "1.2rem", fontWeight: 300 }}>
          Your mental wellness companion
        </p>
      </header>
      <nav style={{ display: "flex", justifyContent: "center", margin: "32px 0 24px 0" }}>
        {demoTabs.map((tab) => (
          <button
            key={tab.key}
            style={{
              padding: "12px 24px",
              margin: "0 8px",
              border: "none",
              borderRadius: "6px",
              background: activeTab === tab.key ? "#4F8A8B" : "#f0f0f0",
              color: activeTab === tab.key ? "#fff" : "#333",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              boxShadow: activeTab === tab.key ? "0 2px 8px rgba(79,138,139,0.15)" : "none",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main style={{ maxWidth: 800, margin: "0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: 32, minHeight: 400 }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default ZenVersity;

function ZenVersity() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Removed duplicate declaration of moodData
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
    switch (activeTab) {
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
        return <InsightsPage moodData={moodData} stressData={stressData} journalEntries={journalEntries} tasks={tasks} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body, html { background: #F9FAFB; font-family: 'Inter', 'Poppins', sans-serif; }
        .zv-nav-btn:focus { outline: 2px solid #4C9AFF; outline-offset: 2px; }
        .zv-nav-btn:active { transform: scale(0.98); }
        .zv-btn, .zv-input, .zv-card { transition: box-shadow 0.15s, background 0.15s, color 0.15s, border 0.15s, transform 0.15s; }
        .zv-btn-primary { background: #4C9AFF; color: #fff; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; border: none; box-shadow: 0 2px 8px rgba(76,154,255,0.10); cursor: pointer; }
        .zv-btn-primary:hover, .zv-btn-primary:focus { background: #3578e5; }
        .zv-btn-secondary { background: #fff; color: #4C9AFF; border: 2px solid #4C9AFF; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; box-shadow: 0 2px 8px rgba(76,154,255,0.07); cursor: pointer; }
        .zv-btn-secondary:hover, .zv-btn-secondary:focus { background: #E3F2FD; }
        .zv-input { border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(76,154,255,0.07); border: 1px solid #e5e7eb; padding: 0.5rem 1rem; font-size: 16px; color: #1F2937; background: #fff; }
        .zv-input:focus { border-color: #4C9AFF; box-shadow: 0 0 0 2px #4C9AFF33; }
        .zv-input::placeholder { color: #9CA3AF; }
        .zv-card { background: #fff; border-radius: 1.5rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 1.5rem; margin-bottom: 1.5rem; }
        .zv-section { background: #fff; border-radius: 2rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 2.5rem; margin-bottom: 2rem; }
        .zv-h1 { font-size: 32px; font-weight: 700; color: #1F2937; font-family: inherit; margin-bottom: 0.5rem; }
        .zv-h2 { font-size: 24px; font-weight: 600; color: #1F2937; font-family: inherit; margin-bottom: 1rem; }
        .zv-body { font-size: 16px; color: #1F2937; font-family: inherit; }
        .zv-small { font-size: 14px; color: #6B7280; }
        .zv-success { color: #4CAF50; }
        .zv-error { color: #F44336; }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #43cea2 0%, #4C9AFF 100%)',
          color: 'white',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(76,154,255,0.10)',
          borderBottomLeftRadius: '2.5rem',
          borderBottomRightRadius: '2.5rem',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 400, margin: '0.5rem 0 0 0', opacity: 0.95, fontFamily: 'inherit' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(76,154,255,0.07)',
            borderRadius: '0 0 2rem 2rem',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0.5rem 0',
            position: 'relative',
            zIndex: 2
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="zv-nav-btn"
              aria-label={tab.name.replace(/[^a-zA-Z ]/g, '')}
              style={{
                background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '1rem',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem 1.5rem 0 0',
                margin: '0 0.25rem',
                cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s, border-bottom 0.15s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
              onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
              onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1rem 2rem 1rem',
          minHeight: 'calc(100vh - 220px)',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          animation: 'fadeIn 0.7s ease',
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

// --- Dashboard Component ---
function Dashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Welcome to ZenVersity! 🎓</h2>
      <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Track your mood, manage stress, journal your thoughts, and stay on top of deadlines—all in one place.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <EncouragementGenerator />
      </div>
    </div>
  );
}

// ...existing code for MoodTracker, StressTracker, Journal, DeadlineTracker, EncouragementGenerator, InsightsPage, MoodGraph, WeeklySummary should be included here, unchanged...


import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demo
// ...existing code...

function ZenVersity() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Removed duplicate declaration of moodData
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
    switch (activeTab) {
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
        return <InsightsPage moodData={moodData} stressData={stressData} journalEntries={journalEntries} tasks={tasks} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body, html { background: #F9FAFB; font-family: 'Inter', 'Poppins', sans-serif; }
        .zv-nav-btn:focus { outline: 2px solid #4C9AFF; outline-offset: 2px; }
        .zv-nav-btn:active { transform: scale(0.98); }
        .zv-btn, .zv-input, .zv-card { transition: box-shadow 0.15s, background 0.15s, color 0.15s, border 0.15s, transform 0.15s; }
        .zv-btn-primary { background: #4C9AFF; color: #fff; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; border: none; box-shadow: 0 2px 8px rgba(76,154,255,0.10); cursor: pointer; }
        .zv-btn-primary:hover, .zv-btn-primary:focus { background: #3578e5; }
        .zv-btn-secondary { background: #fff; color: #4C9AFF; border: 2px solid #4C9AFF; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; box-shadow: 0 2px 8px rgba(76,154,255,0.07); cursor: pointer; }
        .zv-btn-secondary:hover, .zv-btn-secondary:focus { background: #E3F2FD; }
        .zv-input { border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(76,154,255,0.07); border: 1px solid #e5e7eb; padding: 0.5rem 1rem; font-size: 16px; color: #1F2937; background: #fff; }
        .zv-input:focus { border-color: #4C9AFF; box-shadow: 0 0 0 2px #4C9AFF33; }
        .zv-input::placeholder { color: #9CA3AF; }
        .zv-card { background: #fff; border-radius: 1.5rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 1.5rem; margin-bottom: 1.5rem; }
        .zv-section { background: #fff; border-radius: 2rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 2.5rem; margin-bottom: 2rem; }
        .zv-h1 { font-size: 32px; font-weight: 700; color: #1F2937; font-family: inherit; margin-bottom: 0.5rem; }
        .zv-h2 { font-size: 24px; font-weight: 600; color: #1F2937; font-family: inherit; margin-bottom: 1rem; }
        .zv-body { font-size: 16px; color: #1F2937; font-family: inherit; }
        .zv-small { font-size: 14px; color: #6B7280; }
        .zv-success { color: #4CAF50; }
        .zv-error { color: #F44336; }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #43cea2 0%, #4C9AFF 100%)',
          color: 'white',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(76,154,255,0.10)',
          borderBottomLeftRadius: '2.5rem',
          borderBottomRightRadius: '2.5rem',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 400, margin: '0.5rem 0 0 0', opacity: 0.95, fontFamily: 'inherit' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(76,154,255,0.07)',
            borderRadius: '0 0 2rem 2rem',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0.5rem 0',
            position: 'relative',
            zIndex: 2
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="zv-nav-btn"
              aria-label={tab.name.replace(/[^a-zA-Z ]/g, '')}
              style={{
                background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '1rem',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem 1.5rem 0 0',
                margin: '0 0.25rem',
                cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s, border-bottom 0.15s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
              onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
              onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1rem 2rem 1rem',
          minHeight: 'calc(100vh - 220px)',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          animation: 'fadeIn 0.7s ease',
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
    { id: 3, taskName: 'Request Transcript', dueDate: '2024-12-28', category: 'Transcripts', priority: 'medium', completed: false }
  ]);
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body, html { background: #F9FAFB; font-family: 'Inter', 'Poppins', sans-serif; }
        .zv-nav-btn:focus { outline: 2px solid #4C9AFF; outline-offset: 2px; }
        .zv-nav-btn:active { transform: scale(0.98); }
        .zv-btn, .zv-input, .zv-card { transition: box-shadow 0.15s, background 0.15s, color 0.15s, border 0.15s, transform 0.15s; }
        .zv-btn-primary { background: #4C9AFF; color: #fff; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; border: none; box-shadow: 0 2px 8px rgba(76,154,255,0.10); cursor: pointer; }
        .zv-btn-primary:hover, .zv-btn-primary:focus { background: #3578e5; }
        .zv-btn-secondary { background: #fff; color: #4C9AFF; border: 2px solid #4C9AFF; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; box-shadow: 0 2px 8px rgba(76,154,255,0.07); cursor: pointer; }
        .zv-btn-secondary:hover, .zv-btn-secondary:focus { background: #E3F2FD; }
        .zv-input { border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(76,154,255,0.07); border: 1px solid #e5e7eb; padding: 0.5rem 1rem; font-size: 16px; color: #1F2937; background: #fff; }
        .zv-input:focus { border-color: #4C9AFF; box-shadow: 0 0 0 2px #4C9AFF33; }
        .zv-input::placeholder { color: #9CA3AF; }
        .zv-card { background: #fff; border-radius: 1.5rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 1.5rem; margin-bottom: 1.5rem; }
        .zv-section { background: #fff; border-radius: 2rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 2.5rem; margin-bottom: 2rem; }
        .zv-h1 { font-size: 32px; font-weight: 700; color: #1F2937; font-family: inherit; margin-bottom: 0.5rem; }
        .zv-h2 { font-size: 24px; font-weight: 600; color: #1F2937; font-family: inherit; margin-bottom: 1rem; }
        .zv-body { font-size: 16px; color: #1F2937; font-family: inherit; }
        .zv-small { font-size: 14px; color: #6B7280; }
        .zv-success { color: #4CAF50; }
        .zv-error { color: #F44336; }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #43cea2 0%, #4C9AFF 100%)',
          color: 'white',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(76,154,255,0.10)',
          borderBottomLeftRadius: '2.5rem',
          borderBottomRightRadius: '2.5rem',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 400, margin: '0.5rem 0 0 0', opacity: 0.95, fontFamily: 'inherit' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(76,154,255,0.07)',
            borderRadius: '0 0 2rem 2rem',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0.5rem 0',
            position: 'relative',
            zIndex: 2
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="zv-nav-btn"
              aria-label={tab.name.replace(/[^a-zA-Z ]/g, '')}
              style={{
                background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '1rem',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem 1.5rem 0 0',
                margin: '0 0.25rem',
                cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s, borderBottom 0.15s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
              onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
              onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1rem 2rem 1rem',
          minHeight: 'calc(100vh - 220px)',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          animation: 'fadeIn 0.7s ease',
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );

                style={{
                  background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                  color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: '1rem',
                  padding: '0.75rem 2rem',
                  borderRadius: '1.5rem 1.5rem 0 0',
                  margin: '0 0.25rem',
                  cursor: 'pointer',
                  transition: 'color 0.15s, background 0.15s, border-bottom 0.15s',
                  outline: 'none',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
                }}
                onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
                onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
                onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
                onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <main style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2.5rem 1rem 2rem 1rem',
            minHeight: 'calc(100vh - 220px)',
            fontFamily: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            animation: 'fadeIn 0.7s ease'
          }}>
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
// ...rest of your components (Dashboard, MoodTracker, etc.) remain unchanged and should be inside this file...

function MoodTracker({ moodData, setMoodData }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodScale, setMoodScale] = useState(5);
  const moods = [
    { emoji: '😄', label: 'Amazing', value: 9 },
    { emoji: '😊', label: 'Good', value: 7 },
    { emoji: '😐', label: 'Okay', value: 5 },
    { emoji: '😔', label: 'Down', value: 3 },
    { emoji: '😭', label: 'Terrible', value: 1 }
  ];
  const handleMoodSubmit = (mood) => {
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: mood.value,
      stress: null,
      fullDate: new Date().toISOString().split('T')[0]
    };
    setMoodData(prev => [...prev, newEntry]);
    setSelectedMood(mood.label);
    setTimeout(() => setSelectedMood(''), 2000);
  };
  const handleScaleSubmit = () => {
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodScale,
      stress: null,
      fullDate: new Date().toISOString().split('T')[0]
    };
    setMoodData(prev => [...prev, newEntry]);
  };
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>How are you feeling today? 😊</h2>
      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Quick Mood Check</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem'
        }}>
          {moods.map((mood) => {
            const borderColor = selectedMood === mood.label ? '#10b981' : '#e5e7eb';
            return (
              <button
                key={mood.label}
                onClick={() => handleMoodSubmit(mood)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                  background: selectedMood === mood.label ? '#ecfdf5' : 'white',
                  border: '2px solid ' + borderColor,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mood.emoji}</span>
                <span style={{ fontWeight: '500' }}>{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Rate Your Overall Mood (1-10)</h3>
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Current: {moodScale}/10
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={moodScale}
            onChange={(e) => setMoodScale(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              outline: 'none',
              WebkitAppearance: 'none',
              marginBottom: '1rem'
            }}
          />
        </div>
        <button
          onClick={handleScaleSubmit}
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Save Mood Rating
        </button>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Your Recent Moods</h3>
        <div>
          {moodData.slice(-5).reverse().map((mood, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {mood.mood >= 8 ? '😄' : mood.mood >= 6 ? '😊' : mood.mood >= 4 ? '😐' : mood.mood >= 2 ? '😔' : '😭'}
              </span>
              <span>
                Mood: {mood.mood}/10 - {mood.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demo
// ...existing code...

function ZenVersity() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Removed duplicate declaration of moodData
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
    switch (activeTab) {
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
        return <InsightsPage moodData={moodData} stressData={stressData} journalEntries={journalEntries} tasks={tasks} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body, html { background: #F9FAFB; font-family: 'Inter', 'Poppins', sans-serif; }
        .zv-nav-btn:focus { outline: 2px solid #4C9AFF; outline-offset: 2px; }
        .zv-nav-btn:active { transform: scale(0.98); }
        .zv-btn, .zv-input, .zv-card { transition: box-shadow 0.15s, background 0.15s, color 0.15s, border 0.15s, transform 0.15s; }
        .zv-btn-primary { background: #4C9AFF; color: #fff; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; border: none; box-shadow: 0 2px 8px rgba(76,154,255,0.10); cursor: pointer; }
        .zv-btn-primary:hover, .zv-btn-primary:focus { background: #3578e5; }
        .zv-btn-secondary { background: #fff; color: #4C9AFF; border: 2px solid #4C9AFF; border-radius: 1rem; font-weight: 600; font-size: 16px; padding: 0.5rem 1.25rem; box-shadow: 0 2px 8px rgba(76,154,255,0.07); cursor: pointer; }
        .zv-btn-secondary:hover, .zv-btn-secondary:focus { background: #E3F2FD; }
        .zv-input { border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(76,154,255,0.07); border: 1px solid #e5e7eb; padding: 0.5rem 1rem; font-size: 16px; color: #1F2937; background: #fff; }
        .zv-input:focus { border-color: #4C9AFF; box-shadow: 0 0 0 2px #4C9AFF33; }
        .zv-input::placeholder { color: #9CA3AF; }
        .zv-card { background: #fff; border-radius: 1.5rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 1.5rem; margin-bottom: 1.5rem; }
        .zv-section { background: #fff; border-radius: 2rem; box-shadow: 0 4px 16px rgba(76,154,255,0.08); padding: 2.5rem; margin-bottom: 2rem; }
        .zv-h1 { font-size: 32px; font-weight: 700; color: #1F2937; font-family: inherit; margin-bottom: 0.5rem; }
        .zv-h2 { font-size: 24px; font-weight: 600; color: #1F2937; font-family: inherit; margin-bottom: 1rem; }
        .zv-body { font-size: 16px; color: #1F2937; font-family: inherit; }
        .zv-small { font-size: 14px; color: #6B7280; }
        .zv-success { color: #4CAF50; }
        .zv-error { color: #F44336; }
      `}</style>
      <div style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #43cea2 0%, #4C9AFF 100%)',
          color: 'white',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(76,154,255,0.10)',
          borderBottomLeftRadius: '2.5rem',
          borderBottomRightRadius: '2.5rem'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
            🧘‍♀️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 400, margin: '0.5rem 0 0 0', opacity: 0.95, fontFamily: 'inherit' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(76,154,255,0.07)',
            borderRadius: '0 0 2rem 2rem',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0.5rem 0',
            position: 'relative',
            zIndex: 2
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="zv-nav-btn"
              aria-label={tab.name.replace(/[^a-zA-Z ]/g, '')}
              style={{
                background: activeTab === tab.id ? 'rgba(76,154,255,0.10)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4C9AFF' : '3px solid transparent',
                color: activeTab === tab.id ? '#4C9AFF' : '#1F2937',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '1rem',
                padding: '0.75rem 2rem',
                borderRadius: '1.5rem 1.5rem 0 0',
                margin: '0 0.25rem',
                cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s, borderBottom 0.15s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#3578e5'}
              onMouseOut={e => e.currentTarget.style.color = activeTab === tab.id ? '#4C9AFF' : '#1F2937'}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px #4C9AFF'}
              onBlur={e => e.currentTarget.style.boxShadow = activeTab === tab.id ? '0 2px 8px rgba(76,154,255,0.08)' : 'none'}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1rem 2rem 1rem',
          minHeight: 'calc(100vh - 220px)',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          animation: 'fadeIn 0.7s ease'
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

// --- Dashboard Component ---
function Dashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Welcome to ZenVersity! 🎓</h2>
      <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Track your mood, manage stress, journal your thoughts, and stay on top of deadlines—all in one place.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <EncouragementGenerator />
      </div>
    </div>
  );
}

// ...existing code for MoodTracker, StressTracker, Journal, DeadlineTracker, EncouragementGenerator, InsightsPage, MoodGraph, WeeklySummary...
// (Copy all other component code from your previous file here, ensuring all style objects use valid JS syntax)



function StressTracker({ stressData, setStressData }) {
  const [stressLevel, setStressLevel] = useState(5);
  const [stressSource, setStressSource] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const sources = [
    'College Applications',
    'Schoolwork',
    'Social Situations',
    'Family',
    'Other'
  ];
  const emojiForLevel = (level) => {
    if (level >= 8) return '😫';
    if (level >= 6) return '😟';
    if (level >= 4) return '😐';
    if (level >= 2) return '😌';
    return '😃';
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stressSource) return;
    const newEntry = {
      level: stressLevel,
      source: stressSource,
      timestamp: new Date(),
      emoji: emojiForLevel(stressLevel)
    };
    setStressData(prev => [newEntry, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
    setStressSource('');
    setStressLevel(5);
  };
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>How stressed are you feeling? 😰</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Stress Level (0-10):</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{emojiForLevel(stressLevel)}</span>
            <input
              type="range"
              min="0"
              max="10"
              value={stressLevel}
              onChange={e => setStressLevel(parseInt(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontWeight: '500' }}>{stressLevel}/10</span>
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Main Source of Stress:</label>
          <select
            value={stressSource}
            onChange={e => setStressSource(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}
            required
          >
            <option value="" disabled>Select source</option>
            {sources.map(src => <option key={src} value={src}>{src}</option>)}
          </select>
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Log Stress
        </button>
        {showSuccess && <div style={{ color: '#10b981', marginTop: '1rem', fontWeight: '500' }}>Logged!</div>}
      </form>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Recent Stress Logs</h3>
        {stressData.length === 0 && <div style={{ color: '#6b7280' }}>No stress logs yet.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {stressData.slice(0, 5).map((entry, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '0.75rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{entry.emoji}</span>
              <span style={{ fontWeight: '500' }}>{entry.level}/10</span>
              <span style={{ color: '#6b7280' }}>{entry.source}</span>
              <span style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: '0.95rem' }}>{entry.timestamp instanceof Date ? entry.timestamp.toLocaleDateString() : new Date(entry.timestamp).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Journal({ journalEntries, setJournalEntries }) {
  const [entry, setEntry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      content: entry,
      timestamp: new Date(),
      wordCount: entry.trim().split(/\s+/).length
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    setEntry('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
  };

  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSaveEdit = (id) => {
    setJournalEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, content: editContent, wordCount: editContent.trim().split(/\s+/).length } : entry
    ));
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (id) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>📝 Journal</h2>
      <form onSubmit={handleAddEntry} style={{ marginBottom: '2rem' }}>
        <textarea
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Write about your day, your feelings, or anything on your mind..."
          rows={4}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '1rem',
            marginBottom: '1rem',
            resize: 'vertical',
            background: '#f9fafb'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{entry.trim() ? (entry.trim().split(/\s+/).length + ' words') : '0 words'}</span>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Add Entry
          </button>
        </div>
        {showSuccess && <div style={{ color: '#10b981', marginTop: '1rem', fontWeight: '500' }}>Entry added!</div>}
      </form>
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#4f46e5' }}>Recent Entries</h3>
        {journalEntries.length === 0 && <div style={{ color: '#6b7280' }}>No journal entries yet.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {journalEntries.map(entry => (
            <div key={entry.id} style={{
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              position: 'relative'
            }}>
              {editingId === entry.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      marginBottom: '0.5rem',
                      background: 'white'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSaveEdit(entry.id)}
                      style={{
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.4rem 1rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >Save</button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        background: '#e5e7eb',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.4rem 1rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '0.5rem', whiteSpace: 'pre-line', color: '#1f2937' }}>{entry.content}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', color: '#6b7280' }}>
                    <span>{entry.timestamp instanceof Date ? entry.timestamp.toLocaleString() : new Date(entry.timestamp).toLocaleString()}</span>
                    <span>{entry.wordCount} words</span>
                  </div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(entry.id, entry.content)}
                      style={{
                        background: '#f3f4f6',
                        color: '#4f46e5',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.3rem 0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.3rem 0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeadlineTracker({ tasks, setTasks }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = [
    'College Applications',
    'Essays',
    'Transcripts',
    'Recommendations',
    'Other'
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !dueDate || !category) return;
    const newTask = {
      id: Date.now(),
      taskName,
      dueDate,
      category,
      priority,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    setTaskName('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
  };

  const handleComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>📅 Deadlines & Tasks</h2>
      <form onSubmit={handleAddTask} style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
        <div>
          <label style={{ fontWeight: '500', marginBottom: '0.3rem', display: 'block' }}>Task</label>
          <input
            type="text"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            placeholder="e.g. Submit UC Application"
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: '500', marginBottom: '0.3rem', display: 'block' }}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: '500', marginBottom: '0.3rem', display: 'block' }}>Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: '500', marginBottom: '0.3rem', display: 'block' }}>Priority</label>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            padding: '0.7rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            height: '48px'
          }}
        >
          Add
        </button>
      </form>
      {showSuccess && <div style={{ color: '#10b981', marginBottom: '1rem', fontWeight: '500' }}>Task added!</div>}
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#4f46e5' }}>Upcoming Tasks</h3>
        {tasks.length === 0 && <div style={{ color: '#6b7280' }}>No tasks yet.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{
              background: task.completed ? '#e0e7ff' : '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              opacity: task.completed ? 0.7 : 1
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleComplete(task.id)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#4f46e5' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: '#1f2937', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.taskName}</div>
                <div style={{ fontSize: '0.95rem', color: '#6b7280', marginTop: '0.2rem' }}>
                  Due: {task.dueDate ? (() => {
                    // Fix timezone offset so date matches input
                    const dateObj = new Date(task.dueDate + 'T00:00:00');
                    return dateObj.toLocaleDateString();
                  })() : 'N/A'} | Category: {task.category} | Priority: <span style={{ color: task.priority === 'high' ? '#b91c1c' : task.priority === 'medium' ? '#f59e42' : '#10b981', fontWeight: '600' }}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EncouragementGenerator() {
  const encouragements = [
    "You're doing amazing! Keep going.",
    "Remember to take a deep breath. You got this!",
    "Progress, not perfection. Every step counts.",
    "You are stronger than you think.",
    "Be proud of how far you've come.",
    "It's okay to take breaks. Self-care matters!",
    "Your hard work will pay off.",
    "You are enough, just as you are.",
    "Stay positive and keep moving forward.",
    "Believe in yourself!"
  ];
  const [message, setMessage] = useState(() => encouragements[Math.floor(Math.random() * encouragements.length)]);
  const [fade, setFade] = useState(false);

  const handleNewMessage = () => {
    setFade(true);
    setTimeout(() => {
      let newMsg;
      do {
        newMsg = encouragements[Math.floor(Math.random() * encouragements.length)];
      } while (newMsg === message && encouragements.length > 1);
      setMessage(newMsg);
      setFade(false);
    }, 350);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h3 style={{ color: '#4f46e5', marginBottom: '1.5rem', fontWeight: 700 }}>🌟 Encouragement</h3>
      <div style={{
        minHeight: '3.5rem',
        fontSize: '1.2rem',
        color: '#1f2937',
        marginBottom: '1.5rem',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.35s'
      }}>
        {message}
      </div>
      <button
        onClick={handleNewMessage}
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white',
          border: 'none',
          padding: '0.7rem 1.5rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}
      >
        New Message
      </button>
    </div>
  );
}

function InsightsPage({ moodData, stressData, journalEntries, tasks }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', padding: '2rem 0' }}>
      <MoodGraph moodData={moodData} stressData={stressData} />
      <WeeklySummary moodData={moodData} stressData={stressData} journalEntries={journalEntries} tasks={tasks} />
    </div>
  );
}

function MoodGraph({ moodData, stressData }) {
  // Tooltip formatter for recharts
  const tooltipFormatter = (value, name) => [
    `${value}/10`,
    name === 'mood' ? 'Mood' : 'Stress'
  ];
  const [range, setRange] = useState('week'); // 'week', 'month', 'all'
  // Filter and merge data for the graph
  const getFilteredData = () => {
    let cutoff = new Date();
    if (range === 'week') cutoff.setDate(cutoff.getDate() - 7);
    else if (range === 'month') cutoff.setDate(cutoff.getDate() - 30);
    // Merge mood and stress by date
    const map = {};
    moodData.forEach(m => {
      if (!map[m.fullDate]) map[m.fullDate] = { date: m.date, mood: null, stress: null };
      map[m.fullDate].mood = m.mood;
    });
    if (stressData) {
      stressData.forEach(s => {
        const d = s.timestamp instanceof Date ? s.timestamp : new Date(s.timestamp);
        const key = d.toISOString().split('T')[0];
        if (!map[key]) map[key] = { date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), mood: null, stress: null };
        map[key].stress = s.level;
      });
    }
    let arr = Object.entries(map).map(([k, v]) => ({ ...v, fullDate: k }));
    arr = arr.filter(item => {
      const d = new Date(item.fullDate);
      return range === 'all' || d >= cutoff;
    });
    arr.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
    return arr;
  };

  const data = getFilteredData();

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Mood & Stress Trends</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <label style={{ fontWeight: 500 }}>Show data for:</label>
        <select value={range} onChange={e => setRange(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      {data.length === 0 ? (
        <div style={{ color: '#6b7280', textAlign: 'center', margin: '2rem 0' }}>No data to display yet. Log some moods and stress levels!</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 13 }} />
            <YAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 13 }} />
            <Tooltip formatter={tooltipFormatter} />
            <Line type="monotone" dataKey="mood" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Mood" />
            <Line type="monotone" dataKey="stress" stroke="#f59e42" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Stress" />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#4f46e5', fontSize: '1.2rem' }}>Avg Mood</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {data.length > 0 ? (data.reduce((sum, d) => sum + (d.mood || 0), 0) / data.filter(d => d.mood != null).length).toFixed(1) : '-'}
            <span style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>😊</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#f59e42', fontSize: '1.2rem' }}>Avg Stress</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {data.length > 0 ? (data.reduce((sum, d) => sum + (d.stress || 0), 0) / data.filter(d => d.stress != null).length).toFixed(1) : '-'}
            <span style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>😰</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklySummary({ moodData, stressData, journalEntries = [], tasks = [] }) {
  // Calculate the start and end of the current week (Sunday to Saturday)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Filter data for this week
  const filterByWeek = (arr, dateKey = 'timestamp') =>
    arr.filter(item => {
      let d;
      if (dateKey === 'dueDate') {
        // dueDate is a string in 'YYYY-MM-DD', convert to Date
        d = new Date(item[dateKey] + 'T00:00:00');
      } else {
        d = item[dateKey] instanceof Date ? item[dateKey] : new Date(item[dateKey]);
      }
      return d >= startOfWeek && d <= endOfWeek;
    });

  const weekMoods = filterByWeek(moodData, 'fullDate');
  const weekStress = filterByWeek(stressData, 'timestamp');
  const weekJournals = filterByWeek(journalEntries, 'timestamp');
  const weekTasks = filterByWeek(tasks, 'dueDate');
  // Calculate completed/total tasks for this week
  const completedTasks = weekTasks.filter(t => t.completed).length;
  const totalTasks = weekTasks.length;

  // Calculate averages safely
  const avgMood = weekMoods.length > 0 ? (weekMoods.reduce((sum, d) => sum + (d.mood || 0), 0) / weekMoods.filter(d => d.mood != null).length).toFixed(1) : '-';
  const avgStress = weekStress.length > 0 ? (weekStress.reduce((sum, d) => sum + (d.level || 0), 0) / weekStress.filter(d => d.level != null).length).toFixed(1) : '-';

  // Mood/Stress trends
  const getTrend = (arr, key) => {
    if (arr.length < 2) return 'stable';
    const first = arr[0][key] || 0;
    const last = arr[arr.length - 1][key] || 0;
    if (last - first > 0.5) return 'up';
    if (last - first < -0.5) return 'down';
    return 'stable';
  };
  const moodTrend = getTrend(weekMoods, 'mood');
  const stressTrend = getTrend(weekStress, 'level');

  // Top stressors
  const topStressors = (() => {
    const count = {};
    weekStress.forEach(s => {
      if (s.source) count[s.source] = (count[s.source] || 0) + 1;
    });
    return Object.entries(count)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([source, num]) => ({ source, num }));
  })();

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
      <h2 style={{ color: '#1f2937', marginBottom: '1.5rem' }}>Weekly Summary</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#4f46e5', fontSize: '1.1rem' }}>Avg Mood</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{avgMood} <span style={{ fontSize: '1.5rem' }}>😊</span></div>
          <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>({moodTrend === 'up' ? 'Improving' : moodTrend === 'down' ? 'Declining' : 'Stable'})</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#f59e42', fontSize: '1.1rem' }}>Avg Stress</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{avgStress} <span style={{ fontSize: '1.5rem' }}>😰</span></div>
          <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>({stressTrend === 'up' ? 'Increasing' : stressTrend === 'down' ? 'Decreasing' : 'Stable'})</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#10b981', fontSize: '1.1rem' }}>Journal Entries</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{weekJournals.length} <span style={{ fontSize: '1.5rem' }}>📝</span></div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, color: '#6366f1', fontSize: '1.1rem' }}>Tasks Completed</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{completedTasks}/{totalTasks} <span style={{ fontSize: '1.5rem' }}>✅</span></div>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#4f46e5', fontWeight: 600, marginBottom: '0.5rem' }}>Top Stressors</h3>
        {topStressors.length === 0 ? (
          <div style={{ color: '#6b7280' }}>No stressors logged this week.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topStressors.map((s, i) => (
              <li key={i} style={{ color: '#f59e42', fontWeight: 500, fontSize: '1rem', marginBottom: '0.3rem' }}>{s.source} <span style={{ color: '#6b7280', fontWeight: 400 }}>({s.num})</span></li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 style={{ color: '#4f46e5', fontWeight: 600, marginBottom: '0.5rem' }}>Recent Journal Highlights</h3>
        {weekJournals.length === 0 ? (
          <div style={{ color: '#6b7280' }}>No journal entries this week.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {weekJournals.slice(0, 3).map((j, i) => (
              <li key={i} style={{ background: '#f9fafb', borderRadius: '8px', padding: '0.7rem', marginBottom: '0.5rem', color: '#1f2937', fontSize: '1rem' }}>{j.entry || j.content}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


