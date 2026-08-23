import React from 'react';
import { Sprout, ShieldCheck, ArrowRight, Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';

export const AgricultureSolarPage: React.FC = () => {
  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Agriculture Solar</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>PM KUSUM Scheme • 60% Direct Agri Subsidy</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Solar Agricultural Water Pumps &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-mint-300">
              Farm Irrigation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Empowering farmers across Telangana and Andhra Pradesh with 3HP to 20HP solar borewell pumps, zero diesel bills, and automated daytime irrigation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <WatermelonButton to="/pm-kusum-scheme" variant="secondary" size="lg" glow={true}>
              Explore PM KUSUM 60% Subsidy
            </WatermelonButton>
            <WatermelonButton to="/contact" variant="glass" size="lg">
              Book Farmer Consultation
            </WatermelonButton>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="dark" className="p-6 space-y-3">
            <div className="text-emerald-400 font-bold text-lg">60% Govt Subsidy</div>
            <div className="text-3xl font-black text-white">Only 10% Share</div>
            <p className="text-xs text-slate-300">Farmers invest only 10% margin money, with 60% Govt subsidy and 30% low-interest bank loan.</p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-3">
            <div className="text-amber-400 font-bold text-lg">Zero Diesel Expense</div>
            <div className="text-3xl font-black text-white">₹50k/yr Saved</div>
            <p className="text-xs text-slate-300">Save ₹35,000 to ₹65,000 annually by eliminating erratic and expensive diesel pump fueling.</p>
          </GlassCard>

          <GlassCard variant="dark" className="p-6 space-y-3">
            <div className="text-cyan-400 font-bold text-lg">Reliable Daytime Sun</div>
            <div className="text-3xl font-black text-white">Full Daylight</div>
            <p className="text-xs text-slate-300">No midnight trips to far-off fields during dangerous snake-prone hours. Irrigate in safe sunshine.</p>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
};
