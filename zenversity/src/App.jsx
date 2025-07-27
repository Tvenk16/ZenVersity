


import MoodTracker from './components/MoodTracker';
import StressTracker from './components/StressTracker';
import Journal from './components/Journal';
import DeadlineTracker from './components/DeadlineTracker';
import EncouragementGenerator from './components/EncouragementGenerator';

function App() {
  // Replace with actual userId from auth if available
  const userId = 'demoUser';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">ZenVersity</h1>
      <EncouragementGenerator />
      <MoodTracker userId={userId} />
      <StressTracker userId={userId} />
      <Journal userId={userId} />
      <DeadlineTracker userId={userId} />
    </div>
  );
}

export default App;
