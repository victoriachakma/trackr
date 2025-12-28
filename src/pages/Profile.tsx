import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, RotateCcw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ProgressRing } from '../components/ProgressRing';
import { useWorkoutStore } from '../store/workoutStore';
import { calculateLevel } from '../lib/pointsConfig';

const goalOptions = [3, 4, 5, 6, 7];

const Profile = () => {
  const { stats, setWeeklyGoal } = useWorkoutStore();
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  
  const levelInfo = calculateLevel(stats.totalPoints);

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
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </motion.header>

      <main className="px-6 space-y-6">
        {/* Level Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card flex items-center gap-6"
        >
          <ProgressRing progress={levelInfo.progress} size={80} strokeWidth={6}>
            <span className="text-xl font-bold text-foreground">{levelInfo.level}</span>
          </ProgressRing>
          <div>
            <h2 className="text-xl font-bold text-foreground">Level {levelInfo.level}</h2>
            <p className="text-muted-foreground">
              {stats.totalPoints.toLocaleString()} total points
            </p>
            <p className="text-sm text-primary mt-1">
              {levelInfo.nextThreshold - stats.totalPoints} pts to next level
            </p>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Settings</h2>
          
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {/* Weekly Goal Setting */}
            <button
              onClick={() => setShowGoalSelector(!showGoalSelector)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Weekly Goal</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.weeklyGoal} workouts per week
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  showGoalSelector ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* Goal Selector */}
            {showGoalSelector && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4"
              >
                <div className="flex gap-2 mt-2">
                  {goalOptions.map((goal) => (
                    <Button
                      key={goal}
                      variant={stats.weeklyGoal === goal ? 'workoutActive' : 'workout'}
                      size="sm"
                      onClick={() => {
                        setWeeklyGoal(goal);
                        setShowGoalSelector(false);
                      }}
                      className="flex-1"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Stats Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Journey</h2>
          
          <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Total Workouts</span>
              <span className="font-semibold text-foreground">{stats.totalWorkouts}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-semibold text-foreground">{stats.currentStreak} days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Longest Streak</span>
              <span className="font-semibold text-foreground">{stats.longestStreak} days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Total Distance</span>
              <span className="font-semibold text-foreground">{stats.totalDistance.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Strength Sessions</span>
              <span className="font-semibold text-foreground">{stats.strengthSessions}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Run Sessions</span>
              <span className="font-semibold text-foreground">{stats.runSessions}</span>
            </div>
          </div>
        </motion.section>

        {/* Reset Data (for testing) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-destructive"
            onClick={() => {
              if (confirm('Reset all workout data? This cannot be undone.')) {
                localStorage.removeItem('workout-storage');
                window.location.reload();
              }
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Data
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;