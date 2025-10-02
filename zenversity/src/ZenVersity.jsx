import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './App.css';
import EncouragementGenerator from './components/EncouragementGenerator';

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

function ZenVersity() {
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
    { id: 'mood', name: '😊 Mood Tracker' },
    { id: 'deadlines', name: '📅 Deadline Tracker' },
    { id: 'encouragement', name: '🌟 Encouragement Generator' },
    { id: 'journal', name: '📝 Journal' },
    { id: 'moodgraph', name: '📈 Mood Graph' },
    { id: 'stress', name: '😰 Stress Tracker' },
    { id: 'summary', name: '📊 Summary' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'mood':
        return <MoodTracker moodData={moodData} setMoodData={setMoodData} />;
      case 'deadlines':
        return <DeadlineTracker tasks={tasks} setTasks={setTasks} />;
      case 'encouragement':
        return <EncouragementGenerator />;
      case 'journal':
        return <Journal journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'moodgraph':
        return <MoodGraph moodData={moodData} />;
      case 'stress':
        return <StressTracker stressData={stressData} setStressData={setStressData} />;
      case 'summary':
        return <WeeklySummary moodData={moodData} stressData={stressData} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient)' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.78)', backdropFilter: 'blur(16px)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'transparent',
          color: 'var(--color-title)',
          padding: '2.5rem 0 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--color-title)', textShadow: '0 4px 10px rgba(0,0,0,0.18)' }}>
            🧘‍♂️ ZenVersity
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.95, maxWidth: '640px', margin: '0 auto', color: 'var(--color-heading)', textShadow: '0 2px 4px rgba(0,0,0,0.12)' }}>
            Your mental health companion during college applications
          </p>
        </header>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
          padding: '0 1rem',
          overflowX: 'auto',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg,#1d4ed8,#1e3a8a)' : 'rgba(255,255,255,0.15)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--color-heading)',
                border: '1px solid rgba(255,255,255,0.35)',
                padding: '0.85rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.25s',
                borderRadius: '999px',
                margin: '0.5rem 0.4rem',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(29,78,216,0.45)' : '0 2px 6px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(6px)'
              }}
              onMouseEnter={e => { if(activeTab !== tab.id) e.currentTarget.style.background = 'rgba(255,255,255,0.32)'; }}
              onMouseLeave={e => { if(activeTab !== tab.id) e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
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

// Dashboard Component
function Dashboard() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-heading)', marginBottom: '0.5rem', fontWeight: 600 }}>
          Welcome back! 👋
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text)' }}>
          How are you feeling today? Let's check in with yourself.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-heading)', marginBottom: '0.5rem', fontWeight: 600 }}>
            Quick Mood Check
          </h3>
          <p style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>Log how you're feeling right now</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-heading)', marginBottom: '0.5rem', fontWeight: 600 }}>
            Stress Level
          </h3>
          <p style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>Rate your current stress (0-10)</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-heading)', marginBottom: '0.75rem', fontWeight: 600 }}>
            Daily Encouragement
          </h3>
          <EncouragementGenerator />
        </div>
      </div>
    </div>
  );
}

// Mood Tracker Component
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
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSubmit(mood)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                background: selectedMood === mood.label ? '#ecfdf5' : 'white',
                border: `2px solid ${selectedMood === mood.label ? '#10b981' : '#e5e7eb'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mood.emoji}</span>
              <span style={{ fontWeight: '500' }}>{mood.label}</span>
            </button>
          ))}
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

// Stress Tracker Component
function StressTracker({ stressData, setStressData }) {
  const [stressLevel, setStressLevel] = useState(5);
  const [stressSource, setStressSource] = useState('');

  const stressCategories = [
    'College Applications',
    'Schoolwork',
    'Social Situations',
    'Family Pressure',
    'Future Uncertainty',
    'Time Management',
    'Other'
  ];

  const getStressEmoji = (level) => {
    if (level <= 2) return '😌';
    if (level <= 4) return '😐';
    if (level <= 6) return '😰';
    if (level <= 8) return '😫';
    return '🤯';
  };

  const getStressColor = (level) => {
    if (level <= 3) return '#4ade80';
    if (level <= 6) return '#fbbf24';
    return '#f87171';
  };

  const handleStressSubmit = () => {
    if (!stressSource) return;
    
    const newEntry = {
      level: stressLevel,
      source: stressSource,
      emoji: getStressEmoji(stressLevel),
      timestamp: new Date()
    };
    setStressData(prev => [...prev, newEntry]);
    setStressSource('');
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Stress Level Check 😰</h2>
      
      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>How stressed are you right now?</h3>
        
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {getStressEmoji(stressLevel)}
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: getStressColor(stressLevel),
            marginBottom: '1rem'
          }}>
            {stressLevel}/10
          </div>
          
          <input
            type="range"
            min="0"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              outline: 'none',
              WebkitAppearance: 'none',
              marginBottom: '1rem'
            }}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#6b7280'
          }}>
            <span>😌 Calm</span>
            <span>😐 Moderate</span>
            <span>🤯 Overwhelmed</span>
          </div>
        </div>

        <select
          value={stressSource}
          onChange={(e) => setStressSource(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <option value="">What's causing your stress?</option>
          {stressCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <button
          onClick={handleStressSubmit}
          disabled={!stressSource}
          style={{
            background: stressSource ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#9ca3af',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: stressSource ? 'pointer' : 'not-allowed',
            width: '100%'
          }}
        >
          Log Stress Level
        </button>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Recent Stress Logs</h3>
        <div>
          {stressData.slice(-5).reverse().map((stress, index) => (
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
              <span style={{ fontSize: '1.5rem' }}>{stress.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ 
                  color: getStressColor(stress.level),
                  fontWeight: '600',
                  marginRight: '0.5rem'
                }}>
                  {stress.level}/10
                </span>
                <span style={{ color: '#374151' }}>{stress.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Journal Component
function Journal({ journalEntries, setJournalEntries }) {
  const [entry, setEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const journalPrompts = [
    "What's one thing that made you smile today?",
    "Describe a challenge you're facing and how you might overcome it.",
    "What are you most grateful for right now?",
    "How do you feel about your college application progress?"
  ];

  const handleSubmit = () => {
    if (!entry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      content: entry.trim(),
      prompt: selectedPrompt,
      wordCount: entry.trim().split(' ').length,
      timestamp: new Date()
    };
    
    setJournalEntries(prev => [newEntry, ...prev]);
    setEntry('');
    setSelectedPrompt('');
  };

  const usePrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setEntry(entry + (entry ? '\n\n' : '') + prompt + '\n\n');
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Your Personal Journal 📝</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Need inspiration? Try a prompt:</h3>
        <div>
          {journalPrompts.slice(0, 2).map((prompt, index) => (
            <button
              key={index}
              onClick={() => usePrompt(prompt)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              💭 {prompt}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Write your thoughts...</h3>
        {selectedPrompt && (
          <div style={{
            background: '#fef3c7',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            borderLeft: '4px solid #f59e0b'
          }}>
            <strong>Prompt:</strong> {selectedPrompt}
          </div>
        )}
        
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind? Write freely..."
          style={{
            width: '100%',
            padding: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: '200px',
            boxSizing: 'border-box'
          }}
          rows={8}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            {entry.trim() ? entry.trim().split(' ').length : 0} words
          </span>
          <button
            onClick={handleSubmit}
            disabled={!entry.trim()}
            style={{
              background: entry.trim() ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#9ca3af',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: entry.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Save Entry
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Your Journal History</h3>
        {journalEntries.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            color: '#6b7280'
          }}>
            <p>📖 No entries yet. Start writing your first journal entry above!</p>
          </div>
        ) : (
          <div>
            {journalEntries.slice(0, 3).map((entryItem) => (
              <div key={entryItem.id} style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {entryItem.timestamp.toLocaleDateString()}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {entryItem.wordCount} words
                  </span>
                </div>
                
                {entryItem.prompt && (
                  <div style={{
                    background: '#ddd6fe',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    borderLeft: '4px solid #7c3aed'
                  }}>
                    <strong>Prompt:</strong> {entryItem.prompt}
                  </div>
                )}
                
                <div style={{ lineHeight: '1.6', color: '#374151' }}>
                  {entryItem.content.split('\n').map((line, index) => (
                    <p key={index} style={{ marginBottom: '0.5rem' }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Deadline Tracker Component
function DeadlineTracker({ tasks, setTasks }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  const categories = [
    'College Applications',
    'Essays',
    'Scholarships',
    'Transcripts',
    'Recommendation Letters',
    'Standardized Tests',
    'School Assignments',
    'Personal Tasks',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#10b981', emoji: '🟢' },
    { value: 'medium', label: 'Medium', color: '#f59e0b', emoji: '🟡' },
    { value: 'high', label: 'High', color: '#ef4444', emoji: '🔴' }
  ];

  const handleSubmit = () => {
    if (!taskName.trim() || !dueDate || !category) return;
    
    const newTask = {
      id: Date.now(),
      taskName: taskName.trim(),
      dueDate,
      category,
      priority,
      completed: false,
      timestamp: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
    setTaskName('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
  };

  const toggleComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (daysUntil) => {
    if (daysUntil < 0) return '#ef4444';
    if (daysUntil <= 3) return '#f59e0b';
    if (daysUntil <= 7) return '#eab308';
    return '#10b981';
  };

  const getUrgencyLabel = (daysUntil) => {
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    if (daysUntil === 0) return 'Due today!';
    if (daysUntil === 1) return 'Due tomorrow';
    return `${daysUntil} days left`;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'urgent') {
      const daysUntil = getDaysUntilDue(task.dueDate);
      return !task.completed && daysUntil <= 3;
    }
    return true;
  });

  const getPriorityInfo = (priorityValue) => {
    return priorities.find(p => p.value === priorityValue) || priorities[1];
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Deadline Tracker 📅</h2>
      
      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Task or Deadline</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name (e.g., Submit UC application)"
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            min={new Date().toISOString().split('T')[0]}
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="">Select category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            {priorities.map(p => (
              <option key={p.value} value={p.value}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!taskName.trim() || !dueDate || !category}
          style={{
            background: (taskName.trim() && dueDate && category) ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' : '#9ca3af',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: (taskName.trim() && dueDate && category) ? 'pointer' : 'not-allowed',
            width: '100%'
          }}
        >
          Add Task
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Filter Tasks</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: '📋 All Tasks' },
            { key: 'pending', label: '⏳ Pending' },
            { key: 'urgent', label: '🚨 Urgent' },
            { key: 'completed', label: '✅ Completed' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                padding: '0.5rem 1rem',
                background: filter === filterOption.key ? '#4f46e5' : 'white',
                color: filter === filterOption.key ? 'white' : '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            color: '#6b7280'
          }}>
            <p>📝 No tasks found. {filter === 'all' ? 'Add your first task above!' : 'Try changing the filter.'}</p>
          </div>
        ) : (
          <div>
            {filteredTasks.map((task) => {
              const daysUntil = getDaysUntilDue(task.dueDate);
              const urgencyColor = getUrgencyColor(daysUntil);
              const priorityInfo = getPriorityInfo(task.priority);
              
              return (
                <div key={task.id} style={{
                  background: task.completed ? '#f9fafb' : 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  opacity: task.completed ? 0.7 : 1
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        style={{
                          width: '1.2rem',
                          height: '1.2rem',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.5rem',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.taskName}
                      </h4>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ fontWeight: '500' }}>📂 {task.category}</span>
                        <span style={{ color: priorityInfo.color, fontWeight: '500' }}>
                          {priorityInfo.emoji} {priorityInfo.label}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '1rem',
                        borderTop: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#6b7280'
                        }}>
                          📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        {!task.completed && (
                          <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: urgencyColor
                          }}>
                            {getUrgencyLabel(daysUntil)}
                          </div>
                        )}
                        {task.completed && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#10b981',
                            fontWeight: '600'
                          }}>
                            ✅ Completed
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          borderRadius: '4px'
                        }}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Insights Page Component
function InsightsPage({ moodData, stressData }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>Your Mental Health Insights 📊</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Mood Over Time
          </h3>
          <MoodGraph moodData={moodData} />
        </div>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Weekly Summary
          </h3>
          <WeeklySummary moodData={moodData} stressData={stressData} />
        </div>
      </div>
    </div>
  );
}

// Mood Graph Component
function MoodGraph({ moodData }) {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('mood');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '0.75rem',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1f2937' }}>
            {label}
          </p>
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

  if (moodData.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        color: '#6b7280'
      }}>
        <p>📈 No data to display yet.</p>
        <p>Start tracking your mood and stress to see patterns over time!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>
            Time Range:
          </span>
          {[
            { key: 'week', label: '7 Days' },
            { key: 'month', label: '30 Days' },
            { key: 'all', label: 'All Time' }
          ].map(range => (
            <button
              key={range.key}
              onClick={() => setTimeRange(range.key)}
              style={{
                padding: '0.5rem 1rem',
                background: timeRange === range.key ? '#4f46e5' : 'white',
                color: timeRange === range.key ? 'white' : '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ margin: '2rem 0', background: '#fafafa', borderRadius: '8px', padding: '1rem' }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={moodData}>
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
              dataKey="mood"
              stroke="#10b981"
              fill="#10b98130"
              strokeWidth={3}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <h4 style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}>
            😊 Avg Mood
          </h4>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '0.25rem'
          }}>
            {moodData.length > 0 ? 
              (moodData.reduce((sum, item) => sum + (item.mood || 0), 0) / moodData.length).toFixed(1) : 
              '0'
            }/10
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <h4 style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}>
            📝 Data Points
          </h4>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.25rem'
          }}>
            {moodData.length}
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ color: '#1f2937', marginBottom: '1rem' }}>💡 Insights</h4>
        <div>
          {moodData.length >= 7 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              marginBottom: '0.5rem'
            }}>
              <span>📈</span>
              <span>Great job tracking your mental health consistently!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Weekly Summary Component
function WeeklySummary({ moodData, stressData }) {
  // Calculate averages
  const avgMood = moodData.length > 0 ? (moodData.reduce((sum, item) => sum + (item.mood || 0), 0) / moodData.length).toFixed(1) : 0;
  const avgStress = stressData.length > 0 ? (stressData.reduce((sum, item) => sum + (item.level || 0), 0) / stressData.length).toFixed(1) : 0;

  // Find most common stressors
  const stressorCounts = {};
  stressData.forEach(item => {
    if (item.source) {
      stressorCounts[item.source] = (stressorCounts[item.source] || 0) + 1;
    }
  });
  const topStressors = Object.entries(stressorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Mood trend (last 7 days)
  const last7 = moodData.slice(-7);
  const moodTrend = last7.length > 1 ? last7[last7.length - 1].mood - last7[0].mood : null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937', textAlign: 'center' }}>Weekly Summary & Insights</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>😊 Average Mood</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{avgMood}/10</div>
        </div>
        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>😰 Average Stress</h4>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{avgStress}/10</div>
        </div>
        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1rem', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>📈 Mood Trend</h4>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: moodTrend > 0 ? '#10b981' : moodTrend < 0 ? '#ef4444' : '#6b7280' }}>
            {moodTrend === null ? 'N/A' : moodTrend > 0 ? `Up ${moodTrend}` : moodTrend < 0 ? `Down ${Math.abs(moodTrend)}` : 'Stable'}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Top Stressors</h3>
        {topStressors.length === 0 ? (
          <div style={{ color: '#6b7280', textAlign: 'center' }}>No stressor data yet.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topStressors.map(([source, count], idx) => (
              <li key={source} style={{ background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#dc2626', marginRight: '1rem' }}>{idx + 1}.</span>
                <span style={{ flex: 1, color: '#374151' }}>{source}</span>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{count} times</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Weekly Insights</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {avgMood >= 7 && <li style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>😊 Great week for mood! Keep it up.</li>}
          {avgStress >= 7 && <li style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>⚠️ High stress detected. Try some relaxation techniques.</li>}
          {moodTrend > 0 && <li style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>📈 Your mood improved this week!</li>}
          {moodTrend < 0 && <li style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>📉 Mood dropped this week. Take care of yourself.</li>}
          {topStressors.length === 0 && <li style={{ color: '#6b7280', textAlign: 'center' }}>Log more stress data to see insights.</li>}
        </ul>
      </div>
    </div>
  );
}

export default ZenVersity
