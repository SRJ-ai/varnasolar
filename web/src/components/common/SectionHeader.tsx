import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: string;
  title: string;
  highlightText?: string;
  gradientTheme?: 'solar' | 'blue' | 'green';
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightText,
  description,
  align = 'left',
  theme = 'light',
  className,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const renderTitle = () => {
    if (!highlightText || !title.includes(highlightText)) {
      return title;
    }

    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-sun">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex flex-col max-w-3xl space-y-4', alignStyles[align], className)}
    >
      {badge && (
        <span className="label-mono text-sun border-b border-sun pb-1 w-fit">{badge}</span>
      )}

      <h2 className={cn(
        'headline-section text-3xl sm:text-4xl lg:text-5xl',
        theme === 'dark' ? 'text-paper' : 'text-ink'
      )}>
        {renderTitle()}
      </h2>

      {description && (
        <p className={cn(
          'text-base sm:text-lg leading-relaxed max-w-[65ch]',
          theme === 'dark' ? 'text-paper/60' : 'text-ink-soft'
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
