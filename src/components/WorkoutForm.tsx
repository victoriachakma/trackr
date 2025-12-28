import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Heart, Move, PersonStanding, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useWorkoutStore, type WorkoutType, type EffortLevel } from '../store/workoutStore';
import { PointsBreakdown } from './PointsDisplay';

const workoutTypes: { type: WorkoutType; label: string; icon: React.ReactNode }[] = [
  { type: 'run', label: 'Run', icon: <PersonStanding className="w-6 h-6" /> },
  { type: 'strength', label: 'Strength', icon: <Dumbbell className="w-6 h-6" /> },
  { type: 'cardio', label: 'Cardio', icon: <Heart className="w-6 h-6" /> },
  { type: 'mobility', label: 'Mobility', icon: <Move className="w-6 h-6" /> },
];

const effortLevels: { level: EffortLevel; label: string; emoji: string }[] = [
  { level: 'easy', label: 'Easy', emoji: '😌' },
  { level: 'moderate', label: 'Moderate', emoji: '💪' },
  { level: 'hard', label: 'Hard', emoji: '🔥' },
];

const durationOptions = [15, 20, 30, 45, 60, 90];

interface WorkoutFormProps {
  onComplete?: () => void;
}

type Step = 'type' | 'duration' | 'effort' | 'distance' | 'success';

export function WorkoutForm({ onComplete }: WorkoutFormProps) {
  const [step, setStep] = useState<Step>('type');
  const [workoutType, setWorkoutType] = useState<WorkoutType | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [effort, setEffort] = useState<EffortLevel>('moderate');
  const [distance, setDistance] = useState<string>('');
  
  const { addWorkout, lastPointsEarned, clearLastPoints } = useWorkoutStore();

  const handleTypeSelect = (type: WorkoutType) => {
    setWorkoutType(type);
    setStep('duration');
  };

  const handleDurationSelect = (mins: number) => {
    setDuration(mins);
    setStep('effort');
  };

  const handleEffortSelect = (level: EffortLevel) => {
    setEffort(level);
    if (workoutType === 'run') {
      setStep('distance');
    } else {
      submitWorkout();
    }
  };

  const submitWorkout = (distanceKm?: number) => {
    if (!workoutType) return;
    
    addWorkout({
      type: workoutType,
      duration,
      effort,
      distance: distanceKm,
    });
    
    setStep('success');
  };

  const handleDistanceSubmit = () => {
    const km = parseFloat(distance) || 0;
    submitWorkout(km);
  };

  const handleClose = () => {
    clearLastPoints();
    onComplete?.();
  };

  return (
    <div className="min-h-100 flex flex-col">
      <AnimatePresence mode="wait">
        {step === 'type' && (
          <motion.div
            key="type"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">What did you do?</h2>
            <p className="text-muted-foreground mb-6">Select your workout type</p>
            
            <div className="grid grid-cols-2 gap-3">
              {workoutTypes.map((wt) => (
                <Button
                  key={wt.type}
                  variant="workout"
                  size="card"
                  onClick={() => handleTypeSelect(wt.type)}
                  className="h-24"
                >
                  <div className="text-primary">{wt.icon}</div>
                  <span className="font-semibold">{wt.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'duration' && (
          <motion.div
            key="duration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">How long?</h2>
            <p className="text-muted-foreground mb-6">Select your workout duration</p>
            
            <div className="grid grid-cols-3 gap-3">
              {durationOptions.map((mins) => (
                <Button
                  key={mins}
                  variant={duration === mins ? 'workoutActive' : 'workout'}
                  size="card"
                  onClick={() => handleDurationSelect(mins)}
                  className="h-20"
                >
                  <span className="text-2xl font-bold">{mins}</span>
                  <span className="text-sm text-muted-foreground">min</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'effort' && (
          <motion.div
            key="effort"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">How hard was it?</h2>
            <p className="text-muted-foreground mb-6">Rate your effort level</p>
            
            <div className="grid grid-cols-3 gap-3">
              {effortLevels.map((el) => (
                <Button
                  key={el.level}
                  variant={effort === el.level ? 'effortActive' : 'effort'}
                  size="card"
                  onClick={() => handleEffortSelect(el.level)}
                  className="h-24"
                >
                  <span className="text-3xl">{el.emoji}</span>
                  <span className="font-semibold">{el.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'distance' && (
          <motion.div
            key="distance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Distance (optional)</h2>
            <p className="text-muted-foreground mb-6">How far did you run?</p>
            
            <div className="flex items-center gap-4 mb-6">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="0"
                className="w-32 h-16 text-3xl font-bold text-center bg-card border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
              />
              <span className="text-xl text-muted-foreground">km</span>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => submitWorkout()}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                onClick={handleDistanceSubmit}
                className="flex-1"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'success' && lastPointsEarned && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-success rounded-full flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-success-foreground" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              Great workout! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              You crushed it today
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <PointsBreakdown
                breakdown={lastPointsEarned.breakdown}
                total={lastPointsEarned.total}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 w-full"
            >
              <Button onClick={handleClose} className="w-full" size="lg">
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}