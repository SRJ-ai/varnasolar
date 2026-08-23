import React, { ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light' | 'bordered' | 'glowing' | 'solar' | 'interactive';
  glowColor?: 'emerald' | 'coral' | 'amber' | 'cyan' | 'none';
  hoverEffect?: boolean;
  as?: ElementType;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'dark',
  glowColor = 'none',
  hoverEffect = true,
  ...props
}) => {
  const variantStyles = {
    dark: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-glass-md',
    light: 'bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-glass-sm text-slate-900',
    bordered: 'bg-slate-950/70 backdrop-blur-2xl border-2 border-emerald-500/20 shadow-glass-lg',
    glowing: 'bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl border border-white/15 shadow-glass-lg shadow-emerald-500/10',
    solar: 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/30 backdrop-blur-xl border border-amber-500/20 shadow-glass-md shadow-amber-500/10',
    interactive: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 shadow-glass-md hover:shadow-glow-emerald cursor-pointer',
  };

  const glowStyles = {
    none: '',
    emerald: 'hover:shadow-glow-emerald hover:border-emerald-500/40',
    coral: 'hover:shadow-glow-coral hover:border-varna-coral/40',
    amber: 'hover:shadow-glow-sun hover:border-varna-sun/40',
    cyan: 'hover:shadow-glow-cyan hover:border-cyan-400/40',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      whileTap={hoverEffect ? { scale: 0.99 } : undefined}
      className={cn(
        'relative rounded-2xl p-6 transition-all duration-300 overflow-hidden',
        variantStyles[variant],
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle ambient light gradient inside card */}
      <div className="absolute inset-0 bg-gradient-card-dark pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
