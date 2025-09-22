// src/components/EncouragementGenerator.jsx
import React, { useState } from 'react';

const EncouragementGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const encouragementQuotes = [
    {
      text: "You are stronger than you think and more capable than you imagine.",
      emoji: "💪"
    },
    {
      text: "Every college application you complete is a step toward your future.",
      emoji: "🎓"
    },
    {
      text: "Your worth isn't determined by acceptance letters. You're amazing either way.",
      emoji: "⭐"
    },
    {
      text: "It's okay to feel overwhelmed. Take it one day at a time.",
      emoji: "🌅"
    },
    {
      text: "You've overcome challenges before, and you'll overcome this too.",
      emoji: "🌟"
    },
    {
      text: "Your mental health matters more than perfect grades.",
      emoji: "🧠"
    },
    {
      text: "Progress, not perfection. You're doing great!",
      emoji: "📈"
    },
    {
      text: "Remember to breathe, rest, and be kind to yourself.",
      emoji: "🫁"
    },
    {
      text: "You belong wherever you decide to go. Trust yourself.",
      emoji: "🏠"
    },
    {
      text: "Stress is temporary, but your resilience is permanent.",
      emoji: "🛡️"
    },
    {
      text: "Your future self will thank you for not giving up today.",
      emoji: "🙏"
    },
    {
      text: "It's okay to ask for help. You don't have to do this alone.",
      emoji: "🤝"
    },
    {
      text: "You are writing your own story, one application at a time.",
      emoji: "📖"
    },
    {
      text: "Comparison is the thief of joy. Focus on your own journey.",
      emoji: "🛤️"
    },
    {
      text: "Your dreams are valid, and you have what it takes to achieve them.",
      emoji: "✨"
    },
    {
      text: "Remember: this too shall pass, but you will remain strong.",
      emoji: "⛅"
    },
    {
      text: "You're not behind in life. You're exactly where you need to be.",
      emoji: "🎯"
    },
    {
      text: "Take breaks. Rest is productive too.",
      emoji: "☕"
    },
    {
      text: "Your effort matters more than the outcome.",
      emoji: "🎨"
    },
    {
      text: "You've got this! Even when it doesn't feel like it.",
      emoji: "🚀"
    }
  ];

  const generateQuote = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * encouragementQuotes.length);
      setCurrentQuote(encouragementQuotes[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

  React.useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #bbf7d0 0%, #2563eb 100%)',
      borderRadius: '16px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      padding: '2rem',
      maxWidth: '400px',
      margin: '2rem auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1.5rem', color: '#166534', textAlign: 'center' }}>
        Daily Encouragement ✨
      </h3>
      <div style={{ minHeight: '120px', width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div
          style={{
            opacity: isGenerating ? 0 : 1,
            transition: 'opacity 0.5s',
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {currentQuote && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#166534' }}>{currentQuote.emoji}</div>
              <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#166534', lineHeight: '1.5', margin: 0, textAlign: 'center' }}>
                "{currentQuote.text}"
              </blockquote>
            </div>
          )}
        </div>
        <div
          style={{
            opacity: isGenerating ? 1 : 0,
            transition: 'opacity 0.5s',
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#2563eb' }}>🔄</div>
        </div>
      </div>
      {/* Blue tab with dice emoji */}
      <button
        onClick={generateQuote}
        disabled={isGenerating}
        style={{
          position: 'absolute',
          right: '-32px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          width: '64px',
          height: '64px',
          fontSize: '2rem',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        title="Generate encouragement"
      >
        🎲
      </button>
      {/* Quick Mood Boosters section */}
      <div style={{ marginTop: '2rem', width: '100%' }}>
        <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#2563eb' }}>💡 Quick Mood Boosters</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}>
            <span>🎵</span>
            <span>Listen to your favorite song</span>
          </div>
          <div style={{ background: '#e0f2fe', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
            <span>📞</span>
            <span>Call someone who makes you laugh</span>
          </div>
          <div style={{ background: '#dbeafe', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}>
            <span>🌳</span>
            <span>Step outside for fresh air</span>
          </div>
          <div style={{ background: '#e0f2fe', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
            <span>🍫</span>
            <span>Treat yourself to something nice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncouragementGenerator;
