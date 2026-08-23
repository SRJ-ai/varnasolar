import React from 'react';
import { motion } from 'framer-motion';
import { popIn } from '@/utils/motionPresets';
import { cn } from '@/utils/cn';

export interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'mint' | 'coral' | 'rose' | 'amber' | 'obsidian' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulseDot?: boolean;
  glow?: boolean;
  className?: string;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  pulseDot = false,
  glow = false,
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    mint: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    coral: 'bg-varna-coral/15 text-rose-300 border-varna-coral/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    obsidian: 'bg-slate-900/80 text-slate-300 border-slate-700/50',
    glass: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
  };

  const dotColors = {
    emerald: 'bg-emerald-400',
    mint: 'bg-emerald-400',
    coral: 'bg-varna-coral',
    rose: 'bg-rose-400',
    amber: 'bg-amber-400',
    obsidian: 'bg-slate-400',
    glass: 'bg-white',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs gap-1.5',
    md: 'px-3.5 py-1 text-xs md:text-sm font-semibold gap-2',
    lg: 'px-4 py-1.5 text-sm font-bold gap-2.5',
  };

  return (
    <motion.span
      variants={popIn}
      initial="hidden"
      animate="visible"
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide font-medium shadow-inner-glow select-none',
        sizeStyles[size],
        variantStyles[variant],
        glow && 'shadow-glass-sm',
        className
      )}
    >
      {pulseDot && (
        <span className="relative flex h-2 w-2">
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant])} />
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
        </span>
      )}
      {icon && <span className="text-current">{icon}</span>}
      <span>{children}</span>
    </motion.span>
  );
};
