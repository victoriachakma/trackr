import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ProgressRing } from '../components/ProgressRing';
import { StreakCounter } from '../components/StreakCounter';
import { PointsDisplay } from '../components/PointsDisplay';
import { BadgeCard } from '../components/BadgeCard';
import { useWorkoutStore } from '../store/workoutStore';
import { badges, checkBadgeUnlocked, getBadgeProgress } from '../lib/badges';
import { calculateLevel } from '../lib/pointsConfig';
import { computeBadgeStats } from '../lib/badgeUtils';

const Index = () => {
  const { stats, workouts, activePlan, unlockedBadges, unlockBadge } = useWorkoutStore();
  const badgeStats = computeBadgeStats(stats, workouts, activePlan);
  
  // Check for new badge unlocks
  useEffect(() => {
    badges.forEach((badge) => {
      if (!unlockedBadges.includes(badge.id) && checkBadgeUnlocked(badge, badgeStats)) {
        unlockBadge(badge.id);
      }
    });
  }, [badgeStats, unlockedBadges, unlockBadge]);

  const weeklyProgress = (stats.weeklyWorkouts / stats.weeklyGoal) * 100;
  const levelInfo = calculateLevel(stats.totalPoints);

  // Get recently unlocked badge for display
  const recentBadge = badges.find(b => unlockedBadges.includes(b.id));

  // Get next badge to unlock
  const nextBadge = badges.find(b => !unlockedBadges.includes(b.id));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-6 px-6"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Today</h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <PointsDisplay points={stats.totalPoints} size="sm" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-6 space-y-6">
        {/* Streak & Weekly Progress Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Streak Card */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <StreakCounter days={stats.currentStreak} />
          </div>

          {/* Weekly Goal Card */}
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="flex items-center gap-3">
              <ProgressRing progress={weeklyProgress} size={50} strokeWidth={5}>
                <span className="text-xs font-bold text-foreground">
                  {stats.weeklyWorkouts}/{stats.weeklyGoal}
                </span>
              </ProgressRing>
              <span className="text-sm text-muted-foreground">workouts</span>
            </div>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-points" />
              <span className="font-semibold text-foreground">Level {levelInfo.level}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {stats.totalPoints} / {levelInfo.nextThreshold} pts
            </span>
          </div>
          <div className="h-3 bg-progress-track rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-points rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Log Workout CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/log">
            <Button variant="hero" className="w-full" size="xl">
              <Plus className="w-6 h-6" />
              Log Workout
            </Button>
          </Link>
        </motion.div>

        {/* Badges Section */}
        {(recentBadge || nextBadge) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
              <Link to="/achievements" className="text-sm text-primary font-medium">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recentBadge && (
                <BadgeCard
                  badge={recentBadge}
                  isUnlocked={true}
                  progress={100}
                />
              )}
              {nextBadge && (
                <BadgeCard
                  badge={nextBadge}
                  isUnlocked={false}
                  progress={getBadgeProgress(nextBadge, badgeStats)}
                />
              )}
            </div>
          </motion.section>
        )}

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-card"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">All-Time Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalWorkouts}</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalDistance.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">km Run</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.longestStreak}</p>
              <p className="text-sm text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;