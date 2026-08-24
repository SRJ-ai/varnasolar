import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Clock3, ShieldCheck, ExternalLink } from 'lucide-react';
import { PageTransition } from '@/components/common/PageTransition';
import { SUBSIDIES_DATA } from '@/data/subsidiesData';

const ease = [0.16, 1, 0.3, 1] as const;
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } as const, transition: { duration: 0.55, ease } };

// Editorial 8-step journey (task spec requires 8 steps) — derived from subsidiesData + pmsuryaghar.gov.in flow
const eightSteps: { n: string; title: string; desc: string; time: string; who: string }[] = [
  { n: '01', title: 'Eligibility check & bill audit', desc: 'We verify your DISCOM connection (LT domestic), sanctioned load, and rooftop shadow via bill & photos.', time: 'Same day', who: 'Varna Solar' },
  { n: '02', title: 'National portal registration', desc: 'Apply on pmsuryaghar.gov.in with consumer number — Aadhaar-linked mobile OTP, KYC upload.', time: '1–2 days', who: 'Varna Solar' },
  { n: '03', title: 'DISCOM feasibility (TFA)', desc: 'Local DISCOM checks transformer capacity & issues Technical Feasibility Approval online.', time: '3–7 days', who: 'DISCOM' },
  { n: '04', title: '3D shadow & structural audit', desc: 'Engineers measure azimuth, tilt & load; final SLD, string design & subsidy slab lock.', time: '24–48 hrs', who: 'Varna Solar' },
  { n: '05', title: 'Tier-1 EPC installation', desc: 'Waaree ALMM DCR modules + HDG structure + MPPT string inverter + earthing/SPD — turnkey build.', time: '5–7 days', who: 'Varna Solar' },
  { n: '06', title: 'Pre-commissioning tests', desc: 'Voc/Isc, IR insulation, anti-islanding & net-meter wiring tests before DISCOM call.', time: 'Day 11', who: 'Varna Solar' },
  { n: '07', title: 'DISCOM inspection & net-meter', desc: 'Engineer inspects, installs bidirectional meter, signs Joint Inspection Report (JIR).', time: '7–14 days', who: 'DISCOM Inspector' },
  { n: '08', title: 'DBT subsidy credit to bank', desc: 'Upload JIR + cancelled cheque; MNRE credits up to ₹78,000 to Aadhaar-seeded account.', time: '15–30 days', who: 'MNRE Portal' },
];

export const PMSuryaGharPage: React.FC = () => {
  const { pmSuryaGhar } = SUBSIDIES_DATA;
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full overflow-visible">
        <div className="container-editorial pt-16 pb-16 md:pt-24 md:pb-20 overflow-visible">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }} className="flex items-center gap-2 mb-8">
            <Link to="/" className="label-mono text-ink-mute hover:text-sun transition-colors">Home</Link>
            <span className="label-mono text-ink/30">/</span>
            <span className="label-mono text-sun">PM Surya Ghar Yojana</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7rem)] max-w-5xl leading-[0.90] overflow-visible pt-2 text-wrap-balance">
            PM Surya Ghar<br /><span className="text-sun">Muft Bijli.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md">Central subsidy up to ₹78,000, paid straight to your bank. 300 units free every month. 1 Cr households. ₹75,021 Cr outlay. Nodal: MNRE via <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="underline decoration-sun underline-offset-4 hover:text-sun">pmsuryaghar.gov.in</a>.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/solar-calculator" className="btn-premium">Calculate Your Subsidy <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
              <Link to="/contact" className="btn-outline-premium">Apply for Installation</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }} className="hairline-b mt-16 flex flex-wrap items-baseline gap-4 pb-6">
            <span className="font-display font-black uppercase tracking-tightest text-3xl md:text-5xl text-sun">₹{pmSuryaGhar.maxSubsidyAmountINR.toLocaleString('en-IN')}</span>
            <span className="text-xs text-ink-mute max-w-[18ch] leading-snug">Maximum DBT per household — 30-day credit window post-JIR</span>
            <span className="ml-auto hidden md:inline-flex items-center gap-2 label-mono text-ink-mute"><Clock3 aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /> DBT in 15–30 days</span>
          </motion.div>
        </div>
      </section>

      {/* ═══ SUBSIDY SLABS — editorial table ═══ */}
      <section className="w-full py-20 md:py-28">
        <div className="container-editorial">
          <motion.h2 {...rise} className="headline-section text-[clamp(2.2rem,5vw,4rem)] mb-12 md:mb-16 max-w-3xl">What you <span className="text-sun">get back.</span></motion.h2>
          <div className="border-t border-ink/12">
            {pmSuryaGhar.slabs.map((slab) => (
              <motion.div key={slab.systemCapacity} {...rise} className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_auto] gap-4 md:gap-12 py-8 md:py-10 border-b border-ink/12 items-center">
                <div>
                  <h3 className="font-display font-black uppercase tracking-tightest text-xl md:text-2xl">{slab.systemCapacity}</h3>
                  <p className="text-sm text-ink-mute mt-1">{slab.monthlyConsumptionRangeUnits}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{slab.subsidyFormulaText}</p>
                  <p className="text-sm text-ink-soft leading-relaxed mt-1 max-w-[48ch]">{slab.idealForHome}</p>
                </div>
                <div className="md:text-right">
                  <span className="font-display font-black uppercase tracking-tight text-4xl md:text-5xl text-sun">₹{slab.centralSubsidyAmountINR.toLocaleString('en-IN')}</span>
                  <p className="label-mono text-ink-mute mt-1">Save {slab.averageMonthlySavingsINR}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border border-ink/12 bg-sun-tint p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <p className="text-sm text-ink-soft leading-relaxed max-w-[60ch]"><strong className="text-ink">Group housing (RWA/GHS):</strong> Common facilities (lifts, pumps, EV bays) get <strong className="text-sun">₹18,000/kW</strong> up to 500 kW — separate from the household cap.</p>
            <Link to="/residential-solar" className="btn-outline-premium shrink-0">See residential systems</Link>
          </div>
        </div>
      </section>

      {/* ═══ RWA + NET-METERING CALLOUT ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-20 md:py-28">
          <motion.div {...rise}>
            <h3 className="headline-section text-3xl md:text-4xl mb-8">How net-metering<br /><span className="text-sun">works.</span></h3>
            <div className="border border-ink/15 bg-paper-card p-8 space-y-4">
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 bg-sun text-paper grid place-items-center"><ShieldCheck aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></span>
                <p className="text-sm text-ink-soft leading-relaxed"><strong className="text-ink">Bidirectional meter</strong> — export daytime surplus, import at night; monthly bill = net units only. Fixed charge remains (~₹200–300/mo).</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 bg-ink text-paper grid place-items-center label-mono text-[10px] leading-none">T/G</span>
                <p className="text-sm text-ink-soft leading-relaxed"><strong className="text-ink">ALMM Tier-1 only</strong> — DCR-certified Waaree modules required for PM Surya Ghar. Non-DCR ineligible for subsidy.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 border border-ink/20 grid place-items-center"><ExternalLink aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></span>
                <p className="text-sm text-ink-soft leading-relaxed">Official registration: <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="underline decoration-sun underline-offset-4 font-medium text-ink hover:text-sun">pmsuryaghar.gov.in</a> — DISCOMs: TSSPDCL, TSNPDCL, APEPDCL, APSPDCL, APCPDCL.</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...rise}>
            <h3 className="headline-section text-3xl md:text-4xl mb-8">Societies get a<br /><span className="text-sun">separate rate.</span></h3>
            <div className="border border-ink/15 bg-paper-card p-8 space-y-3">
              <span className="font-display font-black uppercase tracking-tight text-5xl md:text-6xl text-sun block">₹18,000<span className="text-xl align-top">/kW</span></span>
              <p className="text-sm text-ink-soft leading-relaxed max-w-[52ch]">{pmSuryaGhar.groupHousingRwaSubsidy.description} Up to {pmSuryaGhar.groupHousingRwaSubsidy.maxCapacityKW} kW.</p>
              <div className="pt-4 hairline-t flex gap-3">
                <Link to="/contact" className="btn-premium !py-3 !px-5 !text-xs">RWA proposal <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
                <Link to="/solar-calculator" className="btn-outline-premium !py-3 !px-5 !text-xs">Calculate</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ELIGIBILITY + DOCUMENTS ═══ */}
      <section className="w-full py-20 md:py-28">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div {...rise}>
            <h3 className="headline-section text-2xl md:text-3xl mb-8">Eligibility</h3>
            <ul className="space-y-3">
              {pmSuryaGhar.eligibilityCriteria.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-ink-soft leading-relaxed"><CheckCircle2 aria-hidden="true" className="w-5 h-5 text-sun shrink-0 mt-0.5" strokeWidth={1.75} /><span>{c}</span></li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...rise}>
            <h3 className="headline-section text-2xl md:text-3xl mb-8">Documents required</h3>
            <ul className="space-y-3">
              {pmSuryaGhar.requiredDocuments.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-ink-soft leading-relaxed"><FileText aria-hidden="true" className="w-5 h-5 text-ink/40 shrink-0 mt-0.5" strokeWidth={1.75} /><span>{d}</span></li>
              ))}
            </ul>
            <p className="label-mono text-ink-mute mt-6">DBT paid only to Aadhaar-seeded bank account matching applicant name. 30-day window after JIR.</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 8-STEP JOURNEY ═══ */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <h2 className="headline-section text-[clamp(2.2rem,5vw,4rem)]">How to <span className="text-sun">apply.</span></h2>
            <p className="text-ink-soft max-w-md leading-relaxed">8 steps from first call to DBT credit. Varna Solar files, liases and tracks — you sign and flip it on.</p>
          </div>
          <div className="border-t border-ink/12">
            {eightSteps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.04 }} className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1.2fr_1fr_140px_120px] gap-4 md:gap-6 py-6 border-b border-ink/10 hover:bg-sun-tint px-2 -mx-2 transition-colors">
                <span className="label-mono text-sun pt-1">{s.n}</span>
                <span className="font-display font-bold uppercase tracking-tight text-sm md:text-base leading-snug">{s.title}</span>
                <span className="col-span-2 md:col-span-1 text-sm text-ink-soft leading-relaxed pl-14 md:pl-0 -mt-2 md:mt-0">{s.desc}</span>
                <span className="hidden md:block label-mono text-ink-mute pt-1">{s.time}</span>
                <span className="hidden md:block label-mono text-ink-mute pt-1 text-right">{s.who}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/solar-calculator" className="btn-premium">Estimate before you apply <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
            <Link to="/residential-solar" className="btn-outline-premium">See residential systems</Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full bg-sun">
        <div className="container-editorial py-20 md:py-28 text-center flex flex-col items-center gap-8">
          <h2 className="headline-hero text-[clamp(2.4rem,7vw,5.5rem)] text-ink">Paperwork handled.<br />You just flip it on.</h2>
          <p className="text-base md:text-lg text-ink/80 max-w-lg leading-relaxed">Registration, net-metering and DBT claim — managed end-to-end by Varna Solar across Telangana &amp; AP.</p>
          <Link to="/contact" className="btn-premium !bg-ink !border-ink hover:!bg-paper hover:!text-ink">Start your application <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
        </div>
      </section>
    </PageTransition>
  );
};
