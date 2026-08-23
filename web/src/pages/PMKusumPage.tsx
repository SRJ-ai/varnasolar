import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Building2, PlugZap } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';

const ease = [0.16, 1, 0.3, 1] as const;
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } as const, transition: { duration: 0.55, ease } };

const fundingRows: [string, number, string][] = [
  ['Central Govt share (MNRE)', 30, 'Direct to vendor'],
  ['State Govt share (TGREDCO / NREDCAP)', 30, 'Direct to vendor'],
  ['Bank loan (priority sector)', 30, 'Low agri interest'],
  ['Farmer contribution', 10, 'Only margin money'],
];

export const PMKusumPage: React.FC = () => {
  const { pmKusum } = SUBSIDIES_DATA;
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full">
        <div className="container-editorial pt-16 pb-16 md:pt-24 md:pb-20">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }} className="flex items-center gap-2 mb-8">
            <Link to="/" className="label-mono text-ink-mute hover:text-sun transition-colors">Home</Link>
            <span className="label-mono text-ink/30">/</span>
            <span className="label-mono text-sun">PM KUSUM Scheme</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7.5rem)] max-w-5xl">
            PM-KUSUM<br /><span className="text-sun">for farmers.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">60% government subsidy on solar pumps for farms across Telangana &amp; AP. Central 30% + State 30% + Bank 30% + Farmer 10%. Nodal: MNRE &amp; TGREDCO / NREDCAP.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-premium">Apply for a Pump <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
              <Link to="/agriculture-solar" className="btn-outline-premium">View Agri Solutions</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FUNDING SPLIT — big number + divide rows ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20 md:py-28 items-start">
          <motion.div {...rise}>
            <h2 className="headline-section text-[clamp(2.2rem,5vw,4rem)] mb-8">Who pays<br /><span className="text-sun">what.</span></h2>
            <span className="font-display font-black uppercase tracking-tight text-[clamp(4rem,10vw,8rem)] leading-none text-sun block">{pmKusum.totalGovtSubsidyPct}%</span>
            <p className="text-sm text-ink-mute mt-3 max-w-[32ch] leading-snug">Total government subsidy on Component B &amp; C (30% Central + 30% State). Farmer pays only 10% upfront.</p>
            <p className="text-sm font-medium mt-6">Annual diesel savings: <span className="text-sun">{pmKusum.annualDieselSavingsRangeINR}</span> per pump set — recovers farmer share in &lt;12 months.</p>
          </motion.div>
          <motion.div {...rise}>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {fundingRows.map(([label, pct, note]) => (
                <li key={label} className="flex items-baseline justify-between py-5 gap-4">
                  <div>
                    <span className="text-sm md:text-base font-medium block">{label}</span>
                    <span className="text-xs text-ink-mute">{note}</span>
                  </div>
                  <span className="font-display font-black uppercase tracking-tightest text-2xl md:text-4xl shrink-0">{pct}%</span>
                </li>
              ))}
            </ul>
            <p className="label-mono text-ink-mute mt-6">Component A: 70% bank + 30% farmer with 25-yr DISCOM PPA @ ₹3.00–3.50/unit</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPONENTS A / B / C — rich detail ═══ */}
      <section className="w-full py-20 md:py-28">
        <div className="container-editorial">
          <motion.h2 {...rise} className="headline-section text-[clamp(2.2rem,5vw,4rem)] mb-4 max-w-3xl">Three ways to <span className="text-sun">plug in.</span></motion.h2>
          <p className="text-ink-soft max-w-xl leading-relaxed mb-12 md:mb-16">Component A = 2 MW decentralised plant income; B = standalone off-grid pumps; C = solarise existing grid pumps + export surplus.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-ink/12 divide-y md:divide-y-0 md:divide-x divide-ink/12 bg-paper-card">
            {pmKusum.components.map((comp, i) => {
              const Icon = comp.id === 'Component-A' ? Building2 : comp.id === 'Component-B' ? Droplets : PlugZap;
              return (
                <motion.div key={comp.id} {...rise} transition={{ duration: 0.55, ease, delay: i * 0.08 }} className="p-8 flex flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display font-black uppercase tracking-tight text-4xl text-sun">{comp.id.split('-')[1]}</span>
                    <Icon className="w-6 h-6 text-ink/20" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold uppercase tracking-tight text-lg leading-snug">{comp.name.replace(/^Component\s[A-C]:\s/, '')}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed mt-2">{comp.subtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="label-mono text-[10px] border border-ink/15 px-2 py-1">{comp.capacityScope.split('(')[0].trim()}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-auto pt-4 border-t border-ink/10">
                    {comp.features.map((feature) => (
                      <li key={feature} className="text-xs text-ink-soft leading-relaxed flex gap-2"><span className="text-sun shrink-0">—</span><span>{feature}</span></li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-ink/10">
                    <p className="text-xs font-semibold text-sun">{comp.economicBenefit}</p>
                    <p className="text-xs text-ink-mute mt-2">{comp.targetCategory}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: '500 kW – 2 MW', v: 'Component A plants within 5 km of 33/11 kV substation. Cultivate shade crops under elevated arrays.' },
              { k: '3 – 10 HP', v: 'Component B replaces diesel — saves 800–1,200 L/yr. Automated MPPT + dry-run protection.' },
              { k: 'Up to 2× pump kW', v: 'Component C surplus units net-metered — farmer credited for every exported unit.' },
            ].map((r) => (
              <div key={r.k} className="border border-ink/12 bg-paper-card p-5">
                <span className="font-display font-black text-sun block mb-1">{r.k}</span>
                <span className="text-xs text-ink-soft leading-relaxed">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ECONOMICS CALLOUT ═══ */}
      <section className="w-full bg-ink text-paper">
        <div className="container-editorial py-16 md:py-20 flex flex-col md:flex-row gap-8 md:items-center justify-between">
          <div>
            <h3 className="font-display font-black uppercase tracking-tight text-2xl md:text-3xl">Diesel cost ends<br /><span className="text-sun">on day one.</span></h3>
            <p className="text-sm text-paper/60 leading-relaxed max-w-[48ch] mt-3">₹35k–65k saved per pump per year. Zero fuel, zero midnight grid trips — full daytime discharge at peak sun.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/agriculture-solar" className="btn-premium !bg-paper !text-ink !border-paper hover:!bg-sun hover:!border-sun hover:!text-paper">See agri pumps <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            <Link to="/contact" className="btn-outline-premium !border-paper/30 !text-paper hover:!bg-paper hover:!text-ink">Talk to agro engineer</Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — color-block moment ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-20 md:py-28 text-center flex flex-col items-center gap-8">
          <h2 className="headline-hero text-[clamp(2.4rem,7vw,5.5rem)] text-ink">Water that runs<br />on sunshine.</h2>
          <p className="text-base md:text-lg text-ink/80 max-w-lg leading-relaxed">Subsidy filing, bank loan and installation — handled by Varna Solar across Telangana &amp; AP.</p>
          <Link to="/contact" className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Apply now <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
        </div>
      </section>
    </PageTransition>
  );
};
