import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Target, Trophy, ChevronRight, Play, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { trainingPlans, getTrainingPlan, type TrainingPlanType } from '../lib/trainingPlans';
import { getBadgesForPlan, checkBadgeUnlocked, getBadgeProgress } from '../lib/badges';
import { useTrainingPlanStore } from '../store/trainingPlanStore';
import { useWorkoutStore } from '../store/workoutStore';
import { BadgeCard } from '../components/BadgeCard';

const TrainingPlans = () => {
  const { activePlan, startPlan, cancelPlan, completePlan } = useTrainingPlanStore();
  const { stats } = useWorkoutStore();
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlanType | null>(null);

  const selectedPlanDetails = selectedPlan ? getTrainingPlan(selectedPlan) : null;
  const activePlanDetails = activePlan ? getTrainingPlan(activePlan.planType) : null;

  const handleStartPlan = () => {
    if (selectedPlan) {
      startPlan(selectedPlan);
      setSelectedPlan(null);
    }
  };

  const getPlanProgress = () => {
    if (!activePlan || !activePlanDetails) return 0;
    return (activePlan.currentWeek / activePlanDetails.durationWeeks) * 100;
  };

  const getCurrentPhase = () => {
    if (!activePlan || !activePlanDetails) return null;
    let weeksCount = 0;
    for (const phase of activePlanDetails.phases) {
      weeksCount += phase.weeks;
      if (activePlan.currentWeek <= weeksCount) {
        return phase;
      }
    }
    return activePlanDetails.phases[activePlanDetails.phases.length - 1];
  };

  const planBadgeStats = activePlan ? {
    totalWorkouts: activePlan.totalWorkouts,
    currentStreak: stats.currentStreak,
    totalDistance: activePlan.totalDistance,
    strengthSessions: activePlan.strengthSessions,
    runSessions: activePlan.runSessions,
    cardioSessions: 0,
    mobilitySessions: 0,
    totalPoints: stats.totalPoints,
    planWeeksCompleted: activePlan.currentWeek,
    planCompleted: activePlan.isCompleted,
    planDistance: activePlan.totalDistance,
  } : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-6 px-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Training Plans</h1>
            <p className="text-muted-foreground">
              {activePlan ? 'Active plan in progress' : 'Choose your goal'}
            </p>
          </div>
        </div>
      </motion.header>

      <main className="px-6 space-y-6">
        {/* Active Plan */}
        {activePlan && activePlanDetails && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 shadow-card border-2 border-primary"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePlanDetails.icon}</span>
                <div>
                  <h2 className="font-semibold text-foreground">{activePlanDetails.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Week {activePlan.currentWeek} of {activePlanDetails.durationWeeks}
                  </p>
                </div>
              </div>
              {!activePlan.isCompleted ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelPlan}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-1 text-success">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Complete!</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <Progress value={getPlanProgress()} className="h-3" />
            </div>

            {/* Current Phase */}
            {getCurrentPhase() && (
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <h3 className="font-medium text-foreground mb-1">
                  Current Phase: {getCurrentPhase()?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {getCurrentPhase()?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {getCurrentPhase()?.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Plan Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">{activePlan.totalWorkouts}</p>
                <p className="text-xs text-muted-foreground">Workouts</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{activePlan.totalDistance.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">km</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{activePlan.strengthSessions}</p>
                <p className="text-xs text-muted-foreground">Strength</p>
              </div>
            </div>

            {/* Complete Plan Button */}
            {!activePlan.isCompleted && activePlan.currentWeek >= activePlanDetails.durationWeeks && (
              <Button
                variant="hero"
                className="w-full mt-4"
                onClick={completePlan}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Complete Plan
              </Button>
            )}
          </motion.section>
        )}

        {/* Plan-Specific Badges */}
        {activePlan && planBadgeStats && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              {activePlanDetails?.name} Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {getBadgesForPlan(activePlan.planType).map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isUnlocked={checkBadgeUnlocked(badge, planBadgeStats)}
                  progress={getBadgeProgress(badge, planBadgeStats)}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Available Plans */}
        {!activePlan && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Choose Your Goal</h2>
            <div className="space-y-3">
              {trainingPlans.map((plan, index) => (
                <motion.button
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className="w-full bg-card rounded-2xl p-5 shadow-card text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{plan.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.durationWeeks} weeks • {plan.weeklyWorkouts} workouts/week</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Plan Preview Modal */}
        <AnimatePresence>
          {selectedPlanDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center"
              onClick={() => setSelectedPlan(null)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-card w-full max-w-lg rounded-t-3xl p-6 shadow-lg max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{selectedPlanDetails.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedPlanDetails.name}</h2>
                    <p className="text-muted-foreground">
                      {selectedPlanDetails.durationWeeks} weeks • {selectedPlanDetails.weeklyWorkouts} workouts/week
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{selectedPlanDetails.description}</p>

                {/* Phases */}
                <h3 className="font-semibold text-foreground mb-3">Training Phases</h3>
                <div className="space-y-3 mb-6">
                  {selectedPlanDetails.phases.map((phase, index) => (
                    <div key={index} className="bg-muted/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">{phase.name}</h4>
                        <span className="text-sm text-muted-foreground">{phase.weeks} weeks</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  ))}
                </div>

                {/* Badges Preview */}
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Earn {getBadgesForPlan(selectedPlan!).length} Exclusive Badges
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {getBadgesForPlan(selectedPlan!).slice(0, 4).map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-muted/50 rounded-lg px-3 py-2 flex items-center gap-2"
                    >
                      <span>{badge.icon}</span>
                      <span className="text-sm text-muted-foreground">{badge.name}</span>
                    </div>
                  ))}
                  {getBadgesForPlan(selectedPlan!).length > 4 && (
                    <div className="bg-muted/50 rounded-lg px-3 py-2">
                      <span className="text-sm text-muted-foreground">
                        +{getBadgesForPlan(selectedPlan!).length - 4} more
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleStartPlan}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Plan
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TrainingPlans;