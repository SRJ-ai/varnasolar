import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageTransitionVariants } from '@/utils/motionPresets';
import { cn } from '@/utils/cn';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const location = useLocation();

  // Automatic scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <motion.main
      key={location.pathname}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('min-h-screen pt-20 md:pt-24 pb-16 relative overflow-hidden', className)}
    >
      {/* Subtle top ambient radial glow orb */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] glow-orb-emerald opacity-25 pointer-events-none blur-3xl" />
      <div className="relative z-10">{children}</div>
    </motion.main>
  );
};
