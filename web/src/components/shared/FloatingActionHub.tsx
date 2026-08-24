import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, MessageSquare, Bot, X } from 'lucide-react';

interface FloatingActionHubProps {
  onToggleChatbot?: () => void;
  isChatbotOpen?: boolean;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.18;

export const FloatingActionHub: React.FC<FloatingActionHubProps> = ({
  onToggleChatbot,
  isChatbotOpen = false,
}) => {
  const [isHubOpen, setIsHubOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleChatbotClick = () => {
    if (onToggleChatbot) onToggleChatbot();
    else window.dispatchEvent(new CustomEvent('toggle-varna-chatbot'));
    setIsHubOpen(false);
  };

  const toggleHub = () => setIsHubOpen((v) => !v);

  if (isChatbotOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={handleChatbotClick}
          className="w-14 h-14 bg-sun text-paper flex items-center justify-center shadow-editorial-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation transition-[transform,opacity] duration-[180ms] ease-out active:scale-[0.97]"
          style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
          aria-label="Close Ask Varna"
        >
          <X aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
        </button>
      </div>
    );
  }

  const itemTransition = (delay: number) =>
    shouldReduceMotion
      ? { duration: 0.01 }
      : { duration: DURATION, delay, ease: EASE_OUT };

  const fabBase =
    'w-11 h-11 border border-ink/15 bg-paper-card text-ink flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation transition-[transform,background-color,color,opacity] duration-[180ms] ease-out active:scale-[0.97] fab-hover';
  const labelCls =
    'mr-3 px-3 py-1.5 bg-ink text-paper label-mono whitespace-nowrap hidden sm:block border border-ink';

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .fab-hover:hover { transform: translateY(-2px); }
          .fab-main-hover:hover { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fab-hover, .fab-main-hover { transition-duration: 0.01ms !important; }
        }
      `}</style>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isHubOpen && (
            <>
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, transform: 'translateY(0) scale(1)' } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                transition={itemTransition(0)}
                className="relative flex items-center"
                style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
              >
                <span className={labelCls} aria-hidden="true">WhatsApp</span>
                <a
                  href="https://wa.me/919182445679?text=Hello%20Varna%20Solar%2C%20*Residential%2FCommercial%20enquiry*%20%E2%80%94%20I%27m%20in%20Hyderabad%2FTelangana%2FAP.%20Monthly%20bill%3A%20%E2%82%B9_____%20%2F%20Wanted%20size%3A%20__kW.%20Please%20share%20savings%20%26%20PM%20Surya%20Ghar%2FPM%20KUSUM%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={fabBase}
                  style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
                  aria-label="Chat on WhatsApp — Residential or Commercial enquiry, specify kW and bill"
                >
                  <MessageSquare className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, transform: 'translateY(0) scale(1)' } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                transition={itemTransition(0.05)}
                className="relative flex items-center"
                style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
              >
                <span className={labelCls} aria-hidden="true">Call us</span>
                <a
                  href="tel:+919182445679"
                  className={fabBase}
                  style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
                  aria-label="Call Varna Solar"
                >
                  <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
                </a>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, transform: 'translateY(0) scale(1)' } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(8px) scale(0.95)' }}
                transition={itemTransition(0.1)}
                className="relative flex items-center"
                style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
              >
                <span className={labelCls} aria-hidden="true">Ask Varna</span>
                <button
                  type="button"
                  onClick={handleChatbotClick}
                  className={fabBase}
                  style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
                  aria-label="Ask Varna AI"
                >
                  <Bot aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="relative flex items-center">
          <motion.button
            type="button"
            onClick={toggleHub}
            animate={shouldReduceMotion ? {} : { transform: isHubOpen ? 'scale(0.98)' : 'scale(1)' }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.16, ease: EASE_OUT }}
            className={`w-14 h-14 flex items-center justify-center shadow-editorial-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation transition-[transform,background-color,color] duration-[160ms] ease-out active:scale-[0.97] fab-main-hover ${isHubOpen ? 'bg-ink text-paper' : 'bg-sun text-paper'}`}
            style={{ transformOrigin: 'bottom right' } as React.CSSProperties}
            aria-label={isHubOpen ? 'Close contact menu' : 'Open contact menu'}
            aria-expanded={isHubOpen}
          >
            {isHubOpen ? (
              <X aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
            ) : (
              <Bot aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
};
