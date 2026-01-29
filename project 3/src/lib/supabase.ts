import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Prompt = {
  id: string;
  title: string;
  question: string;
  difficulty_level: string;
  category: string;
  grammar_focus_areas: string[];
  vocabulary_focus: string[];
  tips: string;
  created_at: string;
};

export type Session = {
  id: string;
  prompt_id: string;
  audio_file_path: string | null;
  transcription: string | null;
  input_method: 'browser_recording' | 'file_upload';
  duration_seconds: number | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  session_id: string;
  grammar_analysis: string | null;
  vocabulary_analysis: string | null;
  fluency_analysis: string | null;
  content_relevance_analysis: string | null;
  sentence_structure_analysis: string | null;
  overall_score: number | null;
  detailed_feedback: string | null;
  created_at: string;
};