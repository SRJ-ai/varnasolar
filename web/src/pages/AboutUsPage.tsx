import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

// 5 WHY pillars — reused from HomePage whyPillars for consistency
const whyPillars = [
  { n: '01', title: 'Tier-1 Technology', desc: 'Waaree Mono PERC / bifacial TOPCon, ALMM List-I certified modules with 30-year linear warranty.' },
  { n: '02', title: 'Loan & Subsidy Assistance', desc: 'End-to-end PM Surya Ghar & PM KUSUM paperwork, DISCOM liaison and low-interest solar loans.' },
  { n: '03', title: 'Long-Term Warranty Assurance', desc: '25–30 yr module warranty, 5–10 yr inverter cover and comprehensive AMC options.' },
  { n: '04', title: 'Precision EPC Engineering', desc: 'Hot-dip galvanized structures, harmonic-filtered HT sync, and <1.2 Ω earthing — built for 170 km/h wind.' },
  { n: '05', title: 'Zero Middlemen Policy', desc: 'Direct Waaree channel partner — factory pricing, certified install crews, no subcontractor chain.' },
];

const trustPills = ['MNRE compliant', 'End-to-end subsidy', 'Rooftop · Commercial · Industrial'];

const metrics = [
  { value: '1,500+', label: 'Projects delivered', sub: 'Rooftop, C&I & agri pumps commissioned' },
  { value: '15+ MW', label: 'Cumulative capacity', sub: 'Rooftop + ground-mount executed' },
  { value: '98%', label: 'Customer satisfaction', sub: 'Verified service feedback across TS & AP' },
  { value: '₹720+ Cr', label: 'Group turnover', sub: 'Raion Techno Group — parent engineering group' },
];

export const AboutUsPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end pt-10 lg:pt-14 pb-10 lg:pb-12">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <img width="400" height="300" src="/images/varna-logo2.png" alt="Varna Solar" className="h-8 w-auto object-contain" />
                <span className="label-mono text-ink-mute hidden sm:inline">Varna Solar Pvt. Ltd. — Est. Hyderabad</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.04 }}
                className="label-mono text-sun mb-4"
              >
                About Varna Solar
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
                className="headline-hero text-[clamp(2.6rem,6vw,5.2rem)] text-wrap-balance leading-[0.92] overflow-visible pb-2"
              >
                Trusted rooftop
                <br />
                solar partner
                <br />
                <span className="text-sun">for homes</span> &amp; businesses.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.18 }}
              className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl"
            >
              Varna Solar Pvt. Ltd. is the dedicated solar EPC arm of{' '}
              <strong className="text-ink font-semibold">Raion Techno Group</strong> — a next-generation engineering
              conglomerate delivering turnkey infrastructure across power, industrial services and renewable energy. As an
              Authorized Waaree Energies Channel Partner, we engineer rooftop, commercial, industrial and agricultural solar
              end-to-end — feasibility, subsidy, EPC and lifetime monitoring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.22 }}
              className="flex flex-wrap gap-2.5"
            >
              {trustPills.map((pill) => (
                <span key={pill} className="label-mono border border-ink/15 bg-paper px-3.5 py-2.5 leading-none text-ink-soft">
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.26 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link to="/contact" className="btn-premium">
                Talk to our team <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link to="/why-choose-us" className="btn-outline-premium">
                Why choose us
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15 bg-paper-deep"
          >
            <img width="400" height="300"
              src="https://www.varnasolar.com/images/projects/HYDERABAD.jpg"
              alt="Varna Solar rooftop installation in Hyderabad"
              className="w-full h-full object-cover"
              fetchPriority="high"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Telangana &amp; Andhra Pradesh</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">Waaree Partner</span>
            </div>
          </motion.div>
        </div>

        {/* CIN / TAN — clean verified bar */}
        <div className="hairline-y bg-paper">
          <div className="container-editorial grid grid-cols-1 sm:grid-cols-2">
            <div className="flex items-start gap-4 py-6 sm:pr-10">
              <span className="w-10 h-10 border border-ink/12 bg-paper flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <span className="label-mono text-sun block">CIN — RoC, Ministry of Corporate Affairs</span>
                <span className="font-mono font-bold text-[15px] md:text-[17px] tracking-tight block mt-1.5 break-all">{COMPANY_DATA.cin}</span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-6 sm:pl-10 border-t sm:border-t-0 sm:border-l border-ink/10">
              <span className="w-10 h-10 border border-ink/12 bg-paper flex items-center justify-center shrink-0 mt-0.5">
                <BadgeCheck aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <span className="label-mono text-sun block">TAN — Income Tax · GST compliant billing</span>
                <span className="font-mono font-bold text-[15px] md:text-[17px] tracking-tight block mt-1.5">{COMPANY_DATA.tan}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STORY — RAION TECHNO GROUP ═══ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="label-mono text-sun">Who we are</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)]">
              Engineering first.
              <br />
              <span className="text-sun">Always.</span>
            </h2>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl">
              Born inside the <strong className="text-ink font-semibold">Raion Techno Group</strong> — a diversified
              next-gen EPC powerhouse — Varna Solar brings institutional rigor to every rooftop. Established in 2014 and
              incorporated as a private limited company in 2025, we execute residential, commercial, industrial and
              agricultural solar across Telangana &amp; Andhra Pradesh.
            </p>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-xl">
              Every build is engineered in-house: shadow-aware design, TSSPDCL / TSNPDCL / APEPDCL net-metering approvals,
              hot-dip galvanized structures, chemical earthing and IoT monitoring — no subcontractor chain, no loose ends.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="border border-ink/12 bg-paper-card p-4">
                <span className="label-mono text-sun block mb-1">Established</span>
                <span className="font-display font-black uppercase tracking-tight text-lg">2014</span>
                <span className="text-xs text-ink-mute leading-relaxed block mt-1">Operational since 2014, Pvt. Ltd. incorporated 2025</span>
              </div>
              <div className="border border-ink/12 bg-paper-card p-4">
                <span className="label-mono text-sun block mb-1">Parent</span>
                <span className="font-display font-black uppercase tracking-tight text-lg">Raion Techno Group</span>
                <span className="text-xs text-ink-mute leading-relaxed block mt-1">₹720+ Cr group turnover</span>
              </div>
              <div className="border border-ink/12 bg-paper-card p-4">
                <span className="label-mono text-sun block mb-1">Partner</span>
                <span className="font-display font-black uppercase tracking-tight text-lg">Waaree Energies</span>
                <span className="text-xs text-ink-mute leading-relaxed block mt-1">Authorized Channel Partner — ALMM List-I</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="lg:col-span-5 relative aspect-video lg:aspect-[4/3.6] overflow-hidden border border-ink/15 group bg-ink"
          >
            <video
              src="https://www.varnasolar.com/videos/Solar_panel_installation_on_rooftop_202608201046.mp4"
              className="w-full h-full object-cover opacity-95"
              controls
              playsInline
              preload="metadata"
              aria-label="Solar panel installation on rooftop — on-field engineering"
              poster="https://www.varnasolar.com/images/projects/HYDERABAD.jpg"
            >
              <track kind="captions" srcLang="en" label="English captions" />
            </video>
            <div className="absolute -bottom-px -right-px bg-sun px-6 py-4 pointer-events-none">
              <span className="font-display font-black uppercase tracking-tight text-sm text-paper">On-field excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-20">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="headline-section text-[clamp(1.8rem,4vw,3.25rem)]">
              Proven <span className="text-sun">at scale.</span>
            </h2>
            <p className="label-mono text-ink-mute max-w-sm leading-relaxed">Audited outcomes across Raion Techno Group · Hyderabad HQ</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="bg-paper-card border border-ink/12 p-6 md:p-7 flex flex-col gap-3"
              >
                <span className="font-display font-black uppercase tracking-tightest text-3xl md:text-4xl text-sun leading-none">{m.value}</span>
                <span className="label-mono text-ink">{m.label}</span>
                <span className="text-xs md:text-sm text-ink-soft leading-relaxed">{m.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXECUTIVE LEADERSHIP ═══ */}
      <section className="w-full py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Executive leadership</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              Led by <span className="text-sun">engineers.</span>
            </h2>
            <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-2xl">
              Verifiable MCA records · Director Identification Numbers published for transparency. Guided by technocrats with
              deep EPC and power-systems heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {COMPANY_DATA.leadership.map((director, idx) => (
              <motion.article
                key={director.din}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease, delay: idx * 0.08 }}
                className="bg-paper-card border border-ink/12 p-6 md:p-8 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-black uppercase tracking-tight text-base md:text-lg leading-tight">{director.name}</h3>
                  <p className="text-xs md:text-sm text-sun font-semibold leading-snug">{director.role}</p>
                  <span className="label-mono border border-ink/12 bg-paper px-2.5 py-1 self-start text-ink-mute">
                    DIN {director.altDin ?? director.din}
                    {director.altDin && director.din !== director.altDin ? ` · ${director.din}` : ''}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{director.bio}</p>
                <p className="label-mono text-ink-mute border-t border-ink/10 pt-4">
                  <span className="text-ink">Qualifications:</span> {director.qualifications}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 WHY PILLARS ═══ */}
      <section className="w-full bg-paper-deep hairline-y py-16 md:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-4 mb-10 md:mb-14">
            <p className="label-mono text-sun">Why owners choose us</p>
            <h2 className="headline-section text-[clamp(1.9rem,4.5vw,3.75rem)] max-w-3xl">
              Five reasons. <span className="text-sun">Zero compromise.</span>
            </h2>
          </div>

          <div className="border-t border-ink/12">
            {whyPillars.map((pillar, i) => (
              <motion.div
                key={pillar.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="grid grid-cols-[52px_1fr] md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-8 py-7 md:py-8 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2"
              >
                <span className="label-mono text-sun pt-1">{pillar.n}</span>
                <span className="font-display font-black uppercase tracking-tight text-base md:text-xl leading-tight">{pillar.title}</span>
                <span className="col-start-2 md:col-start-3 text-sm text-ink-soft leading-relaxed">{pillar.desc}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-8">
            {[
              '100% DISCOM Compliant',
              'MNRE Approved Channel Partner',
              '25-Year Performance Warranty',
            ].map((badge) => (
              <span key={badge} className="label-mono inline-flex items-center gap-1.5 border border-ink/15 bg-paper-card px-3.5 py-2">
                <BadgeCheck aria-hidden="true" className="w-3.5 h-3.5 text-sun" strokeWidth={1.75} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPLIANCE + FOOTPRINT ═══ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="headline-section text-[clamp(1.8rem,4vw,3.25rem)] !text-paper">
                Registered &amp; <span className="text-sun">compliant.</span>
              </h2>
              <p className="text-sm md:text-base text-paper/60 leading-relaxed max-w-xl mt-4">
                Incorporated with the Registrar of Companies, Ministry of Corporate Affairs. GST compliant billing with full
                statutory documentation on every project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/10 mt-8">
                <div className="p-6 space-y-3">
                  <p className="label-mono text-sun">CIN</p>
                  <p className="font-mono font-bold text-base break-all">{COMPANY_DATA.cin}</p>
                  <p className="text-xs text-paper/50 leading-relaxed">Registrar of Companies · MCA</p>
                </div>
                <div className="p-6 space-y-3">
                  <p className="label-mono text-sun">TAN</p>
                  <p className="font-mono font-bold text-base break-all">{COMPANY_DATA.tan}</p>
                  <p className="text-xs text-paper/50 leading-relaxed">Income Tax Department · GST billing</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" className="btn-premium !bg-sun !border-sun hover:!bg-paper hover:!border-paper hover:!text-ink">
                  Talk to our team <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={2} />
                </Link>
                <Link to="/projects" className="btn-outline-premium !border-white/20 !text-paper hover:!bg-paper hover:!text-ink">
                  View projects <ArrowUpRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 bg-white/[0.04] border border-white/10 p-6 md:p-8 flex flex-col gap-5">
              <p className="label-mono text-sun">Headquarters — Hyderabad</p>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-5 h-5 text-sun mt-0.5 shrink-0" strokeWidth={1.75} />
                <p className="text-sm text-paper/75 leading-relaxed">
                  8-3-214/7/1A, 2nd Floor, Pillar No: 1036, Sanjeeva Reddy Nagar (SR Nagar), Hyderabad 500038
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone aria-hidden="true" className="w-4 h-4 text-sun shrink-0" strokeWidth={1.75} />
                <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="font-display font-bold tracking-tight hover:text-sun transition-colors">
                  {COMPANY_DATA.contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail aria-hidden="true" className="w-4 h-4 text-sun shrink-0" strokeWidth={1.75} />
                <a href={`mailto:${COMPANY_DATA.contact.infoEmail}`} className="text-sm hover:text-sun transition-colors break-all">
                  {COMPANY_DATA.contact.infoEmail}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {COMPANY_DATA.branches
                  .filter((b) => !b.isHQ)
                  .map((b) => (
                    <div key={b.id} className="border border-white/10 p-3">
                      <span className="font-display font-bold uppercase tracking-tight text-xs flex items-center gap-1.5">
                        <Building2 aria-hidden="true" className="w-3 h-3 text-sun" strokeWidth={1.75} /> {b.city}
                      </span>
                      <span className="label-mono text-paper/40 text-[10px] mt-1 block">{b.state}</span>
                    </div>
                  ))}
              </div>
              {/* HQ mini map — dark editorial */}
              <div className="pt-2 space-y-3">
                <p className="label-mono text-paper/40">Headquarters — Hyderabad</p>
                <div className="w-full aspect-[16/9] border border-white/10 overflow-hidden bg-white/[0.04]">
                  <iframe
                    title="Varna Solar HQ — SR Nagar Hyderabad map"
                    src="https://www.google.com/maps?q=8-3-214/7/1A+Pillar+No+1036+SR+Nagar+Hyderabad+500038&z=16&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://share.google/hyy85Y5dUZMvW45M8"
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono inline-flex items-center gap-1.5 text-sun hover:text-paper transition-colors text-xs"
                >
                  Open in Google Maps <ArrowUpRight aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} /> →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
