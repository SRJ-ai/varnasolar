import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowUpRight } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

interface NavDropdownItem {
  title: string;
  href: string;
  description: string;
}

export const Navbar: React.FC<{ onOpenQuoteModal?: () => void }> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const solarSolutionsItems: NavDropdownItem[] = [
    { title: 'Residential Rooftop Solar', href: '/residential-solar', description: 'Homes & villas · PM Surya Ghar subsidy' },
    { title: 'Commercial Solar', href: '/commercial-solar', description: 'Offices & hospitals · 90% bill cut' },
    { title: 'Industrial Solar', href: '/industrial-solar', description: 'Factories · MW scale EPC' },
    { title: 'Agricultural Solar', href: '/agriculture-solar', description: 'PM KUSUM pumps · farms' },
  ];

  const govtSchemesItems: NavDropdownItem[] = [
    { title: 'PM Surya Ghar Yojana', href: '/pm-surya-ghar-yojana', description: 'Up to ₹78,000 residential subsidy' },
    { title: 'PM Kusum Scheme', href: '/pm-kusum-scheme', description: '60% farm pump subsidy' },
  ];

  const linkCls =
    'label-mono text-ink-soft hover:text-sun transition-colors py-2';
  const topLinkCls = (active: boolean) =>
    `label-mono transition-colors py-2 border-b-2 ${active ? 'text-sun border-sun' : 'text-ink-soft hover:text-sun border-transparent'}`;

  const DropdownPanel = ({ items, isOpen }: { items: NavDropdownItem[]; isOpen: boolean }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(8px) scale(0.97)' }}
          animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
          exit={{ opacity: 0, transform: 'translateY(6px) scale(0.97)' }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'top left' } as React.CSSProperties}
          className="absolute top-full left-0 mt-2 w-[380px] bg-paper border border-ink/15 shadow-editorial z-50"
        >
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="group flex items-start justify-between gap-4 px-5 py-4 border-b border-ink/10 last:border-b-0 hover:bg-sun-tint transition-colors"
            >
              <div>
                <div className="font-display font-bold text-sm uppercase tracking-wide text-ink">
                  {item.title}
                </div>
                <p className="text-xs text-ink-mute mt-0.5">{item.description}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 mt-0.5 text-ink/30 group-hover:text-sun group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform transition-colors shrink-0" />
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'nav-glass shadow-card' : 'bg-paper hairline-b'
        }`}
      >
        <nav className="container-editorial flex h-[64px] items-center justify-between gap-6">

          {/* Wordmark — real Varna Solar logo + Waaree partner */}
           <Link to="/" className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2">
            <img src={`${import.meta.env.BASE_URL}images/varna-logo2.png`} alt="Varna Solar" width={120} height={36} className="h-9 w-auto object-contain" loading="eager" fetchPriority="high" />
            <span className="hidden sm:block w-px h-8 bg-ink/15" aria-hidden="true" />
            <img src={`${import.meta.env.BASE_URL}images/waaree-partner-logo.png`} alt="Waaree Channel Partner" width={100} height={28} className="hidden sm:block h-7 w-auto object-contain" loading="eager" />
          </Link>

          {/* Desktop nav — HOME | ABOUT US | SOLAR SOLUTIONS | GOVT SCHEMES | WHY CHOOSE US | PROJECTS | BLOGS */}
          <div className="hidden lg:flex items-center gap-6 relative">
            <Link to="/" className={topLinkCls(location.pathname === '/')}>Home</Link>
            <Link to="/about-us" className={topLinkCls(location.pathname === '/about-us')}>About Us</Link>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solar')}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleMouseEnter('solar')}
              onBlur={handleMouseLeave}
            >
              <button aria-expanded={activeDropdown === 'solar'} aria-haspopup="true" className={`${topLinkCls(activeDropdown === 'solar')} flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2`}>
                Solar Solutions <span aria-hidden="true" className={`transition-transform text-xs ${activeDropdown === 'solar' ? 'rotate-180' : ''}`}>^</span>
              </button>
              <DropdownPanel items={solarSolutionsItems} isOpen={activeDropdown === 'solar'} />
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('govt')}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleMouseEnter('govt')}
              onBlur={handleMouseLeave}
            >
              <button aria-expanded={activeDropdown === 'govt'} aria-haspopup="true" className={`${topLinkCls(activeDropdown === 'govt')} flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2`}>
                Govt Schemes <span aria-hidden="true" className={`transition-transform text-xs ${activeDropdown === 'govt' ? 'rotate-180' : ''}`}>^</span>
              </button>
              <DropdownPanel items={govtSchemesItems} isOpen={activeDropdown === 'govt'} />
            </div>

            <Link to="/why-choose-us" className={topLinkCls(location.pathname === '/why-choose-us')}>Why Choose Us</Link>
            <Link to="/projects" className={topLinkCls(location.pathname === '/projects')}>Projects</Link>
            <Link to="/blogs" className={topLinkCls(location.pathname === '/blogs')}>Blogs</Link>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link to="/contact" className="btn-premium !py-2.5 !px-5 text-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
          </button>
        </nav>
      </header>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
