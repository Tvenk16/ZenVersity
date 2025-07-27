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
    <div className="encouragement-generator bg-white rounded-lg shadow p-6 mb-6 w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center">Daily Encouragement ✨</h3>
      <div className="quote-container mb-4">
        {isGenerating ? (
          <div className="generating flex flex-col items-center">
            <div className="spinner text-3xl mb-2">🔄</div>
            <p>Generating encouragement...</p>
          </div>
        ) : currentQuote ? (
          <div className="quote-card flex flex-col items-center">
            <div className="quote-emoji text-4xl mb-2">{currentQuote.emoji}</div>
            <blockquote className="quote-text italic text-center">"{currentQuote.text}"</blockquote>
          </div>
        ) : (
          <div className="quote-placeholder">
            <p>Click the button below for some encouragement!</p>
          </div>
        )}
      </div>
      <button
        onClick={generateQuote}
        disabled={isGenerating}
        className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600 w-full mb-4"
      >
        {isGenerating ? 'Generating...' : '🎲 New Encouragement'}
      </button>
      <div className="encouragement-tips">
        <h4 className="font-semibold mb-2">💡 Quick Mood Boosters</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="tip-item bg-blue-100 rounded p-2 flex items-center gap-2">
            <span className="tip-emoji">🎵</span>
            <span>Listen to your favorite song</span>
          </div>
          <div className="tip-item bg-green-100 rounded p-2 flex items-center gap-2">
            <span className="tip-emoji">📞</span>
            <span>Call someone who makes you laugh</span>
          </div>
          <div className="tip-item bg-yellow-100 rounded p-2 flex items-center gap-2">
            <span className="tip-emoji">🌳</span>
            <span>Step outside for fresh air</span>
          </div>
          <div className="tip-item bg-purple-100 rounded p-2 flex items-center gap-2">
            <span className="tip-emoji">🍫</span>
            <span>Treat yourself to something nice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncouragementGenerator;
