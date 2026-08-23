import React from 'react';
import { Home, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';

export const ResidentialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Residential Solar</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>PM Surya Ghar: Up to ₹78,000 Direct Central Subsidy</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Residential Rooftop Solar Systems for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Homes &amp; Villas
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Eliminate up to 90% of your home electricity bill. Generate your own clean solar energy with Tier-1 Waaree modules and bidirectional net-metering.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/solar-calculator" variant="primary" size="lg" glow={true} icon={<Calculator className="w-5 h-5" />}>
              Estimate Home Solar Savings
            </WatermelonButton>
            <WatermelonButton to="/pm-surya-ghar-yojana" variant="secondary" size="lg">
              Check Subsidy Eligibility
            </WatermelonButton>
          </div>
        </div>
      </section>

      {/* SUBSIDY TIERS TABLE */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#091322]/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-10">
          <SectionHeader 
            badge="MNRE Direct Benefit Transfer"
            title="PM Surya Ghar Subsidy Slabs"
            highlightText="Subsidy Slabs"
            description="Clear statutory DBT central subsidy credited straight to your bank account."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSIDIES_DATA.pmSuryaGhar.slabs.map((slab, idx) => (
              <GlassCard key={idx} variant="interactive" glowColor="emerald" className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{slab.systemCapacity}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      ₹{(slab.centralSubsidyAmountINR / 1000)}k Subsidy
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">₹{slab.centralSubsidyAmountINR.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-slate-400">{slab.monthlyConsumptionRangeUnits}</p>
                  <p className="text-xs text-slate-300 font-medium">{slab.idealForHome}</p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-amber-400 font-semibold">
                  Avg Savings: {slab.averageMonthlySavingsINR}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
