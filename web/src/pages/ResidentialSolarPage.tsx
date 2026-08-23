import React from 'react';
import { ArrowRight, ArrowUpRight, Calculator, Sun, Battery, Layers, Eye, ShieldCheck, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '₹78,000', label: 'Max central subsidy' },
  { value: 'Up to 90%', label: 'Electricity bill cut' },
  { value: '30 Days', label: 'DBT credit window' },
];

const sizingRows: [string, string, string, string][] = [
  ['₹1,500 – ₹2,500', '2 kW', '~160–200 sq.ft', '₹4.5 – 6 L saved (25 yr)'],
  ['₹3,500 – ₹6,000', '3 – 5 kW', '~250–450 sq.ft', '₹9 – 15 L saved'],
  ['₹7,000 – ₹12,000', '6 – 10 kW', '~500–900 sq.ft', '₹18 – 30 L saved'],
  ['₹15,000 +', '12 – 20 kW', '1,000 + sq.ft', '₹40 L + saved'],
];

const techCards = [
  { icon: ShieldCheck, k: 'ALMM Tier-1 DCR', v: 'Waaree Mono PERC / N-Type TOPCon — BIS & IEC 61215, anti-PID, >21.5% efficiency. 30-yr linear warranty (>80% at Yr 30).' },
  { icon: Sun, k: 'TOPCon Bifacial', v: 'Glass-to-glass bifacial harvests +15–25% albedo gain from rear side. Ideal for white terraces & elevated gazebos.' },
  { icon: Layers, k: 'Hot-dip Galvanised', v: 'HDG structures rated for 150–170 km/h coastal wind loads, elevation 6–10 ft. Zero-penetration options for sheet roofs.' },
  { icon: Battery, k: 'Smart String Inverters', v: 'BIS-certified MPPT inverters with Wi-Fi SCADA, <3% THDi, anti-islanding & Type-1+2 SPD protection.' },
];

export const ResidentialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO — Solar that pays you. ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end pt-14 pb-12 lg:min-h-[calc(100dvh-101px)]">
          <div className="lg:col-span-7 flex flex-col justify-between gap-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="label-mono text-sun mb-6"
              >
                PM Surya Ghar — up to ₹78,000 central subsidy · Waaree ALMM Tier-1
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.08 }}
                className="headline-hero text-[clamp(3.2rem,8.5vw,7.5rem)]"
              >
                Solar that<br />
                pays <span className="text-sun">you.</span>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10"
            >
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">
                Tier-1 Waaree rooftop plants with net-metering across Telangana &amp; AP — subsidy paperwork handled end-to-end. On-grid &amp; hybrid, with elevated gazebo option.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/solar-calculator" className="btn-premium">
                  Estimate Savings <Calculator aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />
                </Link>
                <Link to="/pm-surya-ghar-yojana" className="btn-outline-premium">
                  Check Eligibility
                </Link>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15"
          >
            <img width="400" height="300"
              src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80"
              alt="House with rooftop solar installation"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Homes &amp; villas — TSSPDCL / TSNPDCL / APEPDCL / APSPDCL</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">Waaree ALMM</span>
            </div>
          </motion.div>
        </div>
        <div className="hairline-y">
          <div className="container-editorial grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 py-0">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }} className="py-6 sm:px-8 first:pl-0 flex items-baseline gap-4">
                <span className="font-display font-black uppercase tracking-tightest text-2xl md:text-4xl">{stat.value}</span>
                <span className="text-xs text-ink-mute max-w-[12ch] leading-snug">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUBSIDY SLABS — index rows ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial">
          <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4.5rem)] mb-6 md:mb-10 max-w-4xl">
            The subsidy,<br />in <span className="text-sun">numbers.</span>
          </h2>
          <p className="text-ink-soft max-w-xl leading-relaxed mb-14 md:mb-20">
            Statutory MNRE benefit credited directly to your Aadhaar-linked bank within 30 days of DISCOM commissioning. Registration via <span className="font-medium text-ink">pmsuryaghar.gov.in</span>.
          </p>
          <div className="border-t border-ink/12">
            {SUBSIDIES_DATA.pmSuryaGhar.slabs.map((slab, i) => (
              <motion.div key={slab.systemCapacity} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }}>
                <Link to="/pm-surya-ghar-yojana" className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1.2fr_1fr_auto] items-center gap-4 md:gap-8 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2">
                  <span className="label-mono text-ink-mute group-hover:text-sun transition-colors">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display font-black uppercase tracking-tightest text-xl md:text-3xl group-hover:text-sun transition-colors leading-tight">{slab.systemCapacity}</h3>
                    <p className="label-mono text-ink-mute mt-2">{slab.monthlyConsumptionRangeUnits}</p>
                    <p className="hidden md:block text-sm text-ink-soft mt-3 max-w-[36ch]">{slab.idealForHome}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium leading-snug max-w-[34ch]">{slab.subsidyFormulaText}</p>
                    <p className="text-sm text-ink-soft mt-3">Avg savings {slab.averageMonthlySavingsINR}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 justify-self-end">
                    <ArrowUpRight aria-hidden="true" className="w-6 h-6 text-ink/30 group-hover:text-sun group-hover:-translate-y-1 group-hover:translate-x-1 transition-all hidden md:block" strokeWidth={1.75} />
                    <span className="font-display font-black tracking-tightest text-2xl md:text-4xl text-sun whitespace-nowrap">₹{slab.centralSubsidyAmountINR.toLocaleString('en-IN')}</span>
                    <span className="label-mono text-ink-mute">Subsidy</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/solar-calculator" className="btn-premium">Calculate your slab <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            <Link to="/pm-surya-ghar-yojana" className="btn-outline-premium">Full subsidy guide</Link>
          </div>
        </div>
      </section>

      {/* ═══ SYSTEM SIZING vs BILL ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial py-24 md:py-32">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)]">Right-size<br />your <span className="text-sun">roof.</span></h2>
            <p className="text-ink-soft max-w-md leading-relaxed">~80–100 sq.ft per kWp of shadow-free roof. Free 3D shadow modelling decides the exact fit.</p>
          </div>
          <div className="border border-ink/12 bg-paper-card overflow-hidden">
            <div className="grid grid-cols-[1.2fr_0.7fr_1fr_1.2fr] gap-4 px-6 md:px-8 py-4 border-b border-ink/12 bg-ink text-paper">
              <span className="label-mono text-paper/70">Monthly bill</span>
              <span className="label-mono text-paper/70">System</span>
              <span className="label-mono text-paper/70 hidden md:block">Roof needed</span>
              <span className="label-mono text-paper/70">25-yr pay-off</span>
            </div>
            {sizingRows.map((row, i) => (
              <motion.div key={row[0]} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="grid grid-cols-[1.2fr_0.7fr_1.2fr] md:grid-cols-[1.2fr_0.7fr_1fr_1.2fr] gap-4 px-6 md:px-8 py-5 border-b border-ink/10 last:border-0 hover:bg-sun-tint transition-colors">
                <span className="text-sm font-semibold">{row[0]}</span>
                <span className="font-display font-black text-sun">{row[1]}</span>
                <span className="text-sm text-ink-soft hidden md:block">{row[2]}</span>
                <span className="text-sm text-ink-soft">{row[3]}</span>
              </motion.div>
            ))}
          </div>
          <p className="label-mono text-ink-mute mt-4 flex items-center gap-2"><Ruler aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={1.75} /> Rule of thumb — exact size confirmed after site shadow audit.</p>
        </div>
      </section>

      {/* ═══ ON-GRID vs HYBRID ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial">
          <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-12 md:mb-16">On-grid vs <span className="text-sun">hybrid.</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-ink/12">
            {[
              { title: 'On-Grid (Net-Metering)', badge: 'Most popular · Subsidy eligible', points: ['Grid-tied with bidirectional DISCOM meter', 'Daytime export → night-time import; bill = net units only', 'Eligible for full ₹78,000 PM Surya Ghar DBT', 'Payback 3.0–4.0 yrs · lowest upfront cost', 'Anti-islanding shuts off during blackout (safety)'], cta: 'Best for stable-grid urban homes' },
              { title: 'Hybrid (On-Grid + Battery)', badge: 'Blackout-proof', points: ['Same net-metering + LiFePO₄ battery bank (5–10 kWh)', 'Seamless switchover during outages; critical loads stay on', 'Eligible for grid component subsidy', 'Payback 4.0–5.5 yrs · 24/7 autonomy', 'Wall-mount, 6000+ cycles, 90% DoD'], cta: 'Best for villas, WFH & medical loads' },
            ].map((col, i) => (
              <motion.div key={col.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }} className={`p-8 md:p-10 bg-paper-card flex flex-col gap-6 ${i === 0 ? 'border-b lg:border-b-0 lg:border-r border-ink/12' : ''}`}>
                <div>
                  <span className="label-mono text-sun">{col.badge}</span>
                  <h3 className="font-display font-black uppercase tracking-tightest text-2xl md:text-3xl mt-3">{col.title}</h3>
                </div>
                <ul className="space-y-3">
                  {col.points.map((p) => <li key={p} className="text-sm text-ink-soft leading-relaxed flex gap-3"><span className="text-sun shrink-0">—</span><span>{p}</span></li>)}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold border-t border-ink/10 pt-5"><span className="w-2 h-2 bg-sun shrink-0" />{col.cta}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-sun-tint border border-ink/10 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <p className="text-sm text-ink-soft leading-relaxed max-w-[60ch]"><strong className="text-ink">Net-metering</strong> is handled end-to-end — bidirectional meter, DISCOM JIR and export credit settlement with TSSPDCL / TSNPDCL / APEPDCL / APSPDCL.</p>
            <Link to="/contact" className="btn-premium shrink-0">Talk to engineer <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ WAAREE TECH ═══ */}
      <section className="w-full bg-paper-deep hairline-t">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-6">Waaree<br /><span className="text-sun">Tier-1.</span></h2>
              <p className="text-ink-soft leading-relaxed max-w-md">ALMM List-I DCR modules only — Mono PERC &amp; N-Type TOPCon/Bifacial. Salt-mist, PID and BIS certified for coastal AP &amp; Deccan heat.</p>
              <div className="mt-8 relative aspect-[4/3] overflow-hidden border border-ink/15">
                <img width="400" height="300" src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1100&q=80" alt="Waaree solar module close-up" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-paper px-4 py-3 border-t border-ink/15 flex justify-between items-center">
                  <span className="label-mono text-ink-mute">540–550W · &gt;21.5% eff.</span>
                  <span className="label-mono text-sun">30-yr warranty</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-ink/12 bg-paper-card">
              {techCards.map((c, i) => (
                <motion.div key={c.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }} className="p-7 border-b border-r border-ink/10 last:border-b-0 even:border-r-0 sm:even:border-r sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(1)]:border-r">
                  <c.icon className="w-6 h-6 text-sun mb-4" strokeWidth={1.75} />
                  <h4 className="font-display font-bold uppercase tracking-tight text-sm mb-2">{c.k}</h4>
                  <p className="text-sm text-ink-soft leading-relaxed">{c.v}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3D SHADOW + GAZEBO ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden border border-ink/15 order-2 lg:order-1">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80" alt="Elevated gazebo solar structure" loading="lazy" className="w-full h-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80';}} />
            <div className="absolute -bottom-px -right-px bg-sun px-6 py-4">
              <span className="font-display font-black uppercase tracking-tight text-lg text-paper">Gazebo option</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="label-mono text-sun mb-4 block">Engineering — 3D modeled</span>
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-6">Built for<br />Indian <span className="text-sun">terraces.</span></h2>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {[
                ['3D shadow modeling', 'PVSYST & CAD azimuth/shading simulation; string length & cable-loss optimized'],
                ['Elevated gazebo', '6–10 ft high-clearance structure — terrace stays usable for sit-outs & gardening'],
                ['Net-metering', 'Bidirectional DISCOM meter + Joint Inspection Report (JIR) handled'],
                ['After-care', '5-yr workmanship warranty · 48-hr SLA · optional 30-yr AMC'],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[130px_1fr] md:grid-cols-[160px_1fr] gap-4 py-4">
                  <span className="label-mono text-ink-mute pt-0.5">{k}</span>
                  <span className="text-sm md:text-[15px] font-medium leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium">Book a site visit <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
              <Link to="/solar-calculator" className="btn-outline-premium"><Eye aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /> See sizing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-24 md:py-36 text-center flex flex-col items-center gap-10">
          <h2 className="headline-hero text-[clamp(2.6rem,8vw,7rem)] text-ink">Your terrace is<br />idle capital.</h2>
          <p className="text-base md:text-xl text-ink/80 max-w-xl leading-relaxed">Free assessment. Subsidy filed. Bills slashed from month one. Works with TSSPDCL / TSNPDCL / APEPDCL / APSPDCL.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Start your project <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="btn-outline-premium !border-ink !text-ink hover:!bg-transparent hover:!text-ink">Call {COMPANY_DATA.contact.primaryPhone}</a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
