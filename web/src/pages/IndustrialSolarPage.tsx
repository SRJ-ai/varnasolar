import React from 'react';
import { ArrowRight, ArrowUpRight, Zap, Activity, Wrench, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '11kV/33kV', label: 'HT grid synchronization' },
  { value: '70–80%', label: 'DG fuel burn cut' },
  { value: '100%', label: 'String-level SCADA visibility' },
];

const htRows = [
  { n: '01', big: '11 kV / 33 kV', title: 'HT Substation Integration', copy: 'VCB panels, ABT metering, dedicated protection relays · CEIG & DISCOM HT approvals end-to-end.' },
  { n: '02', big: 'Zero-Export', title: 'Export Control & DG Hybrid', copy: 'Smart zero-export controller prevents backfeed; DG synchroniser cuts diesel 70–80% during grid outages.' },
  { n: '03', big: 'SCADA', title: 'IoT Telemetry & Alerts', copy: 'String Voc/Isc, PR ratio, thermal IR hot-spot map — live dashboard + auto fault alerts.' },
];

const engBullets: [string, string][] = [
  ['3D shadow', 'PVSYST 3D horizon & inter-row shading — optimum tilt/azimuth, albedo-aware for bifacial'],
  ['Civil & foundations', 'Pile & ballast foundations, cable trenches, DC marshalling & ACDB with Type-1+2 SPD'],
  ['String & losses', 'String Voc/Isc calculations, cable voltage-drop <1.5%, THDi <3% harmonic compliance'],
  ['Wind & corrosion', 'HDG structures certified 170 km/h gusts, Class-VI salt-mist — Kakinada / coastal proven'],
  ['Multi-MW', '100 kW to 5 MW+ captive rooftop, shed & ground-mount — phased augmentation ready'],
  ['Compliance', 'CEIG approval, DISCOM HT JIR, ABT meter — commissioning documentation turnkey'],
];

export const IndustrialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-10 pb-10 lg:min-h-[calc(100dvh-101px)]">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 min-w-0">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="label-mono text-sun mb-6">MW-scale captive — 11kV/33kV HT · zero-export · DG hybrid</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7rem)]">
                Megawatts on<br /><span className="text-sun">your roofline.</span>
              </motion.h1>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">Captive rooftop &amp; ground-mounted plants for pharma, textile, cement and manufacturing — HT-grade engineering, 25-yr fixed-cost power.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-premium">Request HT Proposal <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
                <Link to="/projects" className="btn-outline-premium">View Projects</Link>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80" alt="Industrial facility with captive solar" className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Factories &amp; plants — captive EPC</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">HT Ready</span>
            </div>
          </motion.div>
        </div>
        <div className="hairline-y">
          <div className="container-editorial grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 py-0">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }} className="py-6 sm:px-8 first:pl-0 flex items-baseline gap-4">
                <span className="font-display font-black uppercase tracking-tightest text-2xl md:text-4xl">{stat.value}</span>
                <span className="text-xs text-ink-mute max-w-[14ch] leading-snug">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HT SPECS — hairline rows ═══ */}
      <section className="w-full py-16 md:py-20">
        <div className="container-editorial">
          <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4.5rem)] mb-6 md:mb-10 max-w-4xl">High-tension<br /><span className="text-sun">infrastructure.</span></h2>
          <p className="text-ink-soft max-w-xl leading-relaxed mb-14 md:mb-20">Heavy engineering specified for continuous industrial duty cycles — not domestic hardware scaled up.</p>
          <div className="border-t border-ink/12">
            {htRows.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }}>
                <Link to="/contact" className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_190px_1fr_48px] items-center gap-4 md:gap-8 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2">
                  <span className="label-mono text-ink-mute group-hover:text-sun transition-colors">{s.n}</span>
                  <span className="font-display font-black tracking-tightest text-xl md:text-3xl text-sun whitespace-nowrap">{s.big}</span>
                  <div>
                    <h3 className="font-display font-black uppercase tracking-tightest text-lg md:text-2xl group-hover:text-sun transition-colors leading-tight">{s.title}</h3>
                    <p className="hidden md:block text-sm text-ink-soft mt-3 max-w-[52ch] leading-relaxed">{s.copy}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8 justify-self-end text-ink/30 group-hover:text-sun group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" strokeWidth={1.75} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENGINEERING DEEP DIVE ═══ */}
      <section className="w-full bg-paper-deep hairline-y">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)]">How we<br /><span className="text-sun">engineer it.</span></h2>
              <p className="text-ink-soft leading-relaxed max-w-md mt-6">String calculations, cable loss, wind mount and civil — every MW is a substation project, not a panel row.</p>
              <div className="mt-8 grid grid-cols-2 gap-0 border border-ink/12 bg-paper-card">
                {[
                  { icon: Zap, label: 'Cable loss', value: '<1.5%' },
                  { icon: Activity, label: 'THDi', value: '<3%' },
                  { icon: Wrench, label: 'Earth pit', value: '<1.2 Ω' },
                  { icon: ShieldAlert, label: 'Wind rating', value: '170 km/h' },
                ].map((m) => (
                  <div key={m.label} className="p-6 border-r border-b border-ink/10 odd:border-r even:border-r-0 last:border-b-0 [&:nth-child(3)]:border-b-0">
                    <m.icon className="w-5 h-5 text-sun mb-3" strokeWidth={1.75} />
                    <span className="font-display font-black text-xl block">{m.value}</span>
                    <span className="label-mono text-ink-mute text-[10px]">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink/10 border-y border-ink/10 bg-paper-card">
                {engBullets.map(([k, v]) => (
                  <motion.li key={k} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="grid grid-cols-[130px_1fr] md:grid-cols-[160px_1fr] gap-4 py-5 px-6 md:px-8">
                    <span className="label-mono text-ink-mute pt-0.5">{k}</span>
                    <span className="text-sm md:text-[15px] font-medium leading-relaxed">{v}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 p-5 bg-sun-tint border border-ink/10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <p className="text-sm text-ink-soft leading-relaxed max-w-[52ch]">Existing DG sets stay — synchroniser blends solar + diesel seamlessly. CAPEX or OPEX (RESCO) models available.</p>
                <Link to="/contact" className="btn-premium shrink-0">Book a load study <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CAPACITY + DG STRIP ═══ */}
      <section className="w-full py-16 md:py-20">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80" alt="Utility-scale solar power infrastructure" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute -bottom-px -right-px bg-sun px-6 py-4"><span className="font-display font-black uppercase tracking-tight text-lg text-paper">CEIG approved</span></div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-8">Compliance,<br />handled <span className="text-sun">end-to-end.</span></h2>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {[
                ['Substation', 'VCB panels with protection relays & ABT/HT metering'],
                ['Civil works', 'Pile foundations, trenches & dual chemical earthing'],
                ['Approvals', 'CEIG & DISCOM HT clearances + JIR — we liaise'],
                ['Reporting', 'Monthly generation, PR ratio & alerts — SCADA dashboard'],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-4 py-4">
                  <span className="label-mono text-ink-mute pt-0.5">{k}</span>
                  <span className="text-sm md:text-base font-medium">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-outline-premium">See industrial projects</Link>
              <Link to="/contact" className="btn-premium">Start HT assessment <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-16 md:py-20 text-center flex flex-col items-center gap-10">
          <h2 className="headline-hero text-[clamp(2.6rem,8vw,7rem)] text-ink">Run production<br />on sunlight.</h2>
          <p className="text-base md:text-xl text-ink/80 max-w-xl leading-relaxed">HT-grade engineering. Fixed-cost power for 25 years. Phased MW rollout to match your load.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Start your project <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="btn-outline-premium !border-ink !text-ink hover:!bg-transparent hover:!text-ink">Call {COMPANY_DATA.contact.primaryPhone}</a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
