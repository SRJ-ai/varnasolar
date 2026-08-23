import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Bot, X } from 'lucide-react';

interface FloatingActionHubProps {
  onToggleChatbot?: () => void;
  isChatbotOpen?: boolean;
}

export const FloatingActionHub: React.FC<FloatingActionHubProps> = ({
  onToggleChatbot,
  isChatbotOpen = false
}) => {
  const [isHubOpen, setIsHubOpen] = useState(false);

  const handleChatbotClick = () => {
    if (onToggleChatbot) onToggleChatbot();
    else window.dispatchEvent(new CustomEvent('toggle-varna-chatbot'));
    setIsHubOpen(false);
  };

  const toggleHub = () => setIsHubOpen((v) => !v);

  const labelCls =
    'mr-3 px-3 py-1.5 bg-ink text-paper label-mono whitespace-nowrap hidden sm:block';

  // When chatbot is open, hide the whole hub except the X to close it
  if (isChatbotOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="relative flex items-center">
          <motion.button
            type="button"
            onClick={handleChatbotClick}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-14 h-14 bg-sun text-paper flex items-center justify-center shadow-editorial-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation"
            aria-label="Close Ask Varna"
          >
            <X aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Single-button hub — expands on click */}
      <AnimatePresence>
        {isHubOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center"
            >
              <span className={labelCls} aria-hidden="true">WhatsApp</span>
              <motion.a
                href="https://wa.me/919182445679?text=Hello%20Varna%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20solution."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-11 h-11 border border-ink/15 bg-paper-card text-ink flex items-center justify-center hover:bg-sun hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2"
                aria-label="Chat on WhatsApp"
              >
                <MessageSquare aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center"
            >
              <span className={labelCls} aria-hidden="true">Call us</span>
              <motion.a
                href="tel:+919182445679"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-11 h-11 border border-ink/15 bg-paper-card text-ink flex items-center justify-center hover:bg-sun hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2"
                aria-label="Call Varna Solar"
              >
                <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center"
            >
              <span className={labelCls} aria-hidden="true">Ask Varna</span>
              <motion.button
                type="button"
                onClick={handleChatbotClick}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-11 h-11 border border-ink/15 bg-paper text-ink flex items-center justify-center hover:bg-sun hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2"
                aria-label="Ask Varna AI"
              >
                <Bot aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Single icon — cleaned state until tap, then expands to WHATSAPP / CALL US / ASK VARNA */}
      <div className="relative flex items-center">
        <motion.button
          type="button"
          onClick={toggleHub}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={`w-14 h-14 flex items-center justify-center shadow-editorial-sun transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation ${isHubOpen ? 'bg-ink text-paper' : 'bg-sun text-paper'}`}
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
  );
};
