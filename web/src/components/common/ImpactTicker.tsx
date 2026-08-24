import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface ImpactTickerProps {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const ImpactTicker: React.FC<ImpactTickerProps> = ({ target, label, suffix = '', prefix = '', decimals = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 15,
    mass: 0.8,
  });

  const displayValue = useTransform(springValue, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(target);
    }
  }, [isInView, springValue, target]);

  return (
    <div ref={ref} className="flex flex-col gap-2 border-l-2 border-sun pl-6">
      <motion.span className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-ink tracking-tighter">
        {displayValue}
      </motion.span>
      <span className="font-mono text-xs md:text-sm text-ink-mute uppercase tracking-widest">{label}</span>
    </div>
  );
};
