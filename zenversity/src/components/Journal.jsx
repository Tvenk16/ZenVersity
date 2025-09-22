// src/components/Journal.jsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Journal = ({ userId = 'demoUser' }) => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const journalPrompts = [
    "What's one thing that made you smile today?",
    "Describe a challenge you're facing and how you might overcome it.",
    "What are you most grateful for right now?",
    "How do you feel about your college application progress?",
    "What's something you're looking forward to?",
    "Describe your ideal day during senior year.",
    "What advice would you give to yourself six months ago?",
    "What are three things you're proud of accomplishing recently?",
    "How are you taking care of your mental health?",
    "What's causing you the most stress right now, and how can you address it?"
  ];

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'journal'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = [];
      snapshot.forEach((doc) => {
        entriesData.push({ id: doc.id, ...doc.data() });
      });
      setEntries(entriesData);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId || !entry.trim()) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'journal'), {
        userId,
        content: entry.trim(),
        prompt: selectedPrompt,
        wordCount: entry.trim().split(' ').length,
        timestamp: new Date(),
        date: new Date().toDateString()
      });
      
      setEntry('');
      setSelectedPrompt('');
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await deleteDoc(doc(db, 'journal', entryId));
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const usePrompt = (prompt) => {
    setSelectedPrompt(prompt);
    // Only set the prompt, do not append it to the entry
    // setEntry(entry + (entry ? '\n\n' : '') + prompt + '\n\n');
  };

  const getWordCount = () => {
    return entry.trim() ? entry.trim().split(' ').length : 0;
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="journal bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Your Personal Journal 📝</h2>
      <div className="journal-prompts mb-4">
        <h3 className="font-semibold mb-2">Need inspiration? Try a prompt:</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {journalPrompts.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              onClick={() => usePrompt(prompt)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
            >
              💭 {prompt}
            </button>
          ))}
          <details className="more-prompts">
            <summary className="cursor-pointer text-blue-600">Show more prompts...</summary>
            <div className="flex flex-col gap-2 mt-2">
              {journalPrompts.slice(3).map((prompt, index) => (
                <button
                  key={index + 3}
                  onClick={() => usePrompt(prompt)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
                >
                  💭 {prompt}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
      <div className="journal-editor mb-4">
        <h3 className="font-semibold mb-2">Write your thoughts...</h3>
        {selectedPrompt && (
          <div className="selected-prompt mb-2">
            <strong>Prompt:</strong> {selectedPrompt}
          </div>
        )}
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind? Write freely..."
          className="w-full p-2 border rounded mb-2"
          rows={8}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{getWordCount()} words</span>
          <button
            onClick={handleSubmit}
            disabled={loading || !entry.trim()}
            className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>
      <div className="journal-entries mb-4">
        <h3 className="font-semibold mb-2">Your Journal History</h3>
        {entries.length === 0 ? (
          <div className="text-gray-500 text-center">
            <p>📖 No entries yet. Start writing your first journal entry above!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entryItem) => (
              <div key={entryItem.id} className="bg-gray-100 rounded p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">
                    {formatDate(entryItem.timestamp)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{entryItem.wordCount} words</span>
                    <button
                      onClick={() => handleDelete(entryItem.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                {entryItem.prompt && (
                  <div className="text-xs text-blue-700 mb-1">
                    <strong>Prompt:</strong> {entryItem.prompt}
                  </div>
                )}
                <div className="entry-content text-sm">
                  {entryItem.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="journal-stats">
        <h3 className="font-semibold mb-2">Your Writing Stats 📊</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-100 rounded p-2 text-center">
            <h4 className="font-bold">Total Entries</h4>
            <div className="text-2xl font-bold">{entries.length}</div>
          </div>
          <div className="bg-purple-100 rounded p-2 text-center">
            <h4 className="font-bold">Total Words</h4>
            <div className="text-2xl font-bold">
              {entries.reduce((total, entry) => total + (entry.wordCount || 0), 0)}
            </div>
          </div>
          <div className="bg-green-100 rounded p-2 text-center">
            <h4 className="font-bold">This Month</h4>
            <div className="text-2xl font-bold">
              {entries.filter(entry => {
                const entryDate = entry.timestamp.toDate();
                const now = new Date();
                return entryDate.getMonth() === now.getMonth() && 
                       entryDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
