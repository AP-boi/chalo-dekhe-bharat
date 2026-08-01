import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface GameState {
  highScore: number;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
  achievements: Achievement[];
  recordScore: (score: number, streak: number) => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first-step", title: "First Explorer", description: "Completed your first Landmark Quiz session", unlocked: false },
  { id: "streak-3", title: "Cultural Genius", description: "Achieved a 3-in-a-row correct answer streak", unlocked: false },
  { id: "perfect-game", title: "Yatra Master", description: "Scored over 80 points in a single round", unlocked: false },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      highScore: 0,
      gamesPlayed: 0,
      currentStreak: 0,
      bestStreak: 0,
      achievements: DEFAULT_ACHIEVEMENTS,

      recordScore: (score: number, streak: number) => {
        const state = get();
        const newHighScore = Math.max(state.highScore, score);
        const newBestStreak = Math.max(state.bestStreak, streak);
        const newGamesPlayed = state.gamesPlayed + 1;

        const updatedAchievements = state.achievements.map((ach) => {
          if (ach.id === "first-step" && newGamesPlayed >= 1) return { ...ach, unlocked: true };
          if (ach.id === "streak-3" && newBestStreak >= 3) return { ...ach, unlocked: true };
          if (ach.id === "perfect-game" && newHighScore >= 80) return { ...ach, unlocked: true };
          return ach;
        });

        set({
          highScore: newHighScore,
          bestStreak: newBestStreak,
          gamesPlayed: newGamesPlayed,
          achievements: updatedAchievements,
        });
      },
    }),
    {
      name: "chalo-dekhe-bharat-game-v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);

