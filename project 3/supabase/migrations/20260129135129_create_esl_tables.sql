/*
  # ESL Speaking Practice System Tables

  1. New Tables
    - `prompts` - Stores IELTS-style speaking prompts with category, difficulty, and focus areas
    - `sessions` - Tracks individual practice sessions with audio and transcription
    - `feedback` - Stores AI-generated feedback analysis for each session

  2. Description
    - Prompts table contains the speaking topics students practice on
    - Sessions table records each practice attempt with audio file and input method
    - Feedback table stores analysis across grammar, vocabulary, fluency, content, and structure
    - No RLS needed for this MVP (single session, no user auth)

  3. Important Notes
    - Sessions are single-use (no authentication required)
    - Audio files stored in Supabase Storage
    - Feedback generated via Claude AI through Edge Function
*/

CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  question text NOT NULL,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  category text NOT NULL,
  grammar_focus_areas text[] DEFAULT ARRAY[]::text[],
  vocabulary_focus text[] DEFAULT ARRAY[]::text[],
  tips text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  audio_file_path text,
  transcription text,
  input_method text NOT NULL CHECK (input_method IN ('browser_recording', 'file_upload')),
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  grammar_analysis text,
  vocabulary_analysis text,
  fluency_analysis text,
  content_relevance_analysis text,
  sentence_structure_analysis text,
  overall_score numeric(3,1),
  detailed_feedback text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sessions_prompt_id ON sessions(prompt_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_session_id ON feedback(session_id);