// Points engine configuration
export const pointsConfig = {
  baseWorkout: 10,
  hardEffortBonus: 5,
  moderateEffortBonus: 2,
  streakBonus: 5,
  plannedWorkoutBonus: 5,
  distanceBonus: 1, // per km
};

// Level thresholds
export const levelThresholds = [
  0,    // Level 1
  50,   // Level 2
  150,  // Level 3
  300,  // Level 4
  500,  // Level 5
  750,  // Level 6
  1100, // Level 7
  1500, // Level 8
  2000, // Level 9
  2600, // Level 10
];

export function calculateLevel(totalPoints: number): { level: number; progress: number; nextThreshold: number } {
  let level = 1;
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (totalPoints >= levelThresholds[i]) {
      level = i + 1;
      break;
    }
  }
  
  const currentThreshold = levelThresholds[level - 1] || 0;
  const nextThreshold = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  const progress = ((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  
  return { level, progress: Math.min(progress, 100), nextThreshold };
}

export function calculateWorkoutPoints(
  effort: 'easy' | 'moderate' | 'hard',
  distance: number = 0,
  isPlanned: boolean = false,
  streakDays: number = 0
): { total: number; breakdown: { label: string; points: number }[] } {
  const breakdown: { label: string; points: number }[] = [];
  
  // Base points
  breakdown.push({ label: 'Workout logged', points: pointsConfig.baseWorkout });
  
  // Effort bonus
  if (effort === 'hard') {
    breakdown.push({ label: 'Hard effort', points: pointsConfig.hardEffortBonus });
  } else if (effort === 'moderate') {
    breakdown.push({ label: 'Moderate effort', points: pointsConfig.moderateEffortBonus });
  }
  
  // Distance bonus
  if (distance > 0) {
    const distancePoints = Math.floor(distance * pointsConfig.distanceBonus);
    if (distancePoints > 0) {
      breakdown.push({ label: `${distance}km distance`, points: distancePoints });
    }
  }
  
  // Planned workout bonus
  if (isPlanned) {
    breakdown.push({ label: 'Planned workout', points: pointsConfig.plannedWorkoutBonus });
  }
  
  // Streak bonus (applies after first day)
  if (streakDays > 0) {
    breakdown.push({ label: `${streakDays + 1}-day streak`, points: pointsConfig.streakBonus });
  }
  
  const total = breakdown.reduce((sum, item) => sum + item.points, 0);
  
  return { total, breakdown };
}
