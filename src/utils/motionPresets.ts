import { Variants, Transition } from 'framer-motion';

// ==========================================
// 1. Spring Physics Transitions
// ==========================================
export const springPhysics: Record<string, Transition> = {
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  },
  snappy: {
    type: 'spring',
    stiffness: 350,
    damping: 25,
  },
  gentle: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
  smooth: {
    type: 'spring',
    stiffness: 180,
    damping: 24,
  },
  slow: {
    type: 'spring',
    stiffness: 100,
    damping: 30,
  },
};

// ==========================================
// 2. Stagger Container Variants
// ==========================================
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerFast: Variants = staggerContainer(0.05, 0.05);
export const staggerNormal: Variants = staggerContainer(0.08, 0.1);
export const staggerSlow: Variants = staggerContainer(0.15, 0.2);

// ==========================================
// 3. Stagger Item Reveal Variants
// ==========================================
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPhysics.gentle,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPhysics.gentle,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springPhysics.gentle,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springPhysics.gentle,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springPhysics.snappy,
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springPhysics.bouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 10,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

// ==========================================
// 4. Interactive Card & Button Interaction Props
// ==========================================
export const cardHoverProps = {
  whileHover: {
    y: -8,
    scale: 1.015,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  whileTap: { scale: 0.985 },
};

export const buttonTapProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15 },
};

export const iconHoverRotate = {
  whileHover: { rotate: 15, scale: 1.15 },
  transition: { type: 'spring', stiffness: 300, damping: 15 },
};

// ==========================================
// 5. Modal & Dialog Overlay / Window Variants
// ==========================================
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springPhysics.bouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: springPhysics.gentle,
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// ==========================================
// 6. Page Transitions
// ==========================================
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// ==========================================
// 7. Ambient Pulsing & Floating Loops
// ==========================================
export const pulseGlowVariants: Variants = {
  initial: { opacity: 0.35, scale: 0.95 },
  animate: {
    opacity: [0.35, 0.75, 0.35],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
