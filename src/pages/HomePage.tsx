import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, Sparkles, ShieldCheck, Zap, Calculator, ArrowRight, 
  CheckCircle2, Building2, Factory, Sprout, Home, Phone, Star 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';
import { PROJECTS_DATA } from '@/data/projectsData';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2">
            <AnimatedBadge variant="emerald" pulseDot={true}>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Authorized Waaree Channel Partner • 10+ Years EPC Excellence</span>
              </span>
            </AnimatedBadge>
          </div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto"
          >
            Power Your Future With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-mint-300 to-[#FF5364]">
              Smart Solar Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Slash electricity bills by up to 90% with precision turnkey rooftop solar engineering. Avail PM Surya Ghar direct subsidy up to <strong className="text-emerald-400 font-semibold">₹78,000</strong> with 100% DISCOM net-metering approval.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <WatermelonButton 
              to="/solar-calculator" 
              variant="primary" 
              size="lg" 
              glow={true}
              icon={<Calculator className="w-5 h-5" />}
            >
              Calculate Solar Savings
            </WatermelonButton>

            <WatermelonButton 
              to="/pm-surya-ghar-yojana" 
              variant="secondary" 
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              PM Surya Ghar ₹78k Subsidy
            </WatermelonButton>
          </motion.div>

          {/* Key Metrics / Highlights Ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto text-left"
          >
            <GlassCard variant="dark" className="p-5 border-emerald-500/20">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">{COMPANY_DATA.stats.totalCapacityMW}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Total Solar Installed</div>
            </GlassCard>

            <GlassCard variant="dark" className="p-5 border-amber-500/20">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">{COMPANY_DATA.stats.completedInstallations}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Successful Installations</div>
            </GlassCard>

            <GlassCard variant="dark" className="p-5 border-rose-500/20">
              <div className="text-3xl sm:text-4xl font-black text-rose-400">{COMPANY_DATA.stats.cumulativeSavingsINR}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Client Electricity Savings</div>
            </GlassCard>

            <GlassCard variant="dark" className="p-5 border-cyan-500/20">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400">{COMPANY_DATA.stats.discomApprovalRate}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">DISCOM Net-Meter SLA</div>
            </GlassCard>
          </motion.div>

        </div>
      </section>

      {/* 2. FOUR SECTOR PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#091322]/50 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="Tailored Solar Engineering"
            title="Solar Solutions for Every Energy Need"
            highlightText="Every Energy Need"
            description="From residential villas in Hyderabad to MW-scale industrial plants and agriculture pumps in rural AP."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Residential */}
            <GlassCard variant="interactive" glowColor="emerald" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Residential Solar</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  On-grid, off-grid and hybrid setups with PM Surya Ghar ₹78,000 direct bank transfer subsidy.
                </p>
              </div>
              <Link to="/residential-solar" className="text-xs font-bold text-emerald-400 flex items-center gap-1 hover:underline">
                <span>Explore Residential</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </GlassCard>

            {/* Commercial */}
            <GlassCard variant="interactive" glowColor="amber" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Commercial Solar</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Cut high commercial tariffs by 80-90% and claim 40% accelerated tax depreciation with 2.5-3 yr payback.
                </p>
              </div>
              <Link to="/commercial-solar" className="text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline">
                <span>Explore Commercial</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </GlassCard>

            {/* Industrial */}
            <GlassCard variant="interactive" glowColor="coral" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Industrial Solar (MW)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  MW-scale captive solar plants, 11kV/33kV HT sync, SCADA monitoring, and DG-solar synchronization.
                </p>
              </div>
              <Link to="/industrial-solar" className="text-xs font-bold text-rose-400 flex items-center gap-1 hover:underline">
                <span>Explore Industrial</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </GlassCard>

            {/* Agriculture */}
            <GlassCard variant="interactive" glowColor="cyan" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Agriculture Pumps</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  3HP to 20HP solar water pumps with 60% PM KUSUM government subsidy for reliable daytime irrigation.
                </p>
              </div>
              <Link to="/agriculture-solar" className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline">
                <span>Explore Agriculture</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionHeader 
            badge="Proven Track Record"
            title="Landmark Solar Projects Across Telangana & AP"
            highlightText="Landmark Solar Projects"
            description="Explore our flagship installations with verified kWh generation and commercial ROI."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS_DATA.slice(0, 3).map((project) => (
              <GlassCard key={project.id} variant="dark" className="overflow-hidden p-0 border-white/10 flex flex-col">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold">{project.sector}</span>
                      <span className="text-slate-400">{project.systemCapacity}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">{project.title}</h4>
                    <p className="text-xs text-slate-400">{project.location}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-400">Annual Savings</div>
                      <div className="font-bold text-emerald-400">₹{(project.annualSavingsINR / 100000).toFixed(1)} Lakhs/yr</div>
                    </div>
                    <Link to="/projects" className="font-bold text-slate-200 hover:text-white flex items-center gap-1">
                      <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center pt-4">
            <WatermelonButton to="/projects" variant="glass" size="md">
              View All 9 Landmark Case Studies
            </WatermelonButton>
          </div>
        </div>
      </section>

    </PageTransition>
  );
};
