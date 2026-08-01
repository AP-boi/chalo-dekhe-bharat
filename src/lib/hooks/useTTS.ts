"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const currentSentencesRef = useRef<string[]>([]);
  const sentenceIndexRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      currentSentencesRef.current = [];
      sentenceIndexRef.current = 0;
    }
  }, []);

  const speakNextSentence = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const sentences = currentSentencesRef.current;
    const index = sentenceIndexRef.current;

    if (index >= sentences.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    const textToSpeak = sentences[index].trim();
    if (!textToSpeak) {
      sentenceIndexRef.current += 1;
      speakNextSentence();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Prefer Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang.startsWith("en"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      sentenceIndexRef.current += 1;
      speakNextSentence();
    };

    utterance.onerror = (e) => {
      console.warn("TTS Error:", e);
      sentenceIndexRef.current += 1;
      speakNextSentence();
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const speak = useCallback(
    (text: string) => {
      stop();
      if (!supported || !text) return;

      // Split into sentences on . ! ? to prevent Chrome long-utterance freeze bug
      const sentences = text
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.trim().length > 0);

      currentSentencesRef.current = sentences;
      sentenceIndexRef.current = 0;
      setIsSpeaking(true);
      setIsPaused(false);

      speakNextSentence();
    },
    [supported, stop, speakNextSentence]
  );

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking]);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    supported,
  };
}
