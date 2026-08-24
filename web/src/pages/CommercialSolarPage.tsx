import React from 'react';
import { ArrowRight, ArrowUpRight, Building2, Zap, Gauge, CarFront } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '40%', label: 'Accelerated depreciation (Sec 32)' },
  { value: '2.5–3.2 Yrs', label: 'Capital payback' },
  { value: '80–90%', label: 'Tariff cut (₹8.50–11.50/unit)' },
];

const capacityRows: [string, string, string][] = [
  ['10 – 50 kW', 'Shops, clinics, showrooms', 'Flat RCC + shed roofs'],
  ['50 – 250 kW', 'Schools, hospitals, hotels', 'PEB shed + RCC combo'],
  ['250 kW – 1 MW', 'IT parks, malls, warehouses', 'Ground mount + carports'],
  ['1 – 5 MW', 'Captive industrial + open access', 'Ground mount, tracker-ready'],
];

const mountCards = [
  { icon: Building2, title: 'PEB Shed Mount', desc: 'Zero-penetration clamp on Klip-Lok / standing-seam metal decks. No drilling into insulated sheets.' },
  { icon: Gauge, title: 'Ground Mount', desc: 'Pile foundations, trenching & array earthing for open plots adjacent to facilities.' },
  { icon: CarFront, title: 'Solar Carports', desc: 'Dual-use parking canopies — shade + generation. EV-ready with charger integration.' },
  { icon: Zap, title: 'HT Sync Ready', desc: '11 kV / 33 kV VCB substation integration with HT net-metering & open-access.' },
];

const htSpecs: [string, string][] = [
  ['HT Sync', '11 kV / 33 kV VCB panels with protection relays · CEIG & DISCOM clearances included'],
  ['Zero-export & DG Sync', 'Smart controller syncs DG sets — cuts diesel burn 70–80% during outages (anti-backfeed)'],
  ['SCADA IoT', 'String-level telemetry, thermal mapping, WhatsApp/email daily generation reports'],
  ['Yield model', 'PVSYST 3D shading simulation · string sizing · cable-loss & THDi <3% compliance'],
  ['Structures', 'HDG galvanised for 150–170 km/h coastal wind loads'],
  ['O&M', 'Annual cleaning, IR hot-spot scan, earth-pit <1.2 Ω · 48-hr breakdown SLA'],
];

export const CommercialSolarPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-14 pb-12">
          <div className="lg:col-span-7 flex flex-col justify-between gap-10">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="label-mono text-sun mb-6">40% accelerated depreciation · Sec 32 · ₹8.50–11.50/unit offset</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7rem)]">
                Power your<br /><span className="text-sun">bottom line.</span>
              </motion.h1>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">Turn idle roof, shed or parking space into an asset that cuts commercial tariffs by 80–90%. 10 kW to 5 MW — turnkey EPC.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/solar-calculator" className="btn-premium">Commercial ROI Calculator</Link>
                <Link to="/contact" className="btn-outline-premium">Request PVSYST Survey</Link>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80" alt="Large commercial rooftop solar array" className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Businesses &amp; IT parks — 10 kW to 5 MW</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">Turnkey EPC</span>
            </div>
          </motion.div>
        </div>
        <div className="hairline-y">
          <div className="container-editorial grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 py-0">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }} className="py-6 sm:px-8 first:pl-0 flex items-baseline gap-4">
                <span className="font-display font-black uppercase tracking-tightest text-2xl md:text-4xl">{stat.value}</span>
                <span className="text-xs text-ink-mute max-w-[16ch] leading-snug">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPACITY SPECTRUM ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4.5rem)]">Built to <span className="text-sun">scale.</span></h2>
            <p className="text-ink-soft max-w-md leading-relaxed">From a 10 kW Kirana rooftop to a 5 MW multi-shed captive plant — same EPC rigour, same bankable yields.</p>
          </div>
          <div className="border border-ink/12 bg-paper-card overflow-hidden">
            <div className="hidden md:grid grid-cols-[180px_1fr_1fr] gap-4 px-8 py-4 border-b border-ink/12 bg-ink text-paper">
              <span className="label-mono text-paper/70">Capacity</span>
              <span className="label-mono text-paper/70">Typical client</span>
              <span className="label-mono text-paper/70">Mounting</span>
            </div>
            {capacityRows.map((row, i) => (
              <motion.div key={row[0]} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-2 md:gap-4 px-6 md:px-8 py-6 border-b border-ink/10 last:border-0 hover:bg-sun-tint transition-colors">
                <span className="font-display font-black text-sun text-xl">{row[0]}</span>
                <span className="text-sm font-medium">{row[1]}</span>
                <span className="text-sm text-ink-soft">{row[2]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOUNTING TYPES ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial py-24 md:py-32">
          <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-12 md:mb-16">Three roofs,<br /><span className="text-sun">one contract.</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-ink/12 bg-paper-card">
            {mountCards.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }} className="p-7 border-b border-r border-ink/10 last:border-b-0 lg:last:border-r-0 even:border-r-0 sm:even:border-r lg:[&:nth-child(2)]:border-r">
                <c.icon className="w-6 h-6 text-sun mb-4" strokeWidth={1.75} />
                <h4 className="font-display font-bold uppercase tracking-tight text-sm mb-2">{c.title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="label-mono text-ink-mute mt-4">PEB shed, RCC roof, ground plot or open parking — we engineer to the structure, not the other way around.</p>
        </div>
      </section>

      {/* ═══ ECONOMICS — AD + PAYBACK ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)]">The CFO<br /><span className="text-sun">slide.</span></h2>
              <div className="mt-8 border border-ink/15 bg-paper-card p-8 space-y-6">
                <div>
                  <span className="label-mono text-ink-mute">Sec 32 · Year-1 write-off</span>
                  <span className="font-display font-black uppercase tracking-tightest text-5xl md:text-6xl text-sun block mt-2">40%</span>
                  <p className="text-sm text-ink-soft leading-relaxed mt-3">On capitalised plant value for companies in 25–30% bracket, AD alone recovers ₹10–12 L on a ₹1 Cr (100 kW) plant in Year 1.</p>
                </div>
                <div className="hairline-t pt-6 flex items-baseline justify-between">
                  <span className="text-sm font-medium">Payback (with AD)</span>
                  <span className="font-display font-black text-2xl">2.5 – 3.2 yrs</span>
                </div>
                <p className="text-xs text-ink-mute leading-relaxed">Commercial tariffs Telangana &amp; AP: ₹8.50–11.50/unit + demand charges. Post-payback: 22+ years of near-free power.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t border-ink/12">
                {[
                  { n: '01', big: '₹8.50–11.50', title: 'Tariff you stop paying', copy: 'Commercial slab + ToD peak surcharges — solar offsets the expensive units first.' },
                  { n: '02', big: '80–90%', title: 'Bill eliminated', copy: 'Net-metering exports daytime surplus; credits settle against night-time import.' },
                  { n: '03', big: '100 kW ≈ ₹14 L/yr', title: 'Typical saving', copy: 'At 100 kWp, ~1.44 lakh units/yr × ₹9.50 avg. = ₹13–14 L saved per annum.' },
                ].map((b, i) => (
                  <motion.div key={b.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }}>
                    <div className="group grid grid-cols-[56px_160px_1fr] md:grid-cols-[80px_190px_1fr_48px] items-center gap-4 md:gap-8 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2">
                      <span className="label-mono text-ink-mute group-hover:text-sun">{b.n}</span>
                      <span className="font-display font-black tracking-tightest text-xl md:text-2xl text-sun leading-none">{b.big}</span>
                      <div>
                        <h3 className="font-display font-black uppercase tracking-tightest text-base md:text-lg group-hover:text-sun leading-tight">{b.title}</h3>
                        <p className="hidden md:block text-sm text-ink-soft mt-2 leading-relaxed">{b.copy}</p>
                      </div>
                      <ArrowUpRight aria-hidden="true" className="hidden md:block w-6 h-6 justify-self-end text-ink/30 group-hover:text-sun" strokeWidth={1.75} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/solar-calculator" className="btn-premium mt-8">Model your tariff <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HT / DG / SCADA ENGINEERING ═══ */}
      <section className="w-full bg-paper-deep hairline-t">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-24 md:py-32 items-center">
          <div className="order-2 lg:order-2 relative aspect-[4/3] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" alt="Engineer reviewing solar SCADA on tablet" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute -bottom-px -left-px bg-sun px-6 py-4"><span className="font-display font-black uppercase tracking-tight text-lg text-paper">SCADA · PVSYST modeled</span></div>
          </div>
          <div className="order-1 lg:order-1">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-8">Engineered like<br />an <span className="text-sun">asset class.</span></h2>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {htSpecs.map(([k, v]) => (
                <li key={k} className="grid grid-cols-[130px_1fr] md:grid-cols-[150px_1fr] gap-4 py-4">
                  <span className="label-mono text-ink-mute pt-0.5">{k}</span>
                  <span className="text-sm md:text-[15px] font-medium leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-outline-premium mt-10">Book a technical survey <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-24 md:py-36 text-center flex flex-col items-center gap-10">
          <h2 className="headline-hero text-[clamp(2.6rem,8vw,7rem)] text-ink">Stop renting<br />peak tariffs.</h2>
          <p className="text-base md:text-xl text-ink/80 max-w-xl leading-relaxed">Free PVSYST feasibility. Bankable yields. Three-year payback. HT, DG-sync &amp; SCADA included.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Request proposal <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="btn-outline-premium !border-ink !text-ink hover:!bg-transparent hover:!text-ink">Call {COMPANY_DATA.contact.primaryPhone}</a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
