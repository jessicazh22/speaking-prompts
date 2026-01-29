import { Mic } from 'lucide-react';

interface LandingProps {
  onStartPractice: () => void;
}

export default function Landing({ onStartPractice }: LandingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4">
              <Mic className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            English Speaking Coach
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Practice IELTS-style speaking prompts and get AI-powered feedback to improve your English
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-slate-900 mb-2">Targeted Prompts</h3>
            <p className="text-slate-600 text-sm">
              Practice with IELTS speaking prompts focused on specific grammar and vocabulary areas
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold text-slate-900 mb-2">Easy Recording</h3>
            <p className="text-slate-600 text-sm">
              Record directly in your browser or upload pre-recorded audio files
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-slate-900 mb-2">Detailed Feedback</h3>
            <p className="text-slate-600 text-sm">
              Get AI analysis on grammar, vocabulary, fluency, and overall speaking skills
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <ol className="space-y-3 text-slate-700 mb-8">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</span>
              <span>Choose a speaking prompt that targets the grammar or vocabulary you want to practice</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</span>
              <span>Read the helpful tips and reminders to guide your response</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</span>
              <span>Record your response using your microphone or upload an audio file</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</span>
              <span>Receive detailed AI feedback on your grammar, vocabulary, and overall speaking performance</span>
            </li>
          </ol>

          <button
            onClick={onStartPractice}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Practicing Now
          </button>
        </div>
      </div>
    </div>
  );
}