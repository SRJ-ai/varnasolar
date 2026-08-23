import React from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'emerald' | 'coral' | 'amber' | 'cyan' | 'obsidian';

export interface AnimatedBadgeProps {
  variant?: BadgeVariant;
  pulseDot?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  pulseDot = false,
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        'label-mono inline-flex items-center gap-2 border border-ink/25 px-3 py-1.5 text-ink-soft',
        className
      )}
    >
      {pulseDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-sun" />
          <span className="relative inline-flex rounded-none h-1.5 w-1.5 bg-sun" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
