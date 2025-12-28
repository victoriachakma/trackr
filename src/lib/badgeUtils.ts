import type { WorkoutStats as StoreStats } from '../store/workoutStore';
import type { BadgeStats } from '../lib/badges';
import type { ActivePlan } from '../store/trainingPlanStore';

export function computeBadgeStats(
  stats: StoreStats, 
  activePlan: ActivePlan | null = null
): BadgeStats {
  return {
    totalWorkouts: stats.totalWorkouts,
    currentStreak: stats.currentStreak,
    totalDistance: stats.totalDistance,
    strengthSessions: stats.strengthSessions,
    runSessions: stats.runSessions,
    cardioSessions: stats.cardioSessions,
    mobilitySessions: stats.mobilitySessions,
    totalPoints: stats.totalPoints,
    planWeeksCompleted: activePlan ? activePlan.currentWeek : undefined,
    planCompleted: activePlan ? activePlan.isCompleted : undefined,
    planDistance: activePlan ? activePlan.totalDistance : undefined,
  };
}
