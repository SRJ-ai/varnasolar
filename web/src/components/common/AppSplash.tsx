import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppSplash: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('varna_splash_seen');
    if (!hasSeenSplash) {
      setIsVisible(true);
      sessionStorage.setItem('varna_splash_seen', 'true');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500); // Show for 2.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-ink text-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 border-4 border-paper/10 border-t-sun rounded-full animate-spin mb-8" />
            <motion.h1 
              className="font-display font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-center leading-tight px-4 w-full text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Welcome to <br className="sm:hidden" /><span className="text-sun">Varna Solar</span>
            </motion.h1>
            <motion.p
              className="label-mono mt-4 text-ink-mute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Engineering Precision.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
