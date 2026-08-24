import React from 'react';
import { motion } from 'framer-motion';

const MARQUEE_ITEMS = [
  "100% DISCOM COMPLIANT",
  "MNRE APPROVED",
  "ISO 9001:2015 CERTIFIED",
  "25-YEAR PERFORMANCE WARRANTY",
  "TURNKEY EPC EXECUTION",
  "TIER-1 MODULES ONLY"
];

export const InfiniteMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-ink py-4 md:py-5 border-y border-ink-soft">
      <div className="flex whitespace-nowrap relative">
        <motion.div
          className="flex gap-16 md:gap-32 px-8 md:px-16"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* We duplicate the items 3 times to ensure a seamless infinite scroll loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span
              key={index}
              className="font-display font-black text-xl md:text-3xl text-paper tracking-tight uppercase"
            >
              {item}
              <span className="text-sun ml-16 md:ml-32">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
