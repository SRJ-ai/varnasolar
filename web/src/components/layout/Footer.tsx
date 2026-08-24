import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_DATA } from '@/data/companyData';

const columns = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Residential', href: '/residential-solar' },
      { label: 'Commercial', href: '/commercial-solar' },
      { label: 'Industrial EPC', href: '/industrial-solar' },
      { label: 'Agriculture', href: '/agriculture-solar' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'ROI Calculator', href: '/solar-calculator' },
      { label: 'Subsidy Guide', href: '/pm-surya-ghar-yojana' },
      { label: 'Case Studies', href: '/projects' },
      { label: 'Knowledge Hub', href: '/blogs' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-paper">
      {/* Logo + giant wordmark */}
      <div className="container-editorial pt-10 pb-10 hairline-b border-white/10 flex flex-col gap-6">
        <img width="160" height="40" src={`${import.meta.env.BASE_URL}images/varna-logo.png`} alt="Varna Solar" className="h-10 w-auto object-contain self-start" loading="lazy" />
        <p className="font-display font-black uppercase tracking-tightest leading-[0.85] text-paper select-none text-[clamp(3rem,11vw,10.5rem)]">
          Varna<span className="text-sun">.</span>Solar
        </p>
      </div>

      {/* Link grid */}
      <div className="container-editorial grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
          <p className="text-sm text-paper/60 leading-relaxed max-w-xs">
            Tier-1 solar infrastructure for homes and businesses across Telangana &amp; AP.
          </p>
          <a
            href={`tel:${COMPANY_DATA.contact.rawPhone}`}
            className="label-mono text-sun hover:text-paper transition-colors"
          >
            {COMPANY_DATA.contact.primaryPhone}
          </a>
          <a
            href={`mailto:${COMPANY_DATA.contact.infoEmail}`}
            className="label-mono text-paper/70 hover:text-sun transition-colors break-all"
          >
            {COMPANY_DATA.contact.infoEmail}
          </a>
          <p className="label-mono text-paper/40">Hyderabad · Telangana · India</p>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h4 className="label-mono text-paper/40 mb-5">{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 py-1.5 text-sm text-paper/75 hover:text-sun transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="container-editorial py-6 hairline-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="label-mono text-paper/40">
          &copy; {currentYear} Varna Solar — All rights reserved
        </p>
        <p className="label-mono text-paper/40">PM Surya Ghar &amp; PM KUSUM Channel Partner</p>
      </div>
    </footer>
  );
};
