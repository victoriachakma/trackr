import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PointsDisplay({ points, showAnimation = false, size = 'md' }: PointsDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={showAnimation ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="text-points"
      >
        <Sparkles className={iconSizes[size]} />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={points}
          initial={showAnimation ? { scale: 1.5, y: -10, opacity: 0 } : {}}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className={`font-bold text-foreground ${sizeClasses[size]}`}
        >
          {points.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <span className="text-muted-foreground text-sm">pts</span>
    </div>
  );
}

interface PointsBreakdownProps {
  breakdown: { label: string; points: number }[];
  total: number;
}

export function PointsBreakdown({ breakdown, total }: PointsBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card"
    >
      <div className="space-y-3">
        {breakdown.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <span className="text-muted-foreground">{item.label}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
              className="font-semibold text-foreground"
            >
              +{item.points}
            </motion.span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Total earned</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: breakdown.length * 0.1 + 0.3, type: 'spring' }}
            className="flex items-center gap-2 text-primary"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xl font-bold">+{total}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
