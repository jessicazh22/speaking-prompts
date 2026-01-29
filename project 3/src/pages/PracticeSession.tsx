import { useState, useRef } from 'react';
import { ChevronLeft, Mic, Upload, Play, Pause, RotateCcw, Send } from 'lucide-react';
import { supabase, Prompt, Session, Feedback } from '../lib/supabase';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface PracticeSessionProps {
  prompt: Prompt;
  onSessionCreated: (session: Session) => void;
  onFeedbackReceived: (feedback: Feedback) => void;
  onBack: () => void;
}

export default function PracticeSession({
  prompt,
  onSessionCreated,
  onFeedbackReceived,
  onBack,
}: PracticeSessionProps) {
  const {
    state,
    audioURL,
    startRecording,
    stopRecording,
    resetRecording,
    audioBlob,
    duration,
  } = useAudioRecorder();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedAudioURL, setUploadedAudioURL] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<'recording' | 'upload' | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedAudioURL(url);
      setInputMethod('upload');
      setError(null);
    } else {
      setError('Please select a valid audio file');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const audioToSubmit = inputMethod === 'recording' ? audioBlob : selectedFile;

      if (!audioToSubmit) {
        setError('Please record or upload audio before submitting');
        setIsSubmitting(false);
        return;
      }

      // Upload audio to Supabase Storage
      const fileName = `audio/${prompt.id}/${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('audio')
        .upload(fileName, audioToSubmit);

      if (uploadError) throw uploadError;

      // Create session record
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          prompt_id: prompt.id,
          audio_file_path: fileName,
          input_method: inputMethod === 'recording' ? 'browser_recording' : 'file_upload',
          duration_seconds: inputMethod === 'recording' ? duration : null,
        })
        .select()
        .maybeSingle();

      if (sessionError) throw sessionError;
      if (!sessionData) throw new Error('Failed to create session');

      onSessionCreated(sessionData);

      // Call the Edge Function for feedback
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-feedback`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          session_id: sessionData.id,
          prompt: prompt,
          audio_url: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/audio/${fileName}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate feedback');
      }

      const feedbackResult = await response.json();
      onFeedbackReceived(feedbackResult.feedback);
    } catch (err) {
      console.error('Error submitting:', err);
      setError(
        err instanceof Error ? err.message : 'An error occurred while submitting'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Prompts
        </button>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {prompt.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {prompt.difficulty_level}
              </span>
              <span className="text-slate-600">{prompt.category}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              Your Speaking Prompt
            </h2>
            <p className="text-blue-800 text-lg leading-relaxed">
              {prompt.question}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              Tips & Reminders
            </h3>
            <p className="text-green-800 leading-relaxed whitespace-pre-line">
              {prompt.tips}
            </p>
          </div>
        </div>

        {/* Recording/Upload Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Record or Upload Your Response
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Browser Recording */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Mic className="w-12 h-12 text-blue-500 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-4">
                  Record in Browser
                </h3>

                {state === 'idle' || (state === 'stopped' && !audioURL) ? (
                  <button
                    onClick={startRecording}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </button>
                ) : null}

                {state === 'recording' || state === 'stopping' ? (
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-700 font-mono">
                        {formatDuration(duration)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        stopRecording();
                        setInputMethod('recording');
                      }}
                      disabled={state === 'stopping'}
                      className="w-full bg-red-500 hover:bg-red-600 disabled:bg-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Stop Recording
                    </button>
                  </div>
                ) : null}

                {state === 'stopped' && audioURL && (
                  <div className="w-full">
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <audio ref={audioRef} src={audioURL} className="w-full" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (audioRef.current) {
                              if (isPlaying) {
                                audioRef.current.pause();
                              } else {
                                audioRef.current.play();
                              }
                              setIsPlaying(!isPlaying);
                            }
                          }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Play
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            resetRecording();
                            setIsPlaying(false);
                            setInputMethod(null);
                          }}
                          className="flex-1 bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Re-record
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-slate-500 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-4">
                  Upload Audio File
                </h3>

                {!selectedFile && !uploadedAudioURL ? (
                  <>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="audio-input"
                    />
                    <label
                      htmlFor="audio-input"
                      className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                    <p className="text-sm text-slate-600 mt-2">
                      MP3, WAV, M4A (max 50MB)
                    </p>
                  </>
                ) : null}

                {uploadedAudioURL && selectedFile && (
                  <div className="w-full">
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-slate-700 mb-2 truncate">
                        {selectedFile.name}
                      </p>
                      <audio src={uploadedAudioURL} controls className="w-full" />
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setUploadedAudioURL(null);
                        setInputMethod(null);
                      }}
                      className="w-full text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
                    >
                      Choose Different File
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!audioURL && !uploadedAudioURL)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Your Response...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit for Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}