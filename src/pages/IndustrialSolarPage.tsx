import React from 'react';
import { Factory, Zap, ShieldCheck, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';

export const IndustrialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Industrial Solar</span>
          </nav>

          <AnimatedBadge variant="coral" pulseDot={true}>
            <span>High Tension 11kV/33kV Sync • MW-Scale Captive Solar Farms</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Industrial Solar Power Plants for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#FF5364]">
              Factories &amp; Manufacturing
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Heavy-duty turnkey EPC solar solutions for pharma hubs, textile mills, cement plants, and cold storages across South India with SCADA telemetry.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/contact" variant="primary" size="lg" glow={true}>
              Consult Industrial Solar EPC Engineer
            </WatermelonButton>
            <WatermelonButton to="/projects" variant="glass" size="lg">
              View 500 kWp Pharma Case Study
            </WatermelonButton>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="dark" className="p-6 space-y-3 border-rose-500/20">
            <h3 className="text-lg font-bold text-white">11kV / 33kV HT Grid Sync</h3>
            <p className="text-xs text-slate-300">Custom VCB substation synchronization engineered for high-tension industrial consumers.</p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-3 border-amber-500/20">
            <h3 className="text-lg font-bold text-white">Solar-DG Hybrid Controller</h3>
            <p className="text-xs text-slate-300">Smart zero-export synchronizers reducing diesel generator fuel burn by 70% to 80%.</p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-3 border-emerald-500/20">
            <h3 className="text-lg font-bold text-white">Real-Time SCADA IoT</h3>
            <p className="text-xs text-slate-300">Live plant generation, string inverter diagnostics, and automated fault alert web portals.</p>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
};
