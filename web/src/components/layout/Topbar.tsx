import React from 'react';
import { COMPANY_DATA } from '@/data/companyData';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';
import { Magnetic } from '@/components/common/Magnetic';

export const Topbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="w-full bg-ink text-paper">
      <div className="container-editorial flex items-center justify-between py-2.5">
        <p className="label-mono text-paper/60 hidden md:block">
          Solar EPC — Telangana &amp; Andhra Pradesh
        </p>
        <div className="flex items-center gap-3 sm:gap-6 mx-auto md:mx-0 flex-wrap justify-center">
          <a
            href={`mailto:${COMPANY_DATA.contact.infoEmail}`}
            className="label-mono text-paper hover:text-sun transition-colors"
          >
            {COMPANY_DATA.contact.infoEmail}
          </a>
          <span className="text-paper/30 hidden sm:inline">|</span>
          <a
            href={`tel:${COMPANY_DATA.contact.rawPhone}`}
            className="label-mono text-paper hover:text-sun transition-colors"
          >
            {COMPANY_DATA.contact.primaryPhone}
          </a>
          <span className="label-mono text-sun hidden lg:inline">PM Surya Ghar Partner</span>
          <span className="text-paper/30 hidden sm:inline">|</span>
          <Magnetic intensity={0.5}>
            <button 
              onClick={toggleTheme} 
              className="text-paper hover:text-sun transition-colors ml-2 focus:outline-none p-1"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};
