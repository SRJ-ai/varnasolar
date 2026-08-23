import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/motionPresets';
import { cn } from '@/utils/cn';
import { AnimatedBadge } from './AnimatedBadge';

export interface SectionHeaderProps {
  badge?: string | React.ReactNode;
  badgeVariant?: 'emerald' | 'mint' | 'coral' | 'rose' | 'amber' | 'obsidian' | 'glass';
  badgeIcon?: React.ReactNode;
  pulseBadge?: boolean;
  title: string | React.ReactNode;
  highlightText?: string;
  highlightGradient?: 'solar' | 'watermelon' | 'eco' | 'coral';
  description?: string | React.ReactNode;
  align?: 'center' | 'left' | 'right';
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'emerald',
  badgeIcon,
  pulseBadge = false,
  title,
  highlightText,
  highlightGradient = 'watermelon',
  description,
  align = 'center',
  className = '',
  maxWidth = '2xl',
}) => {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left mr-auto items-start',
    right: 'text-right ml-auto items-end',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-full',
  };

  const gradientClass = {
    watermelon: 'text-gradient-watermelon',
    solar: 'text-gradient-solar',
    eco: 'text-gradient-eco',
    coral: 'text-gradient-coral',
  }[highlightGradient];

  const renderTitle = () => {
    if (typeof title !== 'string' || !highlightText) {
      return title;
    }

    const parts = title.split(new RegExp(`(${highlightText})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={i} className={gradientClass}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn('flex flex-col mb-12 md:mb-16', alignClasses[align], maxWidthClasses[maxWidth], className)}
    >
      {badge && (
        <motion.div variants={fadeInUp} className="mb-4">
          {typeof badge === 'string' ? (
            <AnimatedBadge variant={badgeVariant} icon={badgeIcon} pulseDot={pulseBadge}>
              {badge}
            </AnimatedBadge>
          ) : (
            badge
          )}
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]"
      >
        {renderTitle()}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};
