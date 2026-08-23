import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Topbar } from './Topbar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActionHub } from '../shared/FloatingActionHub';

// Automatic Scroll Restoration Component
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

  // Listen for custom toggle events
  useEffect(() => {
    const handleToggleChatbot = () => setIsChatbotOpen((prev) => !prev);
    const handleOpenQuote = () => setIsQuoteModalOpen(true);

    window.addEventListener('toggle-varna-chatbot', handleToggleChatbot);
    window.addEventListener('open-quote-modal', handleOpenQuote);

    return () => {
      window.removeEventListener('toggle-varna-chatbot', handleToggleChatbot);
      window.removeEventListener('open-quote-modal', handleOpenQuote);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050B14] text-slate-100 selection:bg-emerald-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
      <ScrollToTop />
      
      {/* 1. Header Topbar */}
      <Topbar />
      
      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      
      {/* 3. Main Content Router Outlet */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      
      {/* 4. Global 4-Column Footer */}
      <Footer />
      
      {/* 5. Floating Quick Action Hub */}
      <FloatingActionHub 
        isChatbotOpen={isChatbotOpen} 
        onToggleChatbot={() => setIsChatbotOpen(!isChatbotOpen)} 
      />
    </div>
  );
};
