import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Bot, X, Sparkles } from 'lucide-react';

interface FloatingActionHubProps {
  onToggleChatbot?: () => void;
  isChatbotOpen?: boolean;
}

export const FloatingActionHub: React.FC<FloatingActionHubProps> = ({ 
  onToggleChatbot, 
  isChatbotOpen = false 
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleChatbotClick = () => {
    if (onToggleChatbot) {
      onToggleChatbot();
    } else {
      const event = new CustomEvent('toggle-varna-chatbot');
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* 1. WHATSAPP DIRECT BUTTON */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredButton === 'whatsapp' && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-3 px-3 py-1.5 rounded-xl bg-[#091322]/95 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-xl whitespace-nowrap hidden sm:block"
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.a
          href="https://wa.me/919182445679?text=Hello%20Varna%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20solution."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.65)] transition-shadow"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </motion.a>
      </div>

      {/* 2. DIRECT HOTLINE CALL BUTTON */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredButton === 'phone' && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-3 px-3 py-1.5 rounded-xl bg-[#091322]/95 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-xl whitespace-nowrap hidden sm:block"
            >
              Call +91 91824 45679
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.a
          href="tel:+919182445679"
          onMouseEnter={() => setHoveredButton('phone')}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-[#FF7A00] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,122,0,0.45)] hover:shadow-[0_6px_25px_rgba(255,122,0,0.65)] transition-shadow"
          aria-label="Call Varna Solar Hotline"
        >
          <Phone className="w-5 h-5 fill-white" />
        </motion.a>
      </div>

      {/* 3. ASK VARNA AI CHATBOT TRIGGER */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredButton === 'chatbot' && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="mr-3 px-3 py-1.5 rounded-xl bg-[#091322]/95 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-xl whitespace-nowrap hidden sm:block"
            >
              Ask Varna AI Solar Advisor
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={handleChatbotClick}
          onMouseEnter={() => setHoveredButton('chatbot')}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF5364] via-[#FF7A00] to-[#10B981] p-0.5 shadow-[0_4px_25px_rgba(255,83,100,0.5)] hover:shadow-[0_6px_35px_rgba(255,83,100,0.7)] transition-all"
          aria-label="Ask Varna AI Solar Chatbot"
        >
          <div className="w-full h-full bg-[#091322] rounded-full flex items-center justify-center text-white relative">
            {isChatbotOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <Bot className="w-6 h-6 text-emerald-400" />
                <Sparkles className="w-3 h-3 text-amber-400 absolute top-2 right-2 animate-pulse" />
                
                {/* Unread Indicator Pulse */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF5364] text-[9px] font-black items-center justify-center text-white">
                    1
                  </span>
                </span>
              </>
            )}
          </div>
        </motion.button>
      </div>

    </div>
  );
};
