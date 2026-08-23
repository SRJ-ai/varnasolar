import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, FileText, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';

export const PMSuryaGharPage: React.FC = () => {
  const subsidyData = SUBSIDIES_DATA.pmSuryaGhar;

  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">PM Surya Ghar Yojana</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>Central Government DBT Subsidy • ₹75,021 Cr National Budget</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            PM Surya Ghar: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Muft Bijli Yojana Guide 2026
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Get up to <strong className="text-emerald-400">₹78,000 Direct Bank Transfer (DBT)</strong> subsidy deposited straight into your bank account. Varna Solar handles 100% of national portal registration and DISCOM net-metering.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/solar-calculator" variant="primary" size="lg" glow={true} icon={<Calculator className="w-5 h-5" />}>
              Calculate Your Exact Subsidy
            </WatermelonButton>
            <WatermelonButton to="/contact" variant="secondary" size="lg">
              Book Free Feasibility Inspection
            </WatermelonButton>
          </div>
        </div>
      </section>

      {/* 5 STEPS WORKFLOW */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#091322]/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="End-to-End Hassle-Free"
            title="5-Step Subsidy Disbursal Timeline"
            highlightText="Subsidy Disbursal"
            description="From national portal KYC submission to DISCOM net-meter synchronization and direct DBT credit."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {subsidyData.claimSteps.map((step) => (
              <GlassCard key={step.stepNumber} variant="dark" className="p-5 space-y-3 border-emerald-500/20 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                    {step.stepNumber}
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.shortDesc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] text-amber-400 font-medium">
                  {step.turnaroundTime}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionHeader 
            badge="Checklist"
            title="Required Documents for Subsidy Claim"
            highlightText="Required Documents"
            description="Keep these 5 basic documents ready for immediate portal upload by Varna Solar."
          />

          <div className="space-y-3">
            {subsidyData.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
