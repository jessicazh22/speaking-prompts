import { useState, useRef, useCallback } from 'react';

type RecorderState = 'idle' | 'recording' | 'stopping' | 'stopped';

export interface UseAudioRecorderReturn {
  state: RecorderState;
  audioURL: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  resetRecording: () => void;
  audioBlob: Blob | null;
  duration: number;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
  const [state, setState] = useState<RecorderState>('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      setDuration(0);
      setAudioURL(null);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setState('stopped');

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }
      };

      mediaRecorder.start();
      setState('recording');

      durationIntervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setState('idle');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && state === 'recording') {
      setState('stopping');
      mediaRecorderRef.current.stop();
    }
  }, [state]);

  const resetRecording = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    mediaRecorderRef.current = null;
    streamRef.current = null;
    chunksRef.current = [];
    setAudioURL(null);
    setAudioBlob(null);
    setDuration(0);
    setState('idle');
  }, []);

  return {
    state,
    audioURL,
    startRecording,
    stopRecording,
    resetRecording,
    audioBlob,
    duration,
  };
};