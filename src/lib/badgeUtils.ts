import type { WorkoutStats as StoreStats, Workout } from '../store/workoutStore';
import type { BadgeStats } from '../lib/badges';
import type { TrainingPlanProgress } from '../store/workoutStore';

export function computeBadgeStats(
  stats: StoreStats, 
  workouts: Workout[] = [], 
  activePlan: TrainingPlanProgress | null = null
): BadgeStats {
  // Calculate variety stats
  const workoutTypes = new Set(workouts.map(w => w.type));
  const workoutTypesCompleted = workoutTypes.size;
  
  const typeCounts = {
    run: stats.runSessions,
    strength: stats.strengthSessions,
    cardio: stats.cardioSessions,
    mobility: stats.mobilitySessions,
  };
  const minWorkoutsPerType = Math.min(...Object.values(typeCounts));

  return {
    totalWorkouts: stats.totalWorkouts,
    currentStreak: stats.currentStreak,
    totalDistance: stats.totalDistance,
    strengthSessions: stats.strengthSessions,
    runSessions: stats.runSessions,
    cardioSessions: stats.cardioSessions,
    mobilitySessions: stats.mobilitySessions,
    totalPoints: stats.totalPoints,
    earlyBirdWorkouts: stats.earlyBirdWorkouts,
    nightOwlWorkouts: stats.nightOwlWorkouts,
    weekendWorkouts: stats.weekendWorkouts,
    workoutTypesCompleted,
    minWorkoutsPerType,
    activePlan: activePlan ? {
      type: activePlan.planType,
      weeksCompleted: activePlan.weeksCompleted,
      isComplete: activePlan.isComplete,
    } : undefined,
  };
}
