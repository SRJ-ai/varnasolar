import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Cpu, HandCoins, Layers, ShieldCheck, Users, Wrench, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    n: '01',
    icon: Cpu,
    title: 'Tier-1 Technology',
    stat: 'ALMM List-I · 30-year warranty',
    copy: 'Authorized Waaree Energies Channel Partner — Mono PERC & bifacial TOPCon, ALMM List-I certified modules with 30-year linear performance warranty and <0.55% annual degradation.',
  },
  {
    n: '02',
    icon: HandCoins,
    title: 'Loan & Subsidy Assistance',
    stat: '₹78,000 DBT · End-to-end paperwork',
    copy: 'We own the paper chase: PM Surya Ghar (up to ₹78,000 DBT), PM KUSUM 60% agri subsidy, DISCOM liaison, sanction-load enhancement and low-interest priority-sector solar loans.',
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'Long-Term Warranty Assurance',
    stat: '30 yr modules · 5–10 yr inverter · AMC',
    copy: '25–30 year module linear warranty, 5–10 year inverter cover and comprehensive AMC options — periodic washing, string testing, health checks and 24/7 IoT SCADA monitoring.',
  },
  {
    n: '04',
    icon: Wrench,
    title: 'Precision EPC Engineering',
    stat: 'HT sync · 170 km/h wind · <1.2 Ω earthing',
    copy: 'In-house MNRE-empanelled engineers. Hot-dip galvanized structures certified for 170 km/h gusts, harmonic-filtered HT sync (11kV/33kV), chemical earthing and Type-1+2 SPD protection.',
  },
  {
    n: '05',
    icon: Users,
    title: 'Zero Middlemen Policy',
    stat: 'Factory pricing · Certified crews',
    copy: 'Direct Waaree supply chain — no trader markup, no subcontractor chain. Factory pricing, traceable serials and company-employed certified install crews on every site.',
  },
];

const impactNumbers = [
  { value: '15+ MW', label: 'Cumulative capacity', note: 'Rooftop + ground-mount commissioned' },
  { value: '1,500+', label: 'Installations completed', note: 'Homes, C&I and agri pumps across TS & AP' },
  { value: '25+', label: 'Certified engineers', note: 'In-house MNRE-empanelled design & site team' },
  { value: '₹720+ Cr', label: 'Group turnover', note: 'Raion Techno Group — parent engineering group' },
  { value: '₹78,000', label: 'Max subsidy unlocked', note: 'Per home via PM Surya Ghar DBT' },
  { value: '100%', label: 'DISCOM approval rate', note: 'TSSPDCL · TSNPDCL · APEPDCL · APSPDCL' },
];

const steps = [
  { n: '01', title: 'Free Consultation', desc: 'Energy audit and subsidy eligibility check for Surya Ghar / KUSUM.', sla: 'Same day' },
  { n: '02', title: 'Site Survey & Assessment', desc: 'Shadow analysis, roof structural check and sanction-load review.', sla: '24–48 hrs' },
  { n: '03', title: 'Customized Solar Design', desc: '3D layout, yield simulation (+22% optimised) and single-line diagram.', sla: '2–3 days' },
  { n: '04', title: 'Detailed Proposal & ROI', desc: 'Transparent capex, payback and subsidy-adjusted ROI sheet.', sla: '48 hrs' },
  { n: '05', title: 'Professional Installation', desc: 'Certified crews, galvanized structures and Type-1+2 SPD protection.', sla: '5–7 days' },
  { n: '06', title: 'Testing & Commissioning', desc: 'IV-curve, earthing and grid-sync tests with SCADA handover.', sla: '1–2 days' },
  { n: '07', title: 'Net Metering Approval', desc: 'We handle TSSPDCL / TSNPDCL / APEPDCL paperwork end-to-end.', sla: '7–14 days' },
  { n: '08', title: 'Subsidy & AMC Assistance', desc: 'DBT credit tracking and long-term AMC monitoring — we stay on.', sla: '15–30 days · ongoing' },
];

export const WhyChooseUsPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial pt-10 lg:pt-14 pb-10 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <img width="400" height="300" src={`\${import.meta.env.BASE_URL}images/varna-logo2.png`} alt="Varna Solar" className="h-7 w-auto object-contain" />
            <span className="label-mono text-ink-mute hidden sm:inline">Varna Solar — Authorized Waaree Partner</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.04 }}
            className="label-mono text-sun mb-4"
          >
            Why Varna Solar — Five pillars · One contract
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="headline-hero text-[clamp(2.8rem,8vw,7.5rem)] max-w-6xl"
          >
            Why clients
            <br />
            <span className="text-sun">choose us.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 mt-10"
          >
            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">
              From Waaree factory floor to your net-meter — one accountable EPC team, zero middlemen, and DISCOM approvals
              guaranteed.
            </p>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link to="/contact" className="btn-premium">
                Book Free Site Survey <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link to="/projects" className="btn-outline-premium">
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5 PILLARS — editorial index rows ═══ */}
      <section className="w-full hairline-t py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">The five pillars</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-4xl">
              Five reasons.
              <br />
              Zero <span className="text-sun">compromise.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft max-w-2xl leading-relaxed">
              Every Varna Solar project is built on these five non-negotiables — consistent across a 3 kW villa or a 1 MW
              industrial plant.
            </p>
          </div>

          <div className="border-t border-ink/12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease, delay: i * 0.06 }}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[72px_280px_1fr_48px] items-start md:items-center gap-x-6 gap-y-3 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2"
              >
                <span className="w-11 h-11 border border-ink/12 bg-paper-deep group-hover:bg-ink group-hover:border-ink group-hover:text-paper flex items-center justify-center transition-colors shrink-0 mt-0.5 md:mt-0">
                  <pillar.icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="label-mono text-sun leading-none">{pillar.n} — {pillar.stat}</span>
                  <h3 className="font-display font-black uppercase tracking-tight text-lg md:text-xl leading-tight group-hover:text-sun transition-colors">
                    {pillar.title}
                  </h3>
                </div>
                <p className="col-span-2 md:col-span-1 text-sm md:text-[15px] text-ink-soft leading-relaxed max-w-[60ch] mt-1 md:mt-0">
                  {pillar.copy}
                </p>
                <span className="hidden md:flex w-12 h-12 border border-ink/15 items-center justify-center justify-self-end group-hover:border-sun group-hover:bg-sun group-hover:text-paper transition-colors shrink-0">
                  <ArrowUpRight aria-hidden="true" className="w-5 h-5" strokeWidth={1.75} />
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8">
            {['Waaree Channel Partner', 'MNRE Empanelled', 'ALMM List-I Certified', 'TSSPDCL · TSNPDCL · APEPDCL · APSPDCL'].map((badge) => (
              <span key={badge} className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-3.5 py-2">
                <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMPACT IN NUMBERS ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.5rem)]">
              Proven <span className="text-sun">at scale.</span>
            </h2>
            <p className="label-mono text-ink-mute max-w-sm leading-relaxed">Audited outcomes · Raion Techno Group portfolio · Hyderabad HQ</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {impactNumbers.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="bg-paper-card border border-ink/12 p-6 md:p-7 flex flex-col gap-3"
              >
                <span className="font-display font-black uppercase tracking-tightest text-3xl md:text-4xl text-sun leading-none">{m.value}</span>
                <span className="label-mono text-ink">{m.label}</span>
                <span className="text-xs md:text-sm text-ink-soft leading-relaxed">{m.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8-STEP PROCESS ═══ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Our 8-step hassle-free process</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              From enquiry to <span className="text-sun">net-metering.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft max-w-2xl leading-relaxed">
              No running around — we own every step from subsidy sanction to AMC monitoring. One contract, one team, one
              throat to choke.
            </p>
          </div>

          <div className="border-t border-ink/12">
            {steps.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: idx * 0.04 }}
                className="grid grid-cols-[52px_1fr] md:grid-cols-[80px_320px_1fr_140px] gap-4 md:gap-8 py-7 md:py-8 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2 items-start"
              >
                <span className="label-mono text-sun pt-1">Step {step.n}</span>
                <span className="font-display font-black uppercase tracking-tight text-base md:text-lg leading-tight">{step.title}</span>
                <span className="col-start-2 md:col-start-3 text-sm text-ink-soft leading-relaxed">{step.desc}</span>
                <span className="hidden md:inline-flex label-mono text-ink-mute border border-ink/12 bg-paper-card px-3 py-1.5 self-start justify-self-end text-[10px]">
                  {step.sla}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn-premium">
              Start your project <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to="/solar-calculator" className="btn-outline-premium">
              Calculate savings
            </Link>
            <span className="label-mono text-ink-mute ml-2 hidden sm:inline">Free site assessment · Same-day response</span>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-10 md:py-14">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="label-mono text-sun">Compliance &amp; governance</p>
            <h3 className="font-display font-black uppercase tracking-tight text-xl md:text-2xl leading-tight">
              Registered. Compliant. <span className="text-sun">Audited.</span>
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xl">
              Varna Solar Pvt. Ltd. — CIN {COMPANY_DATA.cin} · TAN {COMPANY_DATA.tan} · Registrar of Companies, Ministry of
              Corporate Affairs. GST compliant billing with full statutory documentation.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-2.5">
            {[
              { icon: Award, label: 'Waaree Channel Partner' },
              { icon: Layers, label: 'ALMM List-I Modules' },
              { icon: Building2, label: 'Raion Techno Group' },
              { icon: Zap, label: 'IoT SCADA Monitoring' },
              { icon: ShieldCheck, label: 'MCA Verified · CIN & TAN' },
            ].map((item) => (
              <span key={item.label} className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper px-3.5 py-2">
                <item.icon className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-black uppercase tracking-tightest leading-[0.92] text-[clamp(1.9rem,4.2vw,3.25rem)]">
              Ready to own your <span className="text-sun">power?</span>
            </h2>
            <p className="text-sm md:text-base text-paper/60 leading-relaxed max-w-xl mt-4">
              Free site survey, DISCOM paperwork and subsidy filing — handled end-to-end. Talk to an engineer today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/contact" className="btn-premium !bg-sun !border-sun hover:!bg-paper hover:!border-paper hover:!text-ink">
              Get free survey <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link to="/about-us" className="btn-outline-premium !border-white/20 !text-paper hover:!bg-paper hover:!text-ink">
              About us <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
