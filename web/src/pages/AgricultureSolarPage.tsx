import React from 'react';
import { ArrowRight, ArrowUpRight, Droplets, Fuel, Tractor, SunMedium } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';
import { COMPANY_DATA } from '@/data/companyData';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '60%', label: 'Government subsidy (Comp B & C)' },
  { value: '3–20 HP', label: 'Pump range' },
  { value: '₹35–65k', label: 'Diesel saved yearly / pump' },
];

const kusumEconomics = [
  { key: 'Central Govt', value: '30%' },
  { key: 'State Govt', value: '30%' },
  { key: 'Bank loan', value: '30%' },
  { key: 'Farmer pays', value: '10%' },
];

const pumpRows: [string, string, string, string][] = [
  ['3 HP', 'Borewell / Open-well', 'Monoblock & submersible', 'Small holdings, open wells'],
  ['5 HP', 'Borewell submersible', '~150 ft head · MPPT controller', 'Most common — 2–3 acres'],
  ['7.5 HP', 'Borewell deep sub.', 'Up to 300 ft head', 'Large holdings, Sathupalli proven'],
  ['10 – 20 HP', 'High-discharge', 'Multi-pump & solarised grid', 'FPOs, feeder solarisation (C)'],
];

export const AgricultureSolarPage: React.FC = () => {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full relative overflow-hidden">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-10 pb-10 lg:min-h-[calc(100dvh-88px)]">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="label-mono text-sun mb-6">PM-KUSUM — 60% subsidy · 3–20 HP · Telangana &amp; AP</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7rem)]">
                Water where<br /><span className="text-sun">sunlight falls.</span>
              </motion.h1>
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
              <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">High-discharge 3–20 HP solar borewell, submersible &amp; open-well pumps — zero diesel, daytime water on demand. 60% govt. subsidy; farmer pays only 10%.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/pm-kusum-scheme" className="btn-premium">Subsidy Guide <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
                <Link to="/contact" className="btn-outline-premium">Contact Agro Engineers</Link>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80" alt="Farmland in Telangana under open sky" className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 right-0 bg-paper px-5 py-4 flex items-center justify-between border-t border-ink/15">
              <span className="label-mono text-ink-mute">Telangana &amp; AP farms · TGREDCO / NREDCAP</span>
              <span className="font-display font-bold text-sm uppercase tracking-tight">MNRE Certified</span>
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

      {/* ═══ PUMP SIZING TABLE ═══ */}
      <section className="w-full py-24 md:py-32">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4.5rem)]">Right pump<br /><span className="text-sun">for your bore.</span></h2>
            <p className="text-ink-soft max-w-md leading-relaxed">From open-well monoblocks to deep borewell submersibles — MPPT controllers with dry-run &amp; reverse-polarity protection.</p>
          </div>
          <div className="border border-ink/12 bg-paper-card overflow-hidden">
            <div className="hidden md:grid grid-cols-[120px_1.1fr_1.2fr_1fr] gap-4 px-8 py-4 border-b border-ink/12 bg-ink text-paper">
              <span className="label-mono text-paper/70">Pump size</span>
              <span className="label-mono text-paper/70">Type</span>
              <span className="label-mono text-paper/70">Spec</span>
              <span className="label-mono text-paper/70">Best for</span>
            </div>
            {pumpRows.map((row, i) => (
              <motion.div key={row[0]} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="grid grid-cols-1 md:grid-cols-[120px_1.1fr_1.2fr_1fr] gap-2 md:gap-4 px-6 md:px-8 py-6 border-b border-ink/10 last:border-0 hover:bg-sun-tint transition-colors">
                <span className="font-display font-black text-sun text-xl">{row[0]}</span>
                <span className="text-sm font-medium">{row[1]}</span>
                <span className="text-sm text-ink-soft">{row[2]}</span>
                <span className="text-sm text-ink-soft">{row[3]}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-ink/12 bg-paper-card">
            {[
              { icon: Droplets, k: 'Pump types', v: 'Borewell submersible · Open-well monoblock · Surface centrifugal' },
              { icon: Fuel, k: 'Diesel saved', v: '800–1,200 L/yr · ₹35k–65k per pump — farmer share pays back in <12 months' },
              { icon: SunMedium, k: 'Daytime irrigation', v: 'Full discharge at peak sun hours — no midnight grid trips' },
            ].map((c) => (
              <div key={c.k} className="p-6 border-b sm:border-b-0 sm:border-r border-ink/10 last:border-0">
                <c.icon className="w-5 h-5 text-sun mb-3" strokeWidth={1.75} />
                <h4 className="font-display font-bold uppercase tracking-tight text-xs mb-2">{c.k}</h4>
                <p className="text-sm text-ink-soft leading-relaxed">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PM-KUSUM COMPONENTS — index rows ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial py-20 md:py-28">
          <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4.5rem)] mb-6 md:mb-10 max-w-4xl">Three ways<br />to <span className="text-sun">plug in.</span></h2>
          <p className="text-ink-soft max-w-xl leading-relaxed mb-14 md:mb-20">Every PM-KUSUM pathway — standalone pumps, 2 MW decentralised plants, and feeder solarisation — explained by engineers who install them.</p>
          <div className="border-t border-ink/12">
            {SUBSIDIES_DATA.pmKusum.components.map((component, i) => (
              <motion.div key={component.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }}>
                <Link to="/pm-kusum-scheme" className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[88px_200px_1fr_48px] items-center gap-4 md:gap-8 py-8 md:py-10 border-b border-ink/12 hover:bg-sun-tint transition-colors px-2 -mx-2">
                  <span className="label-mono text-ink-mute group-hover:text-sun transition-colors">{component.id}</span>
                  <span className="font-display font-black tracking-tightest text-lg md:text-xl text-sun leading-tight">{component.capacityScope.split('(')[0]}</span>
                  <div>
                    <h3 className="font-display font-black uppercase tracking-tightest text-lg md:text-2xl group-hover:text-sun transition-colors leading-tight">{component.name.replace(/^Component [ABC]:\s*/, '')}</h3>
                    <p className="hidden md:block text-sm text-ink-soft mt-3 max-w-[52ch] leading-relaxed">{component.economicBenefit}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="hidden md:block w-8 h-8 justify-self-end text-ink/30 group-hover:text-sun group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" strokeWidth={1.75} />
                </Link>
              </motion.div>
            ))}
          </div>
          <Link to="/pm-kusum-scheme" className="btn-outline-premium mt-8">Full KUSUM breakdown <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
        </div>
      </section>

      {/* ═══ ECONOMICS — inverted color block ═══ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="font-display font-black tracking-tightest text-5xl md:text-7xl leading-none text-sun">WHAT.</h2>
            <p className="text-sm text-paper/60 max-w-md leading-relaxed">Component B &amp; C funding — Component A is 70% bank + 30% farmer with 25-yr DISCOM PPA income. Diesel savings ₹35,000–65,000/yr per pump set.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-paper/15 border-y border-paper/15">
            {kusumEconomics.map((row, i) => (
              <motion.div key={row.key} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }} className="px-6 py-8">
                <div className="font-display font-black tracking-tightest text-4xl md:text-6xl mb-3">{row.value}{row.key === 'Farmer pays' && <span className="text-sun">*</span>}</div>
                <div className="text-sm text-paper/70">{row.key}</div>
              </motion.div>
            ))}
          </div>
          <p className="label-mono text-paper/50 mt-6">*Only 10% upfront margin money from the farmer — 30% bank loan at priority-sector rates. 60% is non-refundable govt. grant (30% Central + 30% State).</p>
        </div>
      </section>

      {/* ═══ FIELD ENGINEERING SPLIT ═══ */}
      <section className="w-full bg-paper-deep hairline-t">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-24 md:py-32 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden border border-ink/15">
            <img width="400" height="300" src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" alt="Irrigated farmland at golden hour" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute -bottom-px -right-px bg-sun px-6 py-4"><span className="font-display font-black uppercase tracking-tight text-lg text-paper">Zero diesel</span></div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="headline-section text-[clamp(2.2rem,5.5vw,4rem)] mb-8">Pumps built<br />for the <span className="text-sun">field.</span></h2>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {[
                ['Pumps', 'Submersible & monoblock, 3–20 HP · borewell & open-well'],
                ['Controllers', 'MPPT with dry-run, overload & reverse-polarity protection'],
                ['Structure', 'Hot-dip galvanised elevated mounting — theft-anchored, wind-rated'],
                ['Certification', 'TGREDCO / NREDCAP empanelled · FPO & cooperative eligible'],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-4 py-4">
                  <span className="label-mono text-ink-mute pt-0.5">{k}</span>
                  <span className="text-sm md:text-base font-medium">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pm-kusum-scheme" className="btn-premium">Explore KUSUM <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
              <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-outline-premium">Book a farm survey</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-24 md:py-36 text-center flex flex-col items-center gap-10">
          <h2 className="headline-hero text-[clamp(2.6rem,8vw,7rem)] text-ink">Irrigate on sun,<br />not diesel.</h2>
          <p className="text-base md:text-xl text-ink/80 max-w-xl leading-relaxed">60% subsidy filed for you. Daytime water, every day — across Telangana &amp; AP.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Apply via KUSUM <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></button>
            <a href={`tel:${COMPANY_DATA.contact.rawPhone}`} className="btn-outline-premium !border-ink !text-ink hover:!bg-transparent hover:!text-ink">Call {COMPANY_DATA.contact.primaryPhone}</a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
