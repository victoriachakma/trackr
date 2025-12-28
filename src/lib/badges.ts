import type { TrainingPlanType } from './trainingPlans';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'workout' | 'distance' | 'training-plan';
  requirement: {
    type: 'workouts' | 'streak' | 'distance' | 'strength' | 'runs' | 'points' | 'cardio' | 'mobility' | 'plan-week' | 'plan-complete';
    value: number;
    planType?: TrainingPlanType;
  };
}

// General badges
export const generalBadges: Badge[] = [
  // Milestone badges
  {
    id: 'first_workout',
    name: 'First Steps',
    description: 'Log your first workout',
    icon: '🎯',
    category: 'milestone',
    requirement: { type: 'workouts', value: 1 },
  },
  {
    id: 'ten_workouts',
    name: 'Getting Started',
    description: 'Complete 10 workouts',
    icon: '🌟',
    category: 'milestone',
    requirement: { type: 'workouts', value: 10 },
  },
  {
    id: 'twentyfive_workouts',
    name: 'Quarter Century',
    description: 'Complete 25 workouts',
    icon: '🎖️',
    category: 'milestone',
    requirement: { type: 'workouts', value: 25 },
  },
  {
    id: 'fifty_workouts',
    name: 'Consistent Athlete',
    description: 'Complete 50 workouts',
    icon: '💫',
    category: 'milestone',
    requirement: { type: 'workouts', value: 50 },
  },
  {
    id: 'hundred_workouts',
    name: 'Centurion',
    description: 'Complete 100 workouts',
    icon: '🏆',
    category: 'milestone',
    requirement: { type: 'workouts', value: 100 },
  },
  {
    id: 'twohundred_workouts',
    name: 'Elite Athlete',
    description: 'Complete 200 workouts',
    icon: '🌠',
    category: 'milestone',
    requirement: { type: 'workouts', value: 200 },
  },
  
  // Streak badges
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'streak_14',
    name: 'Fortnight Force',
    description: 'Maintain a 14-day streak',
    icon: '💪',
    category: 'streak',
    requirement: { type: 'streak', value: 14 },
  },
  {
    id: 'streak_21',
    name: 'Habit Builder',
    description: 'Maintain a 21-day streak',
    icon: '🧠',
    category: 'streak',
    requirement: { type: 'streak', value: 21 },
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'streak_60',
    name: 'Iron Will',
    description: 'Maintain a 60-day streak',
    icon: '🦾',
    category: 'streak',
    requirement: { type: 'streak', value: 60 },
  },
  {
    id: 'streak_100',
    name: 'Legendary',
    description: 'Maintain a 100-day streak',
    icon: '🏛️',
    category: 'streak',
    requirement: { type: 'streak', value: 100 },
  },
  
  // Distance badges
  {
    id: 'distance_5',
    name: 'First 5K',
    description: 'Run a total of 5km',
    icon: '👟',
    category: 'distance',
    requirement: { type: 'distance', value: 5 },
  },
  {
    id: 'distance_10',
    name: 'First 10K',
    description: 'Run a total of 10km',
    icon: '🏃',
    category: 'distance',
    requirement: { type: 'distance', value: 10 },
  },
  {
    id: 'distance_21',
    name: 'Half Marathon Distance',
    description: 'Run a total of 21km',
    icon: '🎽',
    category: 'distance',
    requirement: { type: 'distance', value: 21 },
  },
  {
    id: 'distance_42',
    name: 'Marathon Distance',
    description: 'Run a total of 42km',
    icon: '🏃‍♂️',
    category: 'distance',
    requirement: { type: 'distance', value: 42 },
  },
  {
    id: 'distance_100',
    name: 'Century Runner',
    description: 'Run a total of 100km',
    icon: '🚀',
    category: 'distance',
    requirement: { type: 'distance', value: 100 },
  },
  {
    id: 'distance_250',
    name: 'Ultra Distance',
    description: 'Run a total of 250km',
    icon: '🌍',
    category: 'distance',
    requirement: { type: 'distance', value: 250 },
  },
  {
    id: 'distance_500',
    name: 'Road Warrior',
    description: 'Run a total of 500km',
    icon: '🛤️',
    category: 'distance',
    requirement: { type: 'distance', value: 500 },
  },
  {
    id: 'distance_1000',
    name: 'Thousand Mile Club',
    description: 'Run a total of 1000km',
    icon: '🌟',
    category: 'distance',
    requirement: { type: 'distance', value: 1000 },
  },
  
  // Workout type badges
  {
    id: 'strength_5',
    name: 'Strength Starter',
    description: 'Complete 5 strength sessions',
    icon: '💪',
    category: 'workout',
    requirement: { type: 'strength', value: 5 },
  },
  {
    id: 'strength_10',
    name: 'Iron Pumper',
    description: 'Complete 10 strength sessions',
    icon: '🏋️',
    category: 'workout',
    requirement: { type: 'strength', value: 10 },
  },
  {
    id: 'strength_25',
    name: 'Gym Rat',
    description: 'Complete 25 strength sessions',
    icon: '🦍',
    category: 'workout',
    requirement: { type: 'strength', value: 25 },
  },
  {
    id: 'strength_50',
    name: 'Beast Mode',
    description: 'Complete 50 strength sessions',
    icon: '🐺',
    category: 'workout',
    requirement: { type: 'strength', value: 50 },
  },
  {
    id: 'runs_5',
    name: 'First Steps Runner',
    description: 'Complete 5 runs',
    icon: '🏃‍♀️',
    category: 'workout',
    requirement: { type: 'runs', value: 5 },
  },
  {
    id: 'runs_10',
    name: 'Road Runner',
    description: 'Complete 10 runs',
    icon: '🦅',
    category: 'workout',
    requirement: { type: 'runs', value: 10 },
  },
  {
    id: 'runs_25',
    name: 'Trail Blazer',
    description: 'Complete 25 runs',
    icon: '🌲',
    category: 'workout',
    requirement: { type: 'runs', value: 25 },
  },
  {
    id: 'runs_50',
    name: 'Running Legend',
    description: 'Complete 50 runs',
    icon: '⚡',
    category: 'workout',
    requirement: { type: 'runs', value: 50 },
  },
  {
    id: 'cardio_10',
    name: 'Cardio Crusher',
    description: 'Complete 10 cardio sessions',
    icon: '❤️‍🔥',
    category: 'workout',
    requirement: { type: 'cardio', value: 10 },
  },
  {
    id: 'cardio_25',
    name: 'Heart of Gold',
    description: 'Complete 25 cardio sessions',
    icon: '💛',
    category: 'workout',
    requirement: { type: 'cardio', value: 25 },
  },
  {
    id: 'mobility_10',
    name: 'Flexibility First',
    description: 'Complete 10 mobility sessions',
    icon: '🧘',
    category: 'workout',
    requirement: { type: 'mobility', value: 10 },
  },
  {
    id: 'mobility_25',
    name: 'Zen Master',
    description: 'Complete 25 mobility sessions',
    icon: '☯️',
    category: 'workout',
    requirement: { type: 'mobility', value: 25 },
  },
  
  // Points badges
  {
    id: 'points_100',
    name: 'Point Collector',
    description: 'Earn 100 points',
    icon: '✨',
    category: 'milestone',
    requirement: { type: 'points', value: 100 },
  },
  {
    id: 'points_500',
    name: 'Point Master',
    description: 'Earn 500 points',
    icon: '🌈',
    category: 'milestone',
    requirement: { type: 'points', value: 500 },
  },
  {
    id: 'points_1000',
    name: 'Point Legend',
    description: 'Earn 1000 points',
    icon: '💎',
    category: 'milestone',
    requirement: { type: 'points', value: 1000 },
  },
  {
    id: 'points_2500',
    name: 'Point King',
    description: 'Earn 2500 points',
    icon: '👑',
    category: 'milestone',
    requirement: { type: 'points', value: 2500 },
  },
  {
    id: 'points_5000',
    name: 'Point Emperor',
    description: 'Earn 5000 points',
    icon: '🏰',
    category: 'milestone',
    requirement: { type: 'points', value: 5000 },
  },
];

// HYROX-specific badges
export const hyroxBadges: Badge[] = [
  {
    id: 'hyrox_week_1',
    name: 'HYROX Rookie',
    description: 'Complete week 1 of HYROX training',
    icon: '🎯',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 1, planType: 'hyrox' },
  },
  {
    id: 'hyrox_week_2',
    name: 'Foundation Built',
    description: 'Complete the HYROX foundation phase',
    icon: '🏗️',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 2, planType: 'hyrox' },
  },
  {
    id: 'hyrox_week_4',
    name: 'HYROX Builder',
    description: 'Complete 4 weeks of HYROX training',
    icon: '💪',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 4, planType: 'hyrox' },
  },
  {
    id: 'hyrox_week_6',
    name: 'Peak Performer',
    description: 'Enter the HYROX peak phase',
    icon: '⚡',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 6, planType: 'hyrox' },
  },
  {
    id: 'hyrox_complete',
    name: 'HYROX Ready',
    description: 'Complete the full HYROX training program',
    icon: '🏆',
    category: 'training-plan',
    requirement: { type: 'plan-complete', value: 1, planType: 'hyrox' },
  },
  {
    id: 'hyrox_functional_master',
    name: 'Functional Master',
    description: 'Complete 20 strength sessions during HYROX plan',
    icon: '🦾',
    category: 'training-plan',
    requirement: { type: 'strength', value: 20, planType: 'hyrox' },
  },
];

// Marathon-specific badges
export const marathonBadges: Badge[] = [
  {
    id: 'marathon_week_1',
    name: 'Marathon Journey Begins',
    description: 'Complete week 1 of marathon training',
    icon: '🌅',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 1, planType: 'marathon' },
  },
  {
    id: 'marathon_week_4',
    name: 'Base Builder',
    description: 'Complete the marathon base phase',
    icon: '🏗️',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 4, planType: 'marathon' },
  },
  {
    id: 'marathon_week_8',
    name: 'Strength Phase Complete',
    description: 'Complete 8 weeks of marathon training',
    icon: '💪',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 8, planType: 'marathon' },
  },
  {
    id: 'marathon_week_12',
    name: 'Peak Training',
    description: 'Complete 12 weeks of marathon training',
    icon: '🏔️',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 12, planType: 'marathon' },
  },
  {
    id: 'marathon_long_run_30k',
    name: 'Long Run Master',
    description: 'Complete a single run of 30km or more',
    icon: '🛤️',
    category: 'training-plan',
    requirement: { type: 'distance', value: 30, planType: 'marathon' },
  },
  {
    id: 'marathon_complete',
    name: 'Marathon Ready',
    description: 'Complete the full marathon training program',
    icon: '🏅',
    category: 'training-plan',
    requirement: { type: 'plan-complete', value: 1, planType: 'marathon' },
  },
  {
    id: 'marathon_total_distance',
    name: 'Road Warrior',
    description: 'Run 400km during marathon training',
    icon: '🌍',
    category: 'training-plan',
    requirement: { type: 'distance', value: 400, planType: 'marathon' },
  },
];

// Half Marathon-specific badges
export const halfMarathonBadges: Badge[] = [
  {
    id: 'half_week_1',
    name: 'Half Marathon Begins',
    description: 'Complete week 1 of half marathon training',
    icon: '🌱',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 1, planType: 'half-marathon' },
  },
  {
    id: 'half_week_3',
    name: 'Foundation Complete',
    description: 'Complete the half marathon foundation phase',
    icon: '🏗️',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 3, planType: 'half-marathon' },
  },
  {
    id: 'half_week_5',
    name: 'Development Phase',
    description: 'Complete 5 weeks of half marathon training',
    icon: '📈',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 5, planType: 'half-marathon' },
  },
  {
    id: 'half_week_7',
    name: 'Race Ready Prep',
    description: 'Enter the race preparation phase',
    icon: '🎯',
    category: 'training-plan',
    requirement: { type: 'plan-week', value: 7, planType: 'half-marathon' },
  },
  {
    id: 'half_complete',
    name: 'Half Marathon Ready',
    description: 'Complete the full half marathon training program',
    icon: '🏆',
    category: 'training-plan',
    requirement: { type: 'plan-complete', value: 1, planType: 'half-marathon' },
  },
  {
    id: 'half_tempo_master',
    name: 'Tempo Master',
    description: 'Complete 15 runs during half marathon training',
    icon: '⚡',
    category: 'training-plan',
    requirement: { type: 'runs', value: 15, planType: 'half-marathon' },
  },
  {
    id: 'half_total_distance',
    name: 'Distance Champion',
    description: 'Run 150km during half marathon training',
    icon: '🛤️',
    category: 'training-plan',
    requirement: { type: 'distance', value: 150, planType: 'half-marathon' },
  },
];

// Combined badges array for general access
export const badges: Badge[] = generalBadges;

// Get badges by training plan type
export function getBadgesForPlan(planType: TrainingPlanType): Badge[] {
  switch (planType) {
    case 'hyrox':
      return hyroxBadges;
    case 'marathon':
      return marathonBadges;
    case 'half-marathon':
      return halfMarathonBadges;
    default:
      return [];
  }
}

// Get all badges including training plan badges
export function getAllBadges(): Badge[] {
  return [...generalBadges, ...hyroxBadges, ...marathonBadges, ...halfMarathonBadges];
}

export interface BadgeStats {
  totalWorkouts: number;
  currentStreak: number;
  totalDistance: number;
  strengthSessions: number;
  runSessions: number;
  cardioSessions: number;
  mobilitySessions: number;
  totalPoints: number;
  planWeeksCompleted?: number;
  planCompleted?: boolean;
  planDistance?: number;
}

export function checkBadgeUnlocked(badge: Badge, stats: BadgeStats): boolean {
  switch (badge.requirement.type) {
    case 'workouts':
      return stats.totalWorkouts >= badge.requirement.value;
    case 'streak':
      return stats.currentStreak >= badge.requirement.value;
    case 'distance':
      return stats.totalDistance >= badge.requirement.value;
    case 'strength':
      return stats.strengthSessions >= badge.requirement.value;
    case 'runs':
      return stats.runSessions >= badge.requirement.value;
    case 'cardio':
      return stats.cardioSessions >= badge.requirement.value;
    case 'mobility':
      return stats.mobilitySessions >= badge.requirement.value;
    case 'points':
      return stats.totalPoints >= badge.requirement.value;
    case 'plan-week':
      return (stats.planWeeksCompleted || 0) >= badge.requirement.value;
    case 'plan-complete':
      return stats.planCompleted === true;
    default:
      return false;
  }
}

export function getBadgeProgress(badge: Badge, stats: BadgeStats): number {
  let current = 0;
  switch (badge.requirement.type) {
    case 'workouts':
      current = stats.totalWorkouts;
      break;
    case 'streak':
      current = stats.currentStreak;
      break;
    case 'distance':
      current = stats.totalDistance;
      break;
    case 'strength':
      current = stats.strengthSessions;
      break;
    case 'runs':
      current = stats.runSessions;
      break;
    case 'cardio':
      current = stats.cardioSessions;
      break;
    case 'mobility':
      current = stats.mobilitySessions;
      break;
    case 'points':
      current = stats.totalPoints;
      break;
    case 'plan-week':
      current = stats.planWeeksCompleted || 0;
      break;
    case 'plan-complete':
      current = stats.planCompleted ? 1 : 0;
      break;
  }
  return Math.min((current / badge.requirement.value) * 100, 100);
}