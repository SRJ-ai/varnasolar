import React from 'react';
import { Building2, TrendingUp, ShieldCheck, ArrowRight, Zap, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';

export const CommercialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Commercial Solar</span>
          </nav>

          <AnimatedBadge variant="amber" pulseDot={true}>
            <span>40% Accelerated Tax Depreciation • 2.5–3 Year Payback</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Commercial Solar Power for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500">
              Businesses &amp; Tech Parks
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Transform recurring commercial power tariffs (₹8.50–₹11.50/unit) into high-yielding capital assets with instant corporate tax write-offs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/solar-calculator" variant="solar" size="lg" glow={true} icon={<Calculator className="w-5 h-5" />}>
              Commercial ROI Calculator
            </WatermelonButton>
            <WatermelonButton to="/contact" variant="glass" size="lg">
              Request Site Feasibility
            </WatermelonButton>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="dark" className="p-6 space-y-4">
            <div className="text-amber-400 font-bold text-lg">Section 32 Tax Shield</div>
            <div className="text-3xl font-black text-white">40% AD</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Claim 40% accelerated tax depreciation on capitalized solar plant value in Year 1, offsetting corporate tax obligations.
            </p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-4">
            <div className="text-emerald-400 font-bold text-lg">Rapid Capital Payback</div>
            <div className="text-3xl font-black text-white">2.5–3.2 Yrs</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              With high commercial electricity rates and tax relief, full capital investment is recovered in under 36 months.
            </p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-4">
            <div className="text-cyan-400 font-bold text-lg">Solar Carports &amp; Roofs</div>
            <div className="text-3xl font-black text-white">Zero Waste</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dual-purpose aesthetic solar carports for EV charging and tenant vehicle shade with high energy yield.
            </p>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
};
