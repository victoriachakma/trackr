import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { badges } from '../lib/badges';
import { useWorkoutStore } from '../store/workoutStore';

export function BadgeUnlockModal() {
  const { newlyUnlockedBadge, clearNewBadge } = useWorkoutStore();
  
  const badge = badges.find(b => b.id === newlyUnlockedBadge);

  useEffect(() => {
    if (newlyUnlockedBadge) {
      const timer = setTimeout(clearNewBadge, 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlockedBadge, clearNewBadge]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
          onClick={clearNewBadge}
        >
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative bg-card rounded-3xl p-8 shadow-lg max-w-sm mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={clearNewBadge}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, x: 0, opacity: 1 }}
                  animate={{
                    y: -150,
                    x: (Math.random() - 0.5) * 200,
                    opacity: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: ['hsl(24 95% 58%)', 'hsl(45 95% 50%)', 'hsl(142 70% 45%)', 'hsl(172 66% 45%)'][i % 4],
                  }}
                />
              ))}
            </div>

            {/* Badge icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-4 flex items-center justify-center text-6xl bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"
            >
              {badge.icon}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
            >
              Badge Unlocked!
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              {badge.name}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground"
            >
              {badge.description}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}