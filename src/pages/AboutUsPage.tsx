import React from 'react';
import { Sparkles, ArrowRight, Award, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

export const AboutUsPage: React.FC = () => {
  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">About Us</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>10+ Years of Solar Engineering Heritage</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Pioneering Clean Energy in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Telangana &amp; Andhra Pradesh
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {COMPANY_DATA.legalName} is South India's premier solar EPC enterprise and an Authorized Waaree Channel Partner, committed to engineering top-tier solar solutions with institutional rigor.
          </p>
        </div>
      </section>

      {/* EXECUTIVE DIRECTORS & MCA DIN SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#091322]/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="Statutory Governance"
            title="Executive Leadership & Board of Directors"
            highlightText="Executive Leadership"
            description="Guided by experienced technocrats with verifiable MCA records and power engineering mastery."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {COMPANY_DATA.leadership.map((director, idx) => (
              <GlassCard key={idx} variant="dark" className="p-8 border-emerald-500/20 space-y-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={director.avatarUrl} 
                    alt={director.name} 
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/30 shrink-0" 
                  />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{director.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400">{director.role}</p>
                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono text-[11px] text-emerald-300">
                      DIN: {director.din} {director.altDin ? `/ ${director.altDin}` : ''}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {director.bio}
                </p>

                <div className="pt-3 border-t border-white/10 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Qualifications:</span> {director.qualifications}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE FACTS & REPUTATION */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="Institutional Strength"
            title="Registered Governance & Compliance"
            highlightText="Governance & Compliance"
            description="Full statutory compliance with Ministry of Corporate Affairs, MNRE, and State DISCOMs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard variant="dark" className="p-6 space-y-3">
              <div className="text-emerald-400 font-bold text-sm">Corporate Identification (CIN)</div>
              <div className="text-lg font-mono font-bold text-white">{COMPANY_DATA.cin}</div>
              <p className="text-xs text-slate-400">Incorporated with the Registrar of Companies, Ministry of Corporate Affairs.</p>
            </GlassCard>

            <GlassCard variant="dark" className="p-6 space-y-3">
              <div className="text-amber-400 font-bold text-sm">Tax Account Number (TAN)</div>
              <div className="text-lg font-mono font-bold text-white">{COMPANY_DATA.tan}</div>
              <p className="text-xs text-slate-400">Income Tax Department Registration &amp; Compliant GST Billing.</p>
            </GlassCard>

            <GlassCard variant="dark" className="p-6 space-y-3">
              <div className="text-rose-400 font-bold text-sm">Waaree Channel Partnership</div>
              <div className="text-lg font-bold text-white">Tier-1 Franchisee Partner</div>
              <p className="text-xs text-slate-400">Direct supply chain for ALMM List-I certified Mono PERC &amp; TOPCon modules.</p>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
