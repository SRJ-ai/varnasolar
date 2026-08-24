import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  House,
  Factory,
  Sprout,
  Lightbulb,
  MonitorSmartphone,
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  Calculator,
  ShieldCheck,
  Wrench,
  HandCoins,
  Building2,
  Users,
} from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';
import { PROJECTS_DATA } from '@/data/projectsData';
import { useTranslation } from 'react-i18next';
import { useScroll, useTransform } from 'framer-motion';
import { InfiniteMarquee } from '@/components/common/InfiniteMarquee';
import { ImpactTicker } from '@/components/common/ImpactTicker';
import { Magnetic } from '@/components/common/Magnetic';


const ease = [0.16, 1, 0.3, 1] as const;

// ── Section 1: benefit pills
const benefitPills = [
  'PM Surya Ghar Subsidy up to \u20B978,000',
  'PM KUSUM Scheme Support',
  'Net Metering DISCOM Approvals',
  'Tier-1 Solar Modules',
];

// ── Section 3: Impact metrics
const impactMetrics = [
  {
    value: '₹720+ Cr',
    label: 'Annual Group Turnover',
    note: 'Raion Techno Group — parent engineering conglomerate',
  },
  {
    value: '25+',
    label: 'Certified Solar Engineers',
    note: 'In-house MNRE-empanelled design & site engineers',
  },
  {
    value: '1,500+',
    label: 'Solar Installations',
    note: 'Residential, C&I and rural pump deployments completed',
  },
  {
    value: '15+ MW',
    label: 'Cumulative Capacity',
    note: 'Industrial rooftop + ground-mount commissioned',
  },
];

// ── Section 4: What We Do
const services = [
  {
    icon: House,
    title: 'Solar Rooftop Solutions',
    desc: '90% electricity bill reduction for homes and villas with PM Surya Ghar subsidy paperwork fully handled.',
    href: '/residential-solar',
    badge: 'Residential',
  },
  {
    icon: Factory,
    title: 'Solar EPC — Design to Commissioning',
    desc: 'Turnkey EPC execution — feasibility, structure, procurement, install and DISCOM sync in one contract.',
    href: '/industrial-solar',
    badge: 'Turnkey EPC',
  },
  {
    icon: Sprout,
    title: 'Solar Pumping Systems',
    desc: 'PM KUSUM subsidised solar pumps replacing diesel for farms across Telangana & Andhra Pradesh.',
    href: '/agriculture-solar',
    badge: 'PM KUSUM',
  },
  {
    icon: Lightbulb,
    title: 'Solar Street Lighting',
    desc: 'Automatic dusk-to-dawn LED street lights with LiFePO₄ battery — 100% grid-free electrification.',
    href: '/projects',
    badge: 'Infrastructure',
  },
  {
    icon: MonitorSmartphone,
    title: 'Smart Monitoring & Grid Integration',
    desc: 'IoT generation tracking, SCADA telemetry and HT net-metering approvals — live on phone & cloud.',
    href: '/why-choose-us',
    badge: 'IoT / SCADA',
  },
];

// ── Section 5: Why Solar With Varna
const whyPillars = [
  { n: '01', title: 'Tier-1 Technology', desc: 'Waaree Mono PERC / bifacial TOPCon, ALMM List-I certified modules with 30-year linear warranty.' },
  { n: '02', title: 'Loan & Subsidy Assistance', desc: 'End-to-end PM Surya Ghar & PM KUSUM paperwork, DISCOM liaison and low-interest solar loans.' },
  { n: '03', title: 'Long-Term Warranty Assurance', desc: '25–30 yr module warranty, 5–10 yr inverter cover and comprehensive AMC options.' },
  { n: '04', title: 'Precision EPC Engineering', desc: 'Hot-dip galvanized structures, harmonic-filtered HT sync, and <1.2 Ω earthing — engineered for 170 km/h wind.' },
  { n: '05', title: 'Zero Middlemen Policy', desc: 'Direct Waaree channel partner — factory pricing, certified install crews, no subcontractor chain.' },
];

const whyBadges = ['100% DISCOM Compliant', 'MNRE Approved Channel Partner', '25-Year Performance Warranty'];

// ── Section 6: Govt Schemes
const schemes = [
  {
    code: 'PM-KUSUM',
    title: 'PM-KUSUM — Solar for Agriculture',
    desc: 'Component-B & C: 60% subsidy on standalone solar pumps and solarisation of grid-connected ag feeders. Diesel-free irrigation for every acre.',
    href: '/pm-kusum-scheme',
  },
  {
    code: 'PM SURYA GHAR',
    title: 'PM Surya Ghar: Muft Bijli Yojana',
    desc: 'Up to \u20B978,000 central subsidy for 1–3 kW residential rooftop systems. Free electricity up to 300 units/month + net-metering credits.',
    href: '/pm-surya-ghar-yojana',
  },
  {
    code: 'CENTRAL + STATE',
    title: 'Other Central & State Subsidy Programs',
    desc: 'TGREDCO / APGENCO top-ups, MSME capital subsidy, 40% accelerated depreciation and open-access policy for C&I consumers.',
    href: '/pm-surya-ghar-yojana',
  },
];

// ── Section 8: 8 Steps
const steps = [
  { n: '01', title: 'Free Consultation', desc: 'Energy audit and eligibility check for PM Surya Ghar / KUSUM subsidy.' },
  { n: '02', title: 'Site Survey & Assessment', desc: 'Shadow analysis, roof structural check and DISCOM sanction-load review.' },
  { n: '03', title: 'Customized Solar Design', desc: '3D layout, yield simulation (+22% optimised) and single-line diagram.' },
  { n: '04', title: 'Detailed Proposal & ROI', desc: 'Transparent capex, payback and subsidy-adjusted ROI sheet.' },
  { n: '05', title: 'Professional Installation', desc: 'Certified crews, galvanized structures and Type-1+2 SPD protection.' },
  { n: '06', title: 'Testing & Commissioning', desc: 'IV-curve, earthing and grid-sync tests with SCADA handover.' },
  { n: '07', title: 'Net Metering Approval', desc: 'We handle TSSPDCL / TSNPDCL / APEPDCL paperwork end-to-end.' },
  { n: '08', title: 'Subsidy & AMC Assistance', desc: 'Direct subsidy credit tracking and long-term AMC monitoring.' },
];

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Parallax for Hero Image
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 1000], [0, 250]);
  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured).slice(0, 3);
  const hq = COMPANY_DATA.branches.find((b) => b.isHQ);
  const regionalBranches = COMPANY_DATA.branches.filter((b) => !b.isHQ);
  const leaders = COMPANY_DATA.leadership.slice(0, 2);

  return (
    <PageTransition>
      {/* ═══════════════════ 1 — HERO ═══════════════════ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-0 pb-8">
          {/* Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="label-mono text-sun mb-5"
              >
                {t('hero.prehead')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
                className="headline-hero text-[clamp(3rem,7.5vw,6.5rem)]"
              >
                {t('hero.headline').replace('.', '')}
                <span className="text-sun">.</span>
              </motion.h1>
            </div>

            {/* Benefit pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.18 }}
              className="flex flex-wrap gap-2.5"
            >
              {benefitPills.map((pill) => (
                <span
                  key={pill}
                  className="label-mono border border-ink/15 bg-paper px-3.5 py-2.5 leading-none text-ink-soft"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.24 }}
              className="flex flex-col gap-4"
            >
              <p className="text-base md:text-lg text-ink-soft leading-[1.7] max-w-2xl">
                {t('hero.subhead')}
              </p>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Magnetic intensity={0.4}>
                  <Link to="/solar-calculator" className="btn-outline-premium block">
                    {t('hero.btnCalculate')}
                  </Link>
                </Magnetic>
                <Magnetic intensity={0.4}>
                  <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium block">
                    {t('hero.btnSurvey')} <ArrowRight aria-hidden="true" className="w-4 h-4 inline-block" strokeWidth={2} />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15"
          >
            <motion.img 
              style={{ y: heroImgY, scale: 1.15 }}
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?fm=webp&fit=crop&w=800&q=60"
              srcSet="https://images.unsplash.com/photo-1509391366360-2e959784a276?fm=webp&fit=crop&w=600&q=60 600w, https://images.unsplash.com/photo-1509391366360-2e959784a276?fm=webp&fit=crop&w=1200&q=80 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Rooftop solar array at golden hour"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Tier-1 bifacial modules</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">Waaree Partner</span>
            </div>
          </motion.div>
        </div>

        {/* Stat strip — preserved */}
        <div className="hairline-y">
          <div className="container-editorial grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 py-0">
            {[
              { value: '15.2 GWh+', label: 'Clean energy generated' },
              { value: '₹78,000', label: 'Max subsidy per home' },
              { value: '25 Years', label: 'Performance warranty' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                className="py-6 sm:px-8 first:pl-0 flex items-baseline gap-4"
              >
                <span className="font-display font-black uppercase tracking-tightest text-2xl md:text-4xl">{stat.value}</span>
                <span className="text-xs text-ink-mute max-w-[10ch] leading-snug">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InfiniteMarquee />

      {/* ═══════════════════ 2 — TRUSTED BY ═══════════════════ */}
      <section className="w-full bg-paper-deep hairline-b py-12 md:py-16 overflow-hidden">
        <div className="container-editorial mb-8">
          <p className="label-mono text-ink-mute">Trusted by leading organisations</p>
          <h2 className="font-display font-bold uppercase tracking-tight text-xl md:text-2xl mt-3 max-w-3xl leading-tight">
            Partners across industry, infrastructure and public sector projects.
          </h2>
        </div>
        {/* Logowall — marquee */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-4 pr-4">
                {COMPANY_DATA.clientLogos.map((client) => (
                  <div
                    key={`${dup}-${client.id}`}
                    className="shrink-0 w-[176px] h-[84px] bg-paper-card border border-ink/10 flex items-center justify-center px-4 py-3"
                    title={client.name}
                  >
                    {client.logoUrl ? (
                      <img width="140" height="40"
                        src={`https://wsrv.nl/?url=${encodeURIComponent(client.logoUrl.replace(/^https?:\/\//, ''))}&w=140&output=webp&q=60`}
                        alt={client.name}
                        loading="lazy"
                        className="max-h-10 max-w-[140px] w-auto h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <span
                      style={{ display: client.logoUrl ? 'none' : 'block' }}
                      className="font-display font-black uppercase tracking-tight text-xs text-ink-soft text-center leading-tight"
                    >
                      {client.logoPlaceholderText}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="container-editorial mt-6">
          <p className="label-mono text-ink-mute">30 partners — NTPC · BHEL · GMR · ITC · AAI · Indian Railways · TGGENCO and more</p>
        </div>
      </section>

      {/* ═══════════════════ 3 — IMPACT IN NUMBERS ═══════════════════ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)]">
              Our impact in <span className="text-sun">numbers.</span>
            </h2>
            <p className="label-mono text-ink-mute max-w-sm leading-relaxed">
              Engineering outcomes audited across the Raion Techno Group portfolio
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <ImpactTicker target={720} label="Annual Group Turnover" prefix="₹" suffix=" Cr+" />
            <ImpactTicker target={25} label="Certified Solar Engineers" suffix="+" />
            <ImpactTicker target={1500} label="Solar Installations" suffix="+" />
            <ImpactTicker target={15} label="Cumulative Capacity" suffix=" MW+" decimals={1} />
          </div>
        </div>
      </section>



      {/* ═══════════════════ 4 — WHAT WE DO ═══════════════════ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">What we do</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              End-to-end solar <span className="text-sun">engineering.</span>
            </h2>
            <p className="text-base md:text-lg text-ink-soft max-w-2xl leading-relaxed">
              From rooftop to ground-mount — feasibility, subsidy, EPC and lifetime monitoring in one contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="group bg-paper-card border border-ink/12 p-6 md:p-8 flex flex-col gap-5 hover:bg-white dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 border border-ink/12 bg-paper-deep flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-ink" strokeWidth={1.75} />
                  </span>
                  <span className="label-mono text-ink-mute bg-paper-deep border border-ink/10 px-2.5 py-1">{s.badge}</span>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-display font-black uppercase tracking-tight text-lg leading-tight">{s.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
                <Link
                  to={s.href}
                  className="label-mono inline-flex items-center gap-1.5 text-ink hover:text-sun transition-colors mt-1"
                  aria-label={`Learn more about ${s.title}`}
                >
                  Learn More <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5 — WHY SOLAR WITH VARNA ═══════════════════ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Why solar with Varna</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              Five reasons owners choose <span className="text-sun">us.</span>
            </h2>
          </div>

          <div className="border-t border-ink/12">
            {whyPillars.map((pillar, i) => (
              <motion.div
                key={pillar.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="grid grid-cols-[52px_1fr] md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-8 py-7 md:py-8 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2"
              >
                <span className="label-mono text-sun pt-1">{pillar.n}</span>
                <span className="font-display font-black uppercase tracking-tight text-base md:text-xl leading-tight">
                  {pillar.title}
                </span>
                <span className="col-start-2 md:col-start-3 text-sm text-ink-soft leading-relaxed">{pillar.desc}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8">
            {whyBadges.map((badge) => (
              <span key={badge} className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-3.5 py-2">
                <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={2} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6 — GOVERNMENT SCHEMES ═══════════════════ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10">
            <p className="label-mono text-sun">Government schemes</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              Subsidies we unlock for <span className="text-sun">you.</span>
            </h2>
          </div>

          <div className="border-t border-ink/12">
            {schemes.map((scheme, i) => (
              <motion.div
                key={scheme.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              >
                <Link
                  to={scheme.href}
                  className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 py-7 md:py-8 border-b border-ink/12 hover:bg-white dark:hover:bg-white/5 transition-colors px-2 -mx-2 items-start"
                >
                  <span className="label-mono text-sun shrink-0 pt-0.5">{scheme.code}</span>
                  <div className="flex flex-col gap-2">
                    <span className="font-display font-black uppercase tracking-tight text-base md:text-lg leading-tight group-hover:text-sun transition-colors">
                      {scheme.title}
                    </span>
                    <span className="text-sm text-ink-soft leading-relaxed max-w-2xl">{scheme.desc}</span>
                  </div>
                  <span className="label-mono inline-flex items-center gap-1.5 text-ink-soft group-hover:text-sun transition-colors md:justify-self-end">
                    Explore <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7 — INSTANT SOLAR ESTIMATOR ═══════════════════ */}
      <section className="w-full bg-sun-tint hairline-y">
        <div className="container-editorial py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <p className="label-mono text-ink-mute">Instant solar estimator</p>
            <h2 className="font-display font-black uppercase tracking-tight text-xl md:text-3xl leading-tight">
              Want to know how much you can save with Solar?
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-xl">
              Get system size, subsidy and payback in under 30 seconds — tailored to your bill and roof.
            </p>
          </div>
          <Link to="/solar-calculator" className="btn-premium shrink-0">
            <Calculator aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
            Launch Solar Calculator
          </Link>
        </div>
      </section>

      {/* ═══════════════════ 8 — 8-STEP PROCESS ═══════════════════ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Our 8-step hassle-free process</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              From enquiry to <span className="text-sun">net-metering.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft max-w-2xl leading-relaxed">
              No running around — we own every step from subsidy sanction to AMC monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="bg-paper-card border border-ink/12 p-6 md:p-7 flex flex-col gap-3 relative overflow-hidden"
              >
                <span className="label-mono text-sun">Step {step.n}</span>
                <h3 className="font-display font-black uppercase tracking-tight text-sm md:text-[15px] leading-tight">{step.title}</h3>
                <p className="text-xs md:text-sm text-ink-soft leading-relaxed">{step.desc}</p>
                <span className="absolute top-0 right-0 font-display font-black text-5xl leading-none text-ink/[0.04] select-none pointer-events-none p-3">
                  {step.n}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 9 — ABOUT VARNA SOLAR PREVIEW ═══════════════════ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="label-mono text-sun">About Varna Solar</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.5rem)]">
              Built inside a 720 Cr <span className="text-sun">group.</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="label-mono border border-ink/15 bg-paper px-3 py-1.5 text-ink-mute">CIN: {COMPANY_DATA.cin}</span>
              <span className="label-mono border border-ink/15 bg-paper px-3 py-1.5 text-ink-mute">TAN: {COMPANY_DATA.tan}</span>
            </div>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed">
              Varna Solar Pvt. Ltd. is the dedicated solar EPC arm of <strong className="text-ink font-semibold">Raion Techno Group</strong> — a
              diversified engineering group with interests spanning infrastructure, power and industrial services. Established in 2014 and
              incorporated as a private limited company in 2025, Varna executes rooftop, commercial, industrial and agricultural solar
              across Telangana &amp; Andhra Pradesh as an authorised Waaree Energies channel partner.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['MNRE compliant', 'End-to-end subsidy', 'Rooftop · Commercial · Industrial'].map((pill) => (
                <span key={pill} className="label-mono border border-ink/12 bg-paper px-3 py-2 text-ink-soft">
                  {pill}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { v: '1,500+', k: 'Projects delivered' },
                { v: '15+ MW', k: 'Commissioned' },
                { v: '98%', k: 'Customer satisfaction' },
              ].map((stat) => (
                <div key={stat.k} className="border border-ink/12 bg-paper p-4">
                  <span className="font-display font-black uppercase tracking-tight text-lg md:text-xl leading-none block">{stat.v}</span>
                  <span className="label-mono text-ink-mute mt-2 block text-[10px]">{stat.k}</span>
                </div>
              ))}
            </div>
            <Link to="/about-us" className="btn-outline-premium self-start mt-2">
              More about us <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[4/3.6] overflow-hidden border border-ink/15 bg-ink">
            <img width="400" height="300"
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?fm=webp&fit=crop&w=800&q=60"
              srcSet="https://images.unsplash.com/photo-1466611653911-95081537e5b7?fm=webp&fit=crop&w=600&q=60 600w, https://images.unsplash.com/photo-1466611653911-95081537e5b7?fm=webp&fit=crop&w=1200&q=80 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Varna Solar engineering team"
              loading="lazy"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Engineering HQ — Hyderabad</span>
              <BadgeCheck aria-hidden="true" className="w-5 h-5 text-sun" strokeWidth={1.75} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 10 — EXECUTIVE LEADERSHIP ═══════════════════ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Executive leadership</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.5rem)]">
              Led by <span className="text-sun">engineers.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.din}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="bg-paper-card border border-ink/12 p-6 md:p-8 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-black uppercase tracking-tight text-base md:text-lg leading-tight">{leader.name}</h3>
                  <p className="text-xs md:text-sm text-ink-soft leading-relaxed">{leader.role}</p>
                  <span className="label-mono border border-ink/12 bg-paper px-2.5 py-1 self-start text-ink-mute">
                    DIN {leader.altDin ?? leader.din}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{leader.bio}</p>
                <p className="label-mono text-ink-mute">{leader.qualifications}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 11 — PROJECTS & SOLUTIONS ═══════════════════ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div className="flex flex-col gap-3">
              <p className="label-mono text-sun">Projects &amp; solutions</p>
              <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.5rem)]">
                Featured <span className="text-sun">projects.</span>
              </h2>
            </div>
            <Link to="/projects" className="btn-outline-premium shrink-0">
              View all projects <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              >
                <Link to="/projects" className="group block bg-paper-card border border-ink/12 overflow-hidden hover:bg-white dark:hover:bg-white/5 transition-colors">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/12">
                    <img width="400" height="300"
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 label-mono bg-paper border border-ink/12 px-2.5 py-1 text-ink-soft">
                      {project.sector}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-3">
                    <h3 className="font-display font-black uppercase tracking-tight text-sm md:text-base leading-tight line-clamp-2 group-hover:text-sun transition-colors">
                      {project.title}
                    </h3>
                    <span className="label-mono text-sun">{project.systemCapacity}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink-mute leading-relaxed">
                      <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                      {project.location}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Also surface the classic Sathupalli / Mahbubnagar / Assam narrative */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              '300 Pumps — Sathupalli (Khammam)',
              '100 kW — Mahbubnagar Tech Park',
              '300 Units — Assam Street Lighting',
            ].map((tag) => (
              <span key={tag} className="label-mono border border-ink/12 bg-paper px-3 py-2 text-ink-mute">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 12 — REGIONAL FOOTPRINT ═══════════════════ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Regional footprint</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.5rem)]">
              Headquarters &amp; branch <span className="text-sun">network.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft max-w-2xl leading-relaxed">
              Five offices across Telangana &amp; Andhra Pradesh — DISCOM-coordinated execution wherever you are.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
            {/* HQ — spans 5 */}
            {hq && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease }}
                className="lg:col-span-5 bg-ink text-paper p-6 md:p-8 flex flex-col gap-5 border border-ink"
              >
                <div className="flex items-center gap-3">
                  <span className="label-mono bg-sun text-paper px-2.5 py-1">HQ · TS</span>
                  <span className="font-display font-black uppercase tracking-tight text-lg">Hyderabad</span>
                </div>
                <p className="text-sm text-paper/75 leading-relaxed">{hq.address}</p>
                <p className="label-mono text-paper/40">{hq.landmark}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="label-mono inline-flex items-center gap-1.5 bg-paper text-ink px-4 py-2.5 hover:bg-sun hover:text-paper transition-colors">
                    <Phone aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} />
                    {COMPANY_DATA.contact.primaryPhone}
                  </a>
                </div>
              </motion.div>
            )}

            {/* Branches — spans 7 */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {regionalBranches.map((branch, i) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                  className="bg-paper-card border border-ink/12 p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Building2 aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
                    <span className="font-display font-black uppercase tracking-tight text-sm">{branch.city}</span>
                    <span className="label-mono text-ink-mute ml-auto text-[10px] border border-ink/10 px-2 py-0.5">
                      {branch.state === 'Telangana' ? 'TS' : 'AP'}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-ink-soft leading-relaxed line-clamp-3">{branch.address}</p>
                  <p className="label-mono text-ink-mute text-[10px] leading-relaxed">{branch.landmark}</p>
                  <span className="label-mono text-ink-soft inline-flex items-center gap-1.5 mt-1">
                    <Users aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} />
                    {branch.workingHours}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors">
              <Phone aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} />
              Helpline {COMPANY_DATA.contact.primaryPhone}
            </a>
            <Link to="/contact" className="label-mono inline-flex items-center gap-1.5 border border-ink/15 px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors">
              Get Directions <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>



      {/* ═══════════════════ 13 — GET IN TOUCH PREVIEW ═══════════════════ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <p className="label-mono bg-sun text-paper px-2.5 py-1 self-start">Get in touch</p>
            <h2 className="font-display font-black uppercase tracking-tightest leading-[0.92] text-[clamp(1.9rem,4.2vw,3.25rem)]">
              <span className="bg-sun text-paper px-3 py-1.5 leading-none inline box-decoration-clone">READY TO DISCUSS YOUR<br />ROOFTOP SOLAR</span>
            </h2>
            <p className="text-sm md:text-base text-paper/60 leading-relaxed max-w-xl">
              Free site assessment, DISCOM net-metering and subsidy paperwork — handled end-to-end. Talk to an engineer today.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5 bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="inline-flex items-center gap-3 text-sm hover:text-sun transition-colors">
              <span className="w-9 h-9 border border-white/15 flex items-center justify-center shrink-0">
                <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <span className="font-display font-bold tracking-tight">{COMPANY_DATA.contact.primaryPhone}</span>
            </a>
            <a href={`mailto:${COMPANY_DATA.contact.infoEmail}`} className="inline-flex items-center gap-3 text-sm hover:text-sun transition-colors break-all">
              <span className="w-9 h-9 border border-white/15 flex items-center justify-center shrink-0">
                <Mail aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
              </span>
              {COMPANY_DATA.contact.infoEmail}
            </a>
            {hq && (
              <span className="inline-flex items-start gap-3 text-sm text-paper/60 leading-relaxed">
                <span className="w-9 h-9 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span>{hq.address}</span>
              </span>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className="btn-premium !bg-sun !border-sun hover:!bg-paper hover:!text-ink">
                Contact us <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link to="/contact" className="btn-outline-premium !border-white/20 !text-paper hover:!bg-paper hover:!text-ink">
                Get free survey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle bottom marquee — keeps previous editorial rhythm */}
      <section aria-hidden="true" className="w-full overflow-hidden hairline-t py-4 select-none bg-paper">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {['Residential', 'Commercial', 'Industrial', 'Agriculture', 'Turnkey EPC'].map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="font-display font-black uppercase tracking-tightest text-2xl md:text-3xl text-ink/15 mx-5 whitespace-nowrap"
                >
                  {word} <span className="text-sun/40">*</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;
