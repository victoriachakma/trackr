import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TrainingPlanType } from '../lib/trainingPlans';

export interface ActivePlan {
  planType: TrainingPlanType;
  startDate: string;
  currentWeek: number;
  workoutsThisWeek: number;
  totalWorkouts: number;
  totalDistance: number;
  strengthSessions: number;
  runSessions: number;
  isCompleted: boolean;
  completedBadges: string[];
}

interface TrainingPlanState {
  activePlan: ActivePlan | null;
  completedPlans: { planType: TrainingPlanType; completedDate: string }[];
  
  startPlan: (planType: TrainingPlanType) => void;
  logPlanWorkout: (type: 'run' | 'strength' | 'cardio' | 'mobility', distance?: number) => void;
  advanceWeek: () => void;
  completePlan: () => void;
  cancelPlan: () => void;
  unlockPlanBadge: (badgeId: string) => void;
}

function getWeekNumber(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}

export const useTrainingPlanStore = create<TrainingPlanState>()(
  persist(
    (set, get) => ({
      activePlan: null,
      completedPlans: [],

      startPlan: (planType) => {
        set({
          activePlan: {
            planType,
            startDate: new Date().toISOString(),
            currentWeek: 1,
            workoutsThisWeek: 0,
            totalWorkouts: 0,
            totalDistance: 0,
            strengthSessions: 0,
            runSessions: 0,
            isCompleted: false,
            completedBadges: [],
          },
        });
      },

      logPlanWorkout: (type, distance = 0) => {
        const { activePlan } = get();
        if (!activePlan) return;

        const newWeek = getWeekNumber(activePlan.startDate);
        const weekChanged = newWeek > activePlan.currentWeek;

        set({
          activePlan: {
            ...activePlan,
            currentWeek: newWeek,
            workoutsThisWeek: weekChanged ? 1 : activePlan.workoutsThisWeek + 1,
            totalWorkouts: activePlan.totalWorkouts + 1,
            totalDistance: activePlan.totalDistance + distance,
            strengthSessions: activePlan.strengthSessions + (type === 'strength' ? 1 : 0),
            runSessions: activePlan.runSessions + (type === 'run' ? 1 : 0),
          },
        });
      },

      advanceWeek: () => {
        const { activePlan } = get();
        if (!activePlan) return;

        set({
          activePlan: {
            ...activePlan,
            currentWeek: activePlan.currentWeek + 1,
            workoutsThisWeek: 0,
          },
        });
      },

      completePlan: () => {
        const { activePlan, completedPlans } = get();
        if (!activePlan) return;

        set({
          activePlan: {
            ...activePlan,
            isCompleted: true,
          },
          completedPlans: [
            ...completedPlans,
            { planType: activePlan.planType, completedDate: new Date().toISOString() },
          ],
        });
      },

      cancelPlan: () => {
        set({ activePlan: null });
      },

      unlockPlanBadge: (badgeId) => {
        const { activePlan } = get();
        if (!activePlan) return;

        if (!activePlan.completedBadges.includes(badgeId)) {
          set({
            activePlan: {
              ...activePlan,
              completedBadges: [...activePlan.completedBadges, badgeId],
            },
          });
        }
      },
    }),
    {
      name: 'training-plan-storage',
    }
  )
);