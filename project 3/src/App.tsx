import { useState } from 'react';
import { Prompt, Session, Feedback } from './lib/supabase';
import Landing from './pages/Landing';
import PromptSelection from './pages/PromptSelection';
import PracticeSession from './pages/PracticeSession';
import FeedbackResults from './pages/FeedbackResults';

type PageType = 'landing' | 'selection' | 'practice' | 'feedback';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);

  const handleStartPractice = () => {
    setCurrentPage('selection');
  };

  const handlePromptSelected = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setCurrentPage('practice');
  };

  const handleSessionCreated = (session: Session) => {
    setCurrentSession(session);
  };

  const handleFeedbackReceived = (feedback: Feedback) => {
    setCurrentFeedback(feedback);
    setCurrentPage('feedback');
  };

  const handleNewSession = () => {
    setCurrentPage('selection');
    setSelectedPrompt(null);
    setCurrentSession(null);
    setCurrentFeedback(null);
  };

  const handleBackHome = () => {
    setCurrentPage('landing');
    setSelectedPrompt(null);
    setCurrentSession(null);
    setCurrentFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {currentPage === 'landing' && (
        <Landing onStartPractice={handleStartPractice} />
      )}
      {currentPage === 'selection' && (
        <PromptSelection
          onPromptSelected={handlePromptSelected}
          onBack={handleBackHome}
        />
      )}
      {currentPage === 'practice' && selectedPrompt && (
        <PracticeSession
          prompt={selectedPrompt}
          onSessionCreated={handleSessionCreated}
          onFeedbackReceived={handleFeedbackReceived}
          onBack={() => setCurrentPage('selection')}
        />
      )}
      {currentPage === 'feedback' && currentFeedback && selectedPrompt && (
        <FeedbackResults
          feedback={currentFeedback}
          prompt={selectedPrompt}
          onNewSession={handleNewSession}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  );
}

export default App;