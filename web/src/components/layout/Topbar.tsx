import React from 'react';
import { COMPANY_DATA } from '@/data/companyData';

export const Topbar: React.FC = () => {
  return (
    <div className="w-full bg-ink text-paper">
      <div className="container-editorial flex items-center justify-between py-2.5">
        <p className="label-mono text-paper/60 hidden md:block">
          Solar EPC — Telangana &amp; Andhra Pradesh
        </p>
        <div className="flex items-center gap-6 mx-auto md:mx-0">
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
