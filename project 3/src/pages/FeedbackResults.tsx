import { ChevronLeft, Star, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Prompt, Feedback } from '../lib/supabase';

interface FeedbackResultsProps {
  feedback: Feedback;
  prompt: Prompt;
  onNewSession: () => void;
  onBackHome: () => void;
}

export default function FeedbackResults({
  feedback,
  prompt,
  onNewSession,
  onBackHome,
}: FeedbackResultsProps) {
  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-slate-500';
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number | null) => {
    if (!score) return 'bg-slate-50';
    if (score >= 8) return 'bg-green-50';
    if (score >= 6) return 'bg-blue-50';
    if (score >= 4) return 'bg-orange-50';
    return 'bg-red-50';
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackHome}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Overall Score Section */}
        {feedback.overall_score && (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Your Feedback Results
                </h1>
                <p className="text-slate-600">{prompt.title}</p>
              </div>
              <div className={`${getScoreBgColor(feedback.overall_score)} rounded-lg p-6 text-center`}>
                <p className="text-sm text-slate-600 mb-2">Overall Score</p>
                <p className={`text-4xl font-bold ${getScoreColor(feedback.overall_score)}`}>
                  {feedback.overall_score.toFixed(1)}/10
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-slate-800">
                {feedback.detailed_feedback}
              </p>
            </div>
          </div>
        )}

        {/* Feedback Categories */}
        <div className="space-y-6">
          {/* Grammar Analysis */}
          {feedback.grammar_analysis && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Grammar & Sentence Structure
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedback.grammar_analysis}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary Analysis */}
          {feedback.vocabulary_analysis && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Vocabulary & Expression
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedback.vocabulary_analysis}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fluency Analysis */}
          {feedback.fluency_analysis && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <Star className="w-6 h-6 text-yellow-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Fluency & Delivery
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedback.fluency_analysis}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content Relevance */}
          {feedback.content_relevance_analysis && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-purple-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Content & Relevance
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedback.content_relevance_analysis}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sentence Structure Analysis */}
          {feedback.sentence_structure_analysis && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-indigo-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Complex Sentence Construction
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedback.sentence_structure_analysis}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onNewSession}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Practice Another Prompt
          </button>
          <button
            onClick={onBackHome}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}