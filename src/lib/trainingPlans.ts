export type TrainingPlanType = 'hyrox' | 'marathon' | 'half-marathon';

export interface TrainingPlan {
  id: TrainingPlanType;
  name: string;
  description: string;
  icon: string;
  durationWeeks: number;
  weeklyWorkouts: number;
  targetDistance?: number; // km for running plans
  phases: TrainingPhase[];
}

export interface TrainingPhase {
  name: string;
  weeks: number;
  description: string;
  focusAreas: string[];
}

export const trainingPlans: TrainingPlan[] = [
  {
    id: 'hyrox',
    name: 'HYROX Race Ready',
    description: 'Complete 8-week program combining running and functional fitness for HYROX competition',
    icon: '🏋️‍♂️',
    durationWeeks: 8,
    weeklyWorkouts: 5,
    phases: [
      {
        name: 'Foundation',
        weeks: 2,
        description: 'Build your aerobic base and movement patterns',
        focusAreas: ['Running endurance', 'Movement technique', 'Core strength'],
      },
      {
        name: 'Build',
        weeks: 3,
        description: 'Increase intensity and workout complexity',
        focusAreas: ['Interval training', 'Functional movements', 'Grip strength'],
      },
      {
        name: 'Peak',
        weeks: 2,
        description: 'Race-specific simulations and intensity',
        focusAreas: ['Race simulations', 'Transitions', 'Mental preparation'],
      },
      {
        name: 'Taper',
        weeks: 1,
        description: 'Recovery and final preparation',
        focusAreas: ['Active recovery', 'Race strategy', 'Nutrition planning'],
      },
    ],
  },
  {
    id: 'marathon',
    name: 'Marathon Mastery',
    description: '16-week comprehensive marathon training program for race day success',
    icon: '🏃‍♂️',
    durationWeeks: 16,
    weeklyWorkouts: 5,
    targetDistance: 42.195,
    phases: [
      {
        name: 'Base Building',
        weeks: 4,
        description: 'Establish your running foundation',
        focusAreas: ['Easy runs', 'Mileage buildup', 'Running form'],
      },
      {
        name: 'Strength',
        weeks: 4,
        description: 'Build running-specific strength and speed',
        focusAreas: ['Tempo runs', 'Hill training', 'Long runs'],
      },
      {
        name: 'Peak Training',
        weeks: 5,
        description: 'Maximum volume and intensity phase',
        focusAreas: ['Marathon pace runs', 'Long runs (32km+)', 'Race nutrition'],
      },
      {
        name: 'Taper',
        weeks: 3,
        description: 'Reduce volume while maintaining sharpness',
        focusAreas: ['Easy running', 'Race preparation', 'Mental focus'],
      },
    ],
  },
  {
    id: 'half-marathon',
    name: 'Half Marathon Hero',
    description: '10-week program to crush your half marathon goals',
    icon: '🏅',
    durationWeeks: 10,
    weeklyWorkouts: 4,
    targetDistance: 21.0975,
    phases: [
      {
        name: 'Foundation',
        weeks: 3,
        description: 'Build endurance and consistency',
        focusAreas: ['Easy runs', 'Mileage buildup', 'Cross-training'],
      },
      {
        name: 'Development',
        weeks: 4,
        description: 'Increase speed and stamina',
        focusAreas: ['Tempo runs', 'Intervals', 'Long runs (16-18km)'],
      },
      {
        name: 'Race Prep',
        weeks: 2,
        description: 'Race-specific training and tuning',
        focusAreas: ['Race pace practice', 'Fueling strategy', 'Mental preparation'],
      },
      {
        name: 'Taper',
        weeks: 1,
        description: 'Rest and prepare for race day',
        focusAreas: ['Light running', 'Rest', 'Race day planning'],
      },
    ],
  },
];

export function getTrainingPlan(id: TrainingPlanType): TrainingPlan | undefined {
  return trainingPlans.find(plan => plan.id === id);
}