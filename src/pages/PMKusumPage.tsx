import React from 'react';
import { Sprout, ShieldCheck, CheckCircle2, ArrowRight, Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';

export const PMKusumPage: React.FC = () => {
  const kusum = SUBSIDIES_DATA.pmKusum;

  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">PM KUSUM Scheme</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>60% Govt Subsidy (30% Central + 30% State) • 10% Farmer Share</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            PM-KUSUM Scheme for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
              Farmers &amp; Solar Agriculture
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan — Transform farming with solarized water pumps, zero diesel burn, and guaranteed daytime irrigation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/contact" variant="secondary" size="lg" glow={true}>
              Apply for PM KUSUM Solar Pump
            </WatermelonButton>
            <WatermelonButton to="/agriculture-solar" variant="glass" size="lg">
              Explore Agriculture Pump Sizes
            </WatermelonButton>
          </div>
        </div>
      </section>

      {/* 3 COMPONENTS GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-[#091322]/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="Comprehensive Agriculture Framework"
            title="PM KUSUM 3 Core Components"
            highlightText="3 Core Components"
            description="Complete breakdown of Component A (Power Plants), Component B (Standalone Pumps), and Component C (Grid Solarization)."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {kusum.components.map((comp) => (
              <GlassCard key={comp.id} variant="dark" className="p-8 space-y-6 flex flex-col justify-between border-emerald-500/20">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    {comp.id}
                  </div>
                  <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                  <p className="text-xs font-semibold text-amber-400">{comp.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{comp.economicBenefit}</p>
                  
                  <ul className="space-y-2 text-xs text-slate-400 pt-2">
                    {comp.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-slate-300">
                  <span className="text-slate-400">Target Category:</span> <strong className="text-white">{comp.targetCategory}</strong>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
