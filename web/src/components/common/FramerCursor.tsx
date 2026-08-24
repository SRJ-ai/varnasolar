import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const FramerCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = !!t.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHovering(hover);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isVisible]);

  if (shouldReduceMotion) return null;
  if (!isVisible) return null;

  const size = isHovering ? 28 : 18;
  const offset = size / 2;

  return (
    <>
      <style>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          body, a, button { cursor: none !important; }
        }
      `}</style>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: size,
          height: size,
          border: '1.5px solid #FF4D00',
          background: isHovering ? 'rgba(255,77,0,0.10)' : 'rgba(244,243,238,0.85)',
          boxShadow: '0 2px 10px rgba(22,21,15,0.12)',
        }}
        animate={{
          transform: `translate3d(${pos.x - offset}px, ${pos.y - offset}px, 0) scale(${isHovering ? 1 : 1})`,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 650,
          damping: 28,
          mass: 0.22,
        }}
      >
        <span
          className="absolute rounded-full bg-[#FF4D00] pointer-events-none"
          style={{
            width: 4,
            height: 4,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0.95,
          }}
        />
      </motion.div>
    </>
  );
};
