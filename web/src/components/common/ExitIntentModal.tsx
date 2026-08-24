import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only trigger once per session
    if (sessionStorage.getItem('exitIntentTriggered')) {
      return;
    }

    const handleMouseOut = (e: MouseEvent) => {
      // e.relatedTarget is null when the mouse leaves the window entirely.
      // e.clientY < 20 ensures they are leaving from the top (towards tabs/URL bar).
      if (!e.relatedTarget && e.clientY < 20) {
        setIsOpen(true);
        sessionStorage.setItem('exitIntentTriggered', 'true');
        // Remove listener immediately after triggering
        document.removeEventListener('mouseout', handleMouseOut);
      }
    };

    // Add slight delay before activating to prevent immediate trigger on load
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseOut);
    }, 2000); // reduced delay to 2s for better testing

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper-card border border-ink/15 w-full max-w-lg relative overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors z-10"
                aria-label="Close"
              >
                <X strokeWidth={1.5} className="w-6 h-6" />
              </button>

              <div className="bg-sun-tint border-b border-ink/10 p-8 text-center relative overflow-hidden">
                <Zap className="w-12 h-12 text-sun mx-auto mb-4 opacity-20 absolute -left-4 -top-4 scale-[2]" strokeWidth={1} />
                <h3 className="font-display font-black uppercase tracking-tight text-3xl mb-2">Wait! Don't leave savings on the table.</h3>
                <p className="text-ink-soft text-sm">You could be saving 90% on your electricity bill.</p>
              </div>

              <div className="p-8">
                <p className="text-center text-ink mb-6">
                  Get a <strong>Free 3D Shadow Analysis</strong> and exact PM Surya Ghar Subsidy calculation before you decide. No obligations.
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="btn-premium flex justify-center py-3.5"
                  >
                    Claim Free Site Inspection <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-ink-mute hover:text-ink underline underline-offset-4 py-2 transition-colors"
                  >
                    No thanks, I prefer paying high electricity bills
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
