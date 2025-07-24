
import MoodTracker from './components/MoodTracker';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">ZenVersity</h1>
      <MoodTracker />
    </div>
  );
}

export default App;
