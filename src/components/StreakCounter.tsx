import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  days: number;
  className?: string;
}

export function StreakCounter({ days, className = '' }: StreakCounterProps) {
  const isActive = days > 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className={`p-2 rounded-xl ${
          isActive 
            ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground streak-active' 
            : 'bg-muted text-muted-foreground'
        }`}
      >
        <Flame className="w-5 h-5" />
      </motion.div>
      <div>
        <motion.span
          key={days}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-foreground"
        >
          {days}
        </motion.span>
        <span className="text-sm text-muted-foreground ml-1">
          {days === 1 ? 'day' : 'days'}
        </span>
      </div>
    </motion.div>
  );
}
