import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sun, Phone, MessageSquare, Calculator, ChevronRight, ChevronDown,
  Home, Building2, Factory, Sprout, Sparkles, ShieldCheck, Info,
  Award, FolderGit2, BookOpen, MapPin, Zap
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [openSection, setOpenSection] = useState<string | null>('solutions');
  const location = useLocation();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050B14]/80 backdrop-blur-md"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#091322] border-l border-white/10 shadow-2xl flex flex-col z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#050B14]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-extrabold text-lg text-white">
                  Varna<span className="text-emerald-400">Solar</span>
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Dialer Buttons */}
            <div className="p-4 grid grid-cols-2 gap-2.5 bg-white/[0.02] border-b border-white/5">
              <a 
                href="tel:+919182445679"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs hover:bg-emerald-500/20 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
              <a 
                href="https://wa.me/919182445679?text=Hello%20Varna%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20solution."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-semibold text-xs hover:bg-[#25D366]/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Navigation Accordion Tree */}
            <div className="flex-1 p-4 space-y-3">
              {/* Home */}
              <Link 
                to="/" 
                onClick={onClose}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${
                  location.pathname === '/' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-emerald-400" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {/* Solutions Accordion */}
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => toggleSection('solutions')}
                  className="w-full flex items-center justify-between p-3 text-sm font-bold text-white bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Solar Solutions
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'solutions' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>
                {openSection === 'solutions' && (
                  <div className="p-2 space-y-1 bg-[#050B14]/60">
                    <Link to="/residential-solar" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Home className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Residential Rooftop Solar</span>
                    </Link>
                    <Link to="/commercial-solar" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Commercial Solar Systems</span>
                    </Link>
                    <Link to="/industrial-solar" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Factory className="w-3.5 h-3.5 text-blue-400" />
                      <span>Industrial Power Plants</span>
                    </Link>
                    <Link to="/agriculture-solar" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Agriculture Solar Pumps</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Subsidies Accordion */}
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => toggleSection('subsidies')}
                  className="w-full flex items-center justify-between p-3 text-sm font-bold text-white bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Government Subsidies
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'subsidies' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>
                {openSection === 'subsidies' && (
                  <div className="p-2 space-y-1 bg-[#050B14]/60">
                    <Link to="/pm-surya-ghar-yojana" onClick={onClose} className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PM Surya Ghar Yojana</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">₹78k</span>
                    </Link>
                    <Link to="/pm-kusum-scheme" onClick={onClose} className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>PM KUSUM Scheme</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">60%</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Calculator Direct Link */}
              <Link 
                to="/solar-calculator" 
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl text-sm font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
              >
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Solar Savings Calculator</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-bold">38 States</span>
              </Link>

              {/* Company & Knowledge Accordion */}
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => toggleSection('company')}
                  className="w-full flex items-center justify-between p-3 text-sm font-bold text-white bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    Company &amp; Resources
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'company' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>
                {openSection === 'company' && (
                  <div className="p-2 space-y-1 bg-[#050B14]/60">
                    <Link to="/about-us" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>About Us &amp; Governance</span>
                    </Link>
                    <Link to="/why-choose-us" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Why Choose Varna Solar</span>
                    </Link>
                    <Link to="/projects" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Projects Portfolio (9 Cases)</span>
                    </Link>
                    <Link to="/blogs" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                      <span>Solar Knowledge Base</span>
                    </Link>
                    <Link to="/contact" onClick={onClose} className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-emerald-400 hover:bg-white/5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Contact &amp; 4 Branches</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Drawer Banner & Quote Trigger */}
            <div className="p-4 border-t border-white/10 bg-[#050B14] space-y-3">
              <button 
                onClick={() => {
                  onClose();
                  if (onOpenQuoteModal) onOpenQuoteModal();
                  else window.location.href = '/contact';
                }}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FF5364] via-[#FF7A00] to-[#FFA133] shadow-[0_0_20px_rgba(255,83,100,0.35)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Get Instant Solar Quote</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center space-y-1">
                <p className="font-semibold text-slate-300">Head Office: SR Nagar, Hyderabad</p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-emerald-400">
                  <span>Vizag</span> • <span>Adilabad</span> • <span>Vempalli</span> • <span>Tandur</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
