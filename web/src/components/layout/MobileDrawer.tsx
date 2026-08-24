import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ArrowUpRight } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal?: () => void;
}

const solarSolutions = [
  { title: 'Residential Rooftop Solar', href: '/residential-solar' },
  { title: 'Commercial Solar', href: '/commercial-solar' },
  { title: 'Industrial Solar', href: '/industrial-solar' },
  { title: 'Agricultural Solar', href: '/agriculture-solar' },
];

const govtSchemes = [
  { title: 'PM Surya Ghar Yojana', href: '/pm-surya-ghar-yojana' },
  { title: 'PM Kusum Scheme', href: '/pm-kusum-scheme' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const [openSection, setOpenSection] = useState<string | null>('solar');
  const location = useLocation();

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  const Section = ({ name, label, items }: { name: string; label: string; items: { title: string; href: string }[] }) => (
    <div className="hairline-b">
      <button
        type="button"
        onClick={() => toggleSection(name)}
        aria-expanded={openSection === name}
        className="w-full flex items-center justify-between py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 touch-manipulation"
      >
        <span className="font-display font-bold uppercase tracking-tight text-lg text-ink">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-5 h-5 text-ink-mute transition-transform ${openSection === name ? 'rotate-180' : ''}`}
          strokeWidth={1.75}
        />
      </button>
      <AnimatePresence initial={false}>
        {openSection === name && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center justify-between py-3 pl-4 border-l-2 -ml-px transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 min-w-0 ${location.pathname === item.href ? 'border-sun text-sun' : 'border-ink/10 text-ink-soft hover:text-ink'
                }`}
              >
                <span className="text-sm font-medium truncate min-w-0">{item.title}</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 opacity-40 shrink-0" strokeWidth={1.75} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-paper flex flex-col z-50 overflow-y-auto overscroll-contain touch-manipulation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 hairline-b">
              <img src={`${import.meta.env.BASE_URL}images/varna-logo2.png`} alt="Varna Solar" width={120} height={32} className="h-8 w-auto object-contain" loading="eager" />
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <X aria-hidden="true" className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>

            {/* Nav sections — HOME | ABOUT US | SOLAR SOLUTIONS | GOVT SCHEMES | WHY CHOOSE US | PROJECTS | BLOGS */}
            <nav className="px-6 flex-1 pt-2">
              <Link to="/" onClick={onClose} className="block py-4 hairline-b font-display font-bold uppercase tracking-tight text-lg text-ink">Home</Link>
              <Link to="/about-us" onClick={onClose} className="block py-4 hairline-b font-display font-bold uppercase tracking-tight text-lg text-ink">About Us</Link>
              <Section name="solar" label="Solar Solutions" items={solarSolutions} />
              <Section name="govt" label="Govt Schemes" items={govtSchemes} />
              <Link to="/why-choose-us" onClick={onClose} className="block py-4 hairline-b font-display font-bold uppercase tracking-tight text-lg text-ink">Why Choose Us</Link>
              <Link to="/projects" onClick={onClose} className="block py-4 hairline-b font-display font-bold uppercase tracking-tight text-lg text-ink">Projects</Link>
              <Link to="/blogs" onClick={onClose} className="block py-4 hairline-b font-display font-bold uppercase tracking-tight text-lg text-ink">Blogs</Link>
            </nav>

            {/* CTA */}
            <div className="p-6 hairline-t mt-auto">
              <Link to="/contact" onClick={onClose} className="btn-premium w-full">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
