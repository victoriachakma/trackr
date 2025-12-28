import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateWorkoutPoints } from '../lib/pointsConfig';

export type WorkoutType = 'run' | 'strength' | 'cardio' | 'mobility';
export type EffortLevel = 'easy' | 'moderate' | 'hard';

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number; // minutes
  distance?: number; // km
  effort: EffortLevel;
  date: string; // ISO date string
  points: number;
  isPlanned?: boolean;
}

export interface WorkoutStats {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalDistance: number;
  totalPoints: number;
  strengthSessions: number;
  runSessions: number;
  cardioSessions: number;
  mobilitySessions: number;
  weeklyWorkouts: number;
  weeklyGoal: number;
}

interface WorkoutState {
  workouts: Workout[];
  stats: WorkoutStats;
  lastWorkoutDate: string | null;
  unlockedBadges: string[];
  newlyUnlockedBadge: string | null;
  lastPointsEarned: { total: number; breakdown: { label: string; points: number }[] } | null;
  
  addWorkout: (workout: Omit<Workout, 'id' | 'points' | 'date'>) => void;
  setWeeklyGoal: (goal: number) => void;
  unlockBadge: (badgeId: string) => void;
  clearNewBadge: () => void;
  clearLastPoints: () => void;
}

function isSameDay(date1: string, date2: string): boolean {
  return date1.split('T')[0] === date2.split('T')[0];
}

function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  last.setDate(last.getDate() + 1);
  return last.toDateString() === current.toDateString();
}

function getWeekStart(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff));
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: [],
      stats: {
        totalWorkouts: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalDistance: 0,
        totalPoints: 0,
        strengthSessions: 0,
        runSessions: 0,
        cardioSessions: 0,
        mobilitySessions: 0,
        weeklyWorkouts: 0,
        weeklyGoal: 4,
      },
      lastWorkoutDate: null,
      unlockedBadges: [],
      newlyUnlockedBadge: null,
      lastPointsEarned: null,

      addWorkout: (workoutData) => {
        const { stats, lastWorkoutDate, workouts } = get();
        const now = new Date().toISOString();
        
        // Calculate streak
        let newStreak = stats.currentStreak;
        if (!lastWorkoutDate) {
          newStreak = 1;
        } else if (isSameDay(lastWorkoutDate, now)) {
          // Same day, streak doesn't change
        } else if (isConsecutiveDay(lastWorkoutDate, now)) {
          newStreak = stats.currentStreak + 1;
        } else {
          newStreak = 1;
        }
        
        // Calculate points
        const pointsResult = calculateWorkoutPoints(
          workoutData.effort,
          workoutData.distance || 0,
          workoutData.isPlanned || false,
          lastWorkoutDate && isConsecutiveDay(lastWorkoutDate, now) ? stats.currentStreak : 0
        );
        
        const workout: Workout = {
          id: crypto.randomUUID(),
          ...workoutData,
          date: now,
          points: pointsResult.total,
        };
        
        // Calculate weekly workouts
        const weekStart = getWeekStart();
        const weeklyWorkouts = [...workouts, workout].filter(w => 
          new Date(w.date) >= weekStart
        ).length;
        
        set({
          workouts: [...workouts, workout],
          lastWorkoutDate: now,
          lastPointsEarned: pointsResult,
          stats: {
            ...stats,
            totalWorkouts: stats.totalWorkouts + 1,
            currentStreak: newStreak,
            longestStreak: Math.max(stats.longestStreak, newStreak),
            totalDistance: stats.totalDistance + (workoutData.distance || 0),
            totalPoints: stats.totalPoints + pointsResult.total,
            strengthSessions: stats.strengthSessions + (workoutData.type === 'strength' ? 1 : 0),
            runSessions: stats.runSessions + (workoutData.type === 'run' ? 1 : 0),
            cardioSessions: stats.cardioSessions + (workoutData.type === 'cardio' ? 1 : 0),
            mobilitySessions: stats.mobilitySessions + (workoutData.type === 'mobility' ? 1 : 0),
            weeklyWorkouts,
          },
        });
      },

      setWeeklyGoal: (goal) => {
        set((state) => ({
          stats: { ...state.stats, weeklyGoal: goal },
        }));
      },

      unlockBadge: (badgeId) => {
        const { unlockedBadges } = get();
        if (!unlockedBadges.includes(badgeId)) {
          set({
            unlockedBadges: [...unlockedBadges, badgeId],
            newlyUnlockedBadge: badgeId,
          });
        }
      },

      clearNewBadge: () => {
        set({ newlyUnlockedBadge: null });
      },

      clearLastPoints: () => {
        set({ lastPointsEarned: null });
      },
    }),
    {
      name: 'workout-storage',
    }
  )
);