import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BadgeCard } from '../components/BadgeCard';
import { useWorkoutStore } from '../store/workoutStore';
import { badges, getBadgeProgress } from '../lib/badges';

const Achievements = () => {
  const { stats, workouts, unlockedBadges } = useWorkoutStore();

  const workoutTypes = new Set(workouts.map(w => w.type)).size;
  const minWorkoutsPerType = workouts.length > 0 
    ? Math.min(...Array.from(new Set(workouts.map(w => w.type))).map(type => 
        workouts.filter(w => w.type === type).length
      ))
    : 0;

  const badgeStats = {
    ...stats,
    workoutTypesCompleted: workoutTypes,
    minWorkoutsPerType: minWorkoutsPerType,
  };

  const unlockedCount = badges.filter(b => unlockedBadges.includes(b.id)).length;

  const badgesByCategory = {
    milestone: badges.filter(b => b.category === 'milestone'),
    streak: badges.filter(b => b.category === 'streak'),
    distance: badges.filter(b => b.category === 'distance'),
    workout: badges.filter(b => b.category === 'workout'),
  };

  const categoryLabels = {
    milestone: 'Milestones',
    streak: 'Streaks',
    distance: 'Distance',
    workout: 'Workout Types',
  };

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
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
            <p className="text-muted-foreground">
              {unlockedCount} of {badges.length} unlocked
            </p>
          </div>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6"
      >
        <div className="h-2 bg-progress-track rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / badges.length) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Badge Categories */}
      <main className="px-6 space-y-8">
        {(Object.entries(badgesByCategory) as [keyof typeof badgesByCategory, typeof badges][]).map(
          ([category, categoryBadges], categoryIndex) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + categoryIndex * 0.1 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {categoryBadges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    isUnlocked={unlockedBadges.includes(badge.id)}
                    progress={getBadgeProgress(badge, badgeStats)}
                  />
                ))}
              </div>
            </motion.section>
          )
        )}
      </main>
    </div>
  );
};

export default Achievements;