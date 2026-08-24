import React from 'react';
import { COMPANY_DATA } from '@/data/companyData';
import { useTranslation } from 'react-i18next';

export const Topbar: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <div className="w-full bg-ink text-paper">
      <div className="container-editorial flex items-center justify-between py-2.5">
        <p className="label-mono text-paper/60 hidden md:block">
          Solar EPC — Telangana &amp; Andhra Pradesh
        </p>
        <div className="flex items-center gap-6 mx-auto md:mx-0">
          <div className="flex items-center gap-2 label-mono text-paper/50">
            <button 
              onClick={() => i18n.changeLanguage('en')}
              className={`hover:text-paper transition-colors ${i18n.language === 'en' ? 'text-sun' : ''}`}
            >EN</button>
            <span>|</span>
            <button 
              onClick={() => i18n.changeLanguage('te')}
              className={`hover:text-paper transition-colors ${i18n.language === 'te' ? 'text-sun' : ''}`}
            >తెలుగు</button>
          </div>
          <a
            href={`tel:${COMPANY_DATA.contact.rawPhone}`}
            className="label-mono text-paper hover:text-sun transition-colors"
          >
            {COMPANY_DATA.contact.primaryPhone}
          </a>
          <span className="label-mono text-sun hidden lg:inline">PM Surya Ghar Partner</span>
        </div>
      </div>
    </div>
  );
};
