import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { Badge } from '../lib/badges';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  progress: number;
  isNew?: boolean;
}

export function BadgeCard({ badge, isUnlocked, progress, isNew = false }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={isUnlocked ? { scale: 1.05, y: -4 } : {}}
      className={`relative p-4 rounded-2xl shadow-card transition-all duration-300 ${
        isUnlocked
          ? 'bg-card hover:shadow-glow'
          : 'bg-muted/50'
      }`}
    >
      {/* New badge indicator */}
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center text-success-foreground text-xs font-bold"
        >
          ✓
        </motion.div>
      )}

      <div className="flex flex-col items-center text-center gap-2">
        {/* Badge icon */}
        <div
          className={`relative w-16 h-16 flex items-center justify-center text-3xl rounded-xl ${
            isUnlocked
              ? 'bg-linear-to-br from-primary/20 to-primary/5'
              : 'bg-muted'
          }`}
        >
          {isUnlocked ? (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {badge.icon}
            </motion.span>
          ) : (
            <>
              <span className="opacity-20 grayscale">{badge.icon}</span>
              <Lock className="absolute w-4 h-4 text-muted-foreground" />
            </>
          )}
        </div>

        {/* Badge name */}
        <h4
          className={`font-semibold text-sm ${
            isUnlocked ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {badge.name}
        </h4>

        {/* Progress bar (only show if not unlocked) */}
        {!isUnlocked && (
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary/60 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-muted-foreground">{badge.description}</p>
      </div>
    </motion.div>
  );
}