import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggerTextProps {
  text: string;
  className?: string;
  el?: keyof JSX.IntrinsicElements;
  once?: boolean;
  delay?: number;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom spring-like easing (Emil Kowalski style)
    },
  },
};

export const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  className,
  el: Wrapper = 'p',
  once = true,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.015, delayChildren: delay }}
        aria-hidden
        className="inline-block"
      >
        {text.split(" ").map((word, wordIndex) => (
          <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block"
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
