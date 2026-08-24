import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudLightning } from 'lucide-react';

interface HouseVisualizerProps {
  systemSizeKW: number;
}

export const HouseVisualizer: React.FC<HouseVisualizerProps> = ({ systemSizeKW }) => {
  // Assume each panel is roughly 0.5 kWp
  // Max panels to show on this visualizer is 24 (12kWp system)
  const numPanels = Math.min(Math.ceil(systemSizeKW / 0.5), 24);
  const panelsArray = Array.from({ length: numPanels });

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto bg-paper-deep rounded-full border-4 border-ink/5 flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <motion.div 
        className="absolute top-8 right-12 text-sun/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Sun size={64} strokeWidth={1} />
      </motion.div>

      {/* House Base */}
      <div className="relative w-64 h-48 mt-12">
        {/* Roof Base */}
        <div className="absolute top-0 w-0 h-0 border-l-[128px] border-r-[128px] border-b-[80px] border-l-transparent border-r-transparent border-b-ink z-10" />
        
        {/* House Body */}
        <div className="absolute top-[80px] left-[32px] w-[192px] h-[112px] bg-paper-card border border-ink/20 z-0">
          <div className="absolute bottom-0 left-[20px] w-12 h-16 bg-ink/10 border-t border-r border-l border-ink/20" />
          <div className="absolute top-6 right-6 w-12 h-10 bg-ink/10 border border-ink/20 flex items-center justify-center">
            <div className="w-10 h-8 bg-paper/50" />
          </div>
        </div>

        {/* Dynamic Solar Panels on Roof */}
        <div className="absolute top-[15px] left-[40px] right-[40px] h-[55px] z-20 flex flex-wrap gap-1 justify-center items-end pb-2">
          <AnimatePresence>
            {panelsArray.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 300 
                }}
                className="w-4 h-6 bg-blue-900 border border-blue-400/50 shadow-[0_0_8px_rgba(59,130,246,0.5)] skew-x-[-15deg] overflow-hidden"
              >
                <div className="w-full h-[1px] bg-blue-400/30 mt-1" />
                <div className="w-full h-[1px] bg-blue-400/30 mt-1" />
                <div className="w-full h-[1px] bg-blue-400/30 mt-1" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Overlay Status */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="bg-paper-card border border-ink/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
          <CloudLightning size={16} className={systemSizeKW > 0 ? "text-sun" : "text-ink-mute"} />
          <span className="label-mono text-ink text-xs">
            {systemSizeKW > 0 ? `Generating ~${Math.round(systemSizeKW * 4)} kWh/day` : "Awaiting System Size"}
          </span>
        </div>
      </div>
    </div>
  );
};
