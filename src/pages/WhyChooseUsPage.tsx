import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Clock, ArrowRight, Zap, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';

export const WhyChooseUsPage: React.FC = () => {
  const reasons = [
    {
      title: '100% DISCOM Approval Rate',
      desc: 'Seamless net-metering liaison with TSSPDCL, TSNPDCL, APEPDCL, and APSPDCL with zero application rejections.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
    {
      title: 'Authorized Waaree Energies Partner',
      desc: 'Deploying exclusively Tier-1 ALMM List-I modules with certified 30-year linear performance warranty.',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      title: '30-Year Performance Assurance',
      desc: 'Guaranteed >80% power generation at Year 30 with dedicated bi-monthly maintenance checkups.',
      icon: CheckCircle2,
      color: 'text-cyan-400',
    },
    {
      title: '48-Hour Service SLA',
      desc: 'Rapid on-site diagnostic resolution SLA across Telangana & AP with local engineer presence.',
      icon: Clock,
      color: 'text-rose-400',
    },
  ];

  return (
    <PageTransition>
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Why Choose Us</span>
          </nav>

          <AnimatedBadge variant="emerald" pulseDot={true}>
            <span>Engineering Excellence &amp; Uncompromised Quality</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Why 1,500+ Customers Trust{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Varna Solar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            From tier-1 structural integrity to guaranteed national portal subsidy credit, discover what makes Varna Solar the most trusted EPC partner.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <GlassCard key={idx} variant="interactive" className="p-8 space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${reason.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{reason.desc}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="text-center pt-16">
          <WatermelonButton to="/solar-calculator" variant="primary" size="lg" glow={true} icon={<Calculator className="w-5 h-5" />}>
            Calculate Your Solar ROI Now
          </WatermelonButton>
        </div>
      </section>
    </PageTransition>
  );
};
