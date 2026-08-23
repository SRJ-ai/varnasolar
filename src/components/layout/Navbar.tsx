import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, ChevronDown, Home, Building2, Factory, Sprout, 
  Sparkles, ShieldCheck, Calculator, Info, Award, FolderGit2, 
  BookOpen, MapPin, Menu, X, CheckCircle2, Zap
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

interface NavDropdownItem {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Navbar: React.FC<{ onOpenQuoteModal?: () => void }> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Dropdown Configurations
  const solutionsItems: NavDropdownItem[] = [
    {
      title: 'Residential Rooftop Solar',
      href: '/residential-solar',
      description: 'Cut electricity bills by up to 90% with PM Surya Ghar ₹78k subsidy',
      icon: Home,
      badge: 'Popular',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Commercial Solar Solutions',
      href: '/commercial-solar',
      description: '40% Accelerated tax depreciation & 2.5-3 year rapid ROI for businesses',
      icon: Building2,
      badge: '40% Tax Benefit',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Industrial Solar Power Plants',
      href: '/industrial-solar',
      description: 'MW-scale captive plants, 11kV/33kV grid sync, and SCADA telemetry',
      icon: Factory,
      badge: 'MW Scale',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Agriculture Solar Pumps',
      href: '/agriculture-solar',
      description: 'High-discharge 3HP-10HP borewell pumps with 60% PM KUSUM subsidy',
      icon: Sprout,
      badge: '60% Subsidy',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
  ];

  const subsidiesItems: NavDropdownItem[] = [
    {
      title: 'PM Surya Ghar Muft Bijli Yojana',
      href: '/pm-surya-ghar-yojana',
      description: 'Direct Central Govt subsidy up to ₹78,000 credited to your bank within 30 days',
      icon: Sparkles,
      badge: '₹78,000 Subsidy',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'PM KUSUM Solar Scheme',
      href: '/pm-kusum-scheme',
      description: '60% Govt subsidy (30% Central + 30% State) for agricultural water pumps',
      icon: ShieldCheck,
      badge: '60% Subsidy',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
  ];

  const companyItems: NavDropdownItem[] = [
    {
      title: 'About Varna Solar',
      href: '/about-us',
      description: '10+ years EPC heritage, Waaree partnership & executive leadership DINs',
      icon: Info,
    },
    {
      title: 'Why Choose Us',
      href: '/why-choose-us',
      description: '100% DISCOM net-metering track record, Tier-1 ALMM panels & 30-yr AMC',
      icon: Award,
    },
    {
      title: 'Projects Portfolio',
      href: '/projects',
      description: 'Explore 9 landmark case studies executed across Telangana & Andhra Pradesh',
      icon: FolderGit2,
      badge: '15+ MW',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      title: 'Solar Knowledge Hub',
      href: '/blogs',
      description: 'In-depth solar guides, net metering procedures, and maintenance insights',
      icon: BookOpen,
    },
    {
      title: 'Contact & Branch Locator',
      href: '/contact',
      description: 'Hyderabad Headquarters + 4 regional branches in Vizag, Adilabad, Vempalli & Tandur',
      icon: MapPin,
    },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050B14]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5' 
            : 'bg-[#050B14]/75 backdrop-blur-lg border-b border-white/[0.06] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo & Waaree Partner Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] via-[#10B981] to-[#FF5364] p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_25px_rgba(255,83,100,0.45)] transition-all duration-300">
                <div className="w-full h-full bg-[#091322] rounded-[10px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-white">
                  <span>Varna</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364] ml-1">
                    Solar
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold mt-0.5">
                  EPC Engineering
                </span>
              </div>
            </Link>

            {/* Waaree Channel Partner Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-[10px] text-slate-300 shadow-sm ml-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-white">Waaree</span>
              <span className="text-slate-400">Authorized Partner</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home Link */}
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'text-emerald-400 bg-white/[0.06]' 
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname.includes('-solar') 
                    ? 'text-emerald-400 bg-white/[0.06]' 
                    : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#091322]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2.5 z-50 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {solutionsItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link 
                            key={item.href} 
                            to={item.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isActive ? 'bg-emerald-500/15 border border-emerald-500/30' : 'hover:bg-white/[0.06] border border-transparent'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-white truncate">{item.title}</span>
                                {item.badge && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.badgeColor}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subsidies Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('subsidies')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname.includes('pm-') 
                    ? 'text-emerald-400 bg-white/[0.06]' 
                    : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
                }`}
                aria-expanded={activeDropdown === 'subsidies'}
              >
                <span>Subsidies</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'subsidies' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'subsidies' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#091322]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2.5 z-50 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {subsidiesItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link 
                            key={item.href} 
                            to={item.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isActive ? 'bg-emerald-500/15 border border-emerald-500/30' : 'hover:bg-white/[0.06] border border-transparent'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-white truncate">{item.title}</span>
                                {item.badge && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.badgeColor}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solar Calculator Link */}
            <Link 
              to="/solar-calculator" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/solar-calculator' 
                  ? 'text-amber-400 bg-white/[0.06]' 
                  : 'text-slate-200 hover:text-amber-400 hover:bg-white/[0.04]'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Calculator</span>
            </Link>

            {/* Company & Knowledge Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  ['/about-us', '/why-choose-us', '/projects', '/blogs', '/contact'].includes(location.pathname) 
                    ? 'text-emerald-400 bg-white/[0.06]' 
                    : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
                }`}
                aria-expanded={activeDropdown === 'company'}
              >
                <span>Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-[#091322]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2.5 z-50 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {companyItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link 
                            key={item.href} 
                            to={item.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isActive ? 'bg-emerald-500/15 border border-emerald-500/30' : 'hover:bg-white/[0.06] border border-transparent'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-white truncate">{item.title}</span>
                                {item.badge && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.badgeColor}`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Glowing Watermelon CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuoteModal ? onOpenQuoteModal : () => {
                const el = document.getElementById('contact-quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/contact';
              }}
              className="relative hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF5364] via-[#FF7A00] to-[#FFA133] shadow-[0_0_20px_rgba(255,83,100,0.35)] hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] transition-all overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>Get Solar Quote</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </motion.button>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <MobileDrawer 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
