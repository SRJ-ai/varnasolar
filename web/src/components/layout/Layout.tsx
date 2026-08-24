import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Topbar } from './Topbar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActionHub } from '../shared/FloatingActionHub';
import { ChatbotPanel } from '../shared/ChatbotPanel';
import { CustomCursor } from '../common/CustomCursor';
import { useSoundEffect } from '@/hooks/useSoundEffect';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const Layout: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { playClick, playWhoosh } = useSoundEffect();

  useEffect(() => {
    const handleToggleChatbot = () => {
      setIsChatbotOpen((prev) => !prev);
      playWhoosh();
    };
    const handleOpenQuote = () => {
      setIsQuoteModalOpen(true);
      playWhoosh();
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        playClick();
      }
    };

    window.addEventListener('toggle-varna-chatbot', handleToggleChatbot);
    window.addEventListener('open-quote-modal', handleOpenQuote);
    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener('toggle-varna-chatbot', handleToggleChatbot);
      window.removeEventListener('open-quote-modal', handleOpenQuote);
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [playClick, playWhoosh]);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun">
        Skip to main content
      </a>
      <CustomCursor />
      <ScrollToTop />
      
      {/* 1. Header Topbar */}
      <Topbar />
      
      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      
      {/* 3. Main Content Router Outlet */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
        <Outlet />
      </main>
      
      {/* 4. Global 4-Column Footer */}
      <Footer />
      
      {/* 5. Chatbot Panel */}
      <ChatbotPanel isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

      {/* 6. Floating Quick Action Hub */}
      <FloatingActionHub 
        isChatbotOpen={isChatbotOpen} 
        onToggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)} 
      />
    </div>
  );
};
