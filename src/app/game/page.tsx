"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Award, Zap, RefreshCw, CheckCircle2, XCircle, Sparkles, MapPin, Trophy } from "lucide-react";
import { LANDMARK_QUESTIONS, LandmarkQuestion } from "@/data/game-landmarks";
import { useGameStore } from "@/store/gameStore";

const QUESTION_TIMER_SECONDS = 15;

export default function LandmarkGamePage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIMER_SECONDS);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const { highScore, recordScore, achievements } = useGameStore();
  const currentQuestion: LandmarkQuestion = LANDMARK_QUESTIONS[currentIndex];

  useEffect(() => {
    if (isSubmitted || isGameOver) return;

    if (timeLeft <= 0) {
      handleSelectOption(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, isGameOver]);

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;

    setSelectedOption(index);
    setIsSubmitted(true);

    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      const bonusTimePoints = Math.max(1, timeLeft);
      const streakBonus = streak * 2;
      const pointsWon = 10 + bonusTimePoints + streakBonus;
      setScore((prev) => prev + pointsWon);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < LANDMARK_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setTimeLeft(QUESTION_TIMER_SECONDS);
    } else {
      setIsGameOver(true);
      recordScore(score, streak);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setIsGameOver(false);
  };

  const dashOffset = (1 - timeLeft / QUESTION_TIMER_SECONDS) * 113;

  return (
    <div className="relative min-h-screen bg-[#1B1410] text-[#FFF6E9] pt-32 sm:pt-36 pb-28 max-w-5xl mx-auto px-4 flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-[#FF6A2B]/30 mb-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FF6A2B] text-[#FFF6E9]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold gold-gradient-text uppercase">Landmark Quiz</h1>
            <p className="text-[10px] text-[#FFB100]/80 font-medium">Question {currentIndex + 1} of {LANDMARK_QUESTIONS.length}</p>
          </div>
        </div>

        {/* Score & Streak Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB100]/10 border border-[#FFB100]/30 text-[#FFB100] text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-[#FFB100]" />
            <span>Streak: {streak}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6A2B]/20 border border-[#FF6A2B]/40 text-[#FFF6E9] text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-[#FFB100]" />
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        /* Quiz Main Body */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Landmark Image & Timer Frame */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden glass-panel-gold p-3 border border-[#FF6A2B]/40 shadow-2xl">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-black">
              <Image
                src={currentQuestion.imageUrl}
                alt={currentQuestion.landmarkName}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* State Location Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FFF6E9] text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6A2B]" />
                <span>{currentQuestion.state}</span>
              </div>

              {/* 15-Second SVG Ring Countdown Timer */}
              <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" className="text-stone-800" fill="transparent" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="113"
                    strokeDashoffset={dashOffset}
                    className={`transition-all duration-1000 ${timeLeft <= 5 ? "text-red-500" : "text-[#FF6A2B]"}`}
                    fill="transparent"
                  />
                </svg>
                <span className={`absolute text-xs font-mono font-bold ${timeLeft <= 5 ? "text-red-400 animate-ping" : "text-[#FFB100]"}`}>
                  {timeLeft}
                </span>
              </div>
            </div>

            {/* Fun Fact Reveal Box after answer */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3.5 rounded-xl bg-[#FF6A2B]/10 border border-[#FF6A2B]/30 text-[#FFF6E9] text-xs"
                >
                  <p className="font-bold text-[#FFB100] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6A2B]" /> Did You Know?
                  </p>
                  <p className="leading-relaxed text-stone-300">{currentQuestion.funFact}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options & Action Box */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-[#FF6A2B]/30">
              <h2 className="text-xl font-display font-bold text-[#FFF6E9] mb-4">
                Which landmark is pictured here?
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let buttonStyle = "glass-panel text-[#FFF6E9] hover:bg-[#FF6A2B]/10 border-[#FF6A2B]/20";

                  if (isSubmitted) {
                    if (idx === currentQuestion.correctIndex) {
                      buttonStyle = "bg-emerald-600/80 text-white border-emerald-400 font-bold shadow-lg";
                    } else if (idx === selectedOption) {
                      buttonStyle = "bg-red-900/80 text-red-200 border-red-500 font-bold";
                    } else {
                      buttonStyle = "opacity-40 glass-panel text-stone-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all flex items-center justify-between border ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1B1410] border border-[#FF6A2B]/40 flex items-center justify-center text-xs text-[#FF6A2B] font-mono font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </span>

                      {isSubmitted && idx === currentQuestion.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      )}
                      {isSubmitted && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Question Action Button */}
            {isSubmitted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] text-[#1B1410] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] transition-transform"
              >
                {currentIndex + 1 < LANDMARK_QUESTIONS.length ? "Next Landmark →" : "View Final Results →"}
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        /* Final Game Summary Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto w-full glass-panel-gold p-8 rounded-3xl border border-[#FF6A2B]/40 text-center space-y-6 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF6A2B] to-[#FFB100] mx-auto flex items-center justify-center p-1 shadow-xl">
            <div className="w-full h-full bg-[#1B1410] rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#FF6A2B]" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-display font-extrabold gold-gradient-text uppercase">Quiz Complete!</h2>
            <p className="text-stone-300 text-sm mt-1">You navigated through the landmarks of Incredible India.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-[#FF6A2B]/20 text-center">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">Final Score</span>
              <span className="text-3xl font-display font-bold text-[#FFB100]">{score}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">All-Time High</span>
              <span className="text-3xl font-display font-bold text-emerald-400">{highScore}</span>
            </div>
          </div>

          {/* Unlocked Achievements list */}
          <div className="text-left space-y-2">
            <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider block">Achievements</span>
            <div className="space-y-1.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-3 text-xs ${
                    ach.unlocked
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                      : "bg-[#2A1F19] border-stone-800 text-stone-500"
                  }`}
                >
                  <Award className={`w-4 h-4 shrink-0 ${ach.unlocked ? "text-[#FF6A2B]" : "text-stone-600"}`} />
                  <div>
                    <p className="font-bold">{ach.title}</p>
                    <p className="text-[10px] text-stone-400">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6A2B] to-[#FFB100] text-[#1B1410] font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
