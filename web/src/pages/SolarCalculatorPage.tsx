import React, { useState } from 'react';
import { Zap, MapPin, Home, Building2, Calculator, ArrowRight, Leaf, Clock3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { STATE_TARIFFS_DATA } from '@/data/stateTariffs';
import { calculateSolarSavings } from '@/utils/calculations';
import { ConnectionType } from '@/types/solar';

const ease = [0.16, 1, 0.3, 1] as const;
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } as const, transition: { duration: 0.55, ease } };

export const SolarCalculatorPage: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('TG');
  const [connectionType, setConnectionType] = useState<ConnectionType>('residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [kwpInput, setKwpInput] = useState<string>('');

  const selectedState = STATE_TARIFFS_DATA.find((s) => s.code === selectedStateCode) || STATE_TARIFFS_DATA[0];
  // If kWp manually entered, derive a bill to feed calculator; otherwise use bill slider
  const effectiveBill = (() => {
    const kwp = parseFloat(kwpInput);
    if (!isNaN(kwp) && kwp > 0) {
      const tariff = connectionType === 'residential' ? (selectedState.defaultTariff || 6) : 9.5;
      const genPerKwDay = selectedState.dailyGenFactor || 4.56;
      // reverse: bill ≈ kwp * genPerKwDay *30 * tariff
      return Math.round(kwp * genPerKwDay * 30 * tariff);
    }
    return monthlyBill;
  })();
  const results = calculateSolarSavings(effectiveBill, selectedStateCode, connectionType);
  const discomsForState = selectedState.discoms;
  const roofArea = results.roofAreaRequiredSqFt;

  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="w-full">
        <div className="container-editorial pt-16 pb-10 md:pt-24 md:pb-14">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }} className="flex items-center gap-2 mb-8">
            <Link to="/" className="label-mono text-ink-mute hover:text-sun transition-colors">Home</Link>
            <span className="label-mono text-ink/30">/</span>
            <span className="label-mono text-sun">Solar Calculator — Instant Estimator</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }} className="headline-hero text-[clamp(3rem,8vw,7rem)] max-w-5xl">
            Run your<br /><span className="text-sun">numbers.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="mt-8 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
            Instant Solar Estimator — enter monthly bill <em>or</em> desired kWp, pick Telangana / AP, and see system capacity, subsidy up to ₹78,000, monthly bill cut, 30-yr ROI, payback &amp; CO₂.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-6 flex flex-wrap gap-2">
            <span className="label-mono border border-ink/15 px-3 py-1.5 bg-paper-card">Live — state tariffs &amp; DCR slabs</span>
            <span className="label-mono border border-ink/15 px-3 py-1.5 bg-sun-tint text-sun">TG · AP default</span>
          </motion.div>
        </div>
      </section>

      {/* ═══ CALCULATOR — editorial form === */}
      <section className="w-full bg-paper-deep hairline-t hairline-b">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-16 md:py-20">
          {/* INPUT FORM — label-mono above border-ink/20 inputs */}
          <motion.div {...rise} className="lg:col-span-5">
            <div className="bg-paper-card border border-ink/15">
              <div className="px-8 pt-8 pb-5 border-b border-ink/12">
                <h3 className="font-display font-black uppercase tracking-tightest text-lg">Input Parameters</h3>
                <p className="text-xs text-ink-mute mt-1">Use either monthly bill or kWp — bill takes priority if kWp is empty.</p>
              </div>
              <div className="p-8 space-y-7">
                {/* State */}
                <div>
                  <label htmlFor="state-select" className="label-mono text-ink-mute mb-2 block">State — Tariff &amp; DISCOM</label>
                  <div className="relative">
                    <MapPin aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 pointer-events-none" strokeWidth={1.75} />
                     <select id="state-select" name="state" autoComplete="address-level1" value={selectedStateCode} onChange={(e) => { setSelectedStateCode(e.target.value); setKwpInput(''); }} className="w-full border border-ink/20 bg-paper-card pl-9 pr-4 py-3.5 text-sm focus:border-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-sun appearance-none touch-manipulation">
                      {STATE_TARIFFS_DATA.map((state) => (
                        <option key={state.code} value={state.code}>{state.name} ({state.zone}) — ₹{state.defaultTariff}/unit</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-ink-mute mt-2 leading-relaxed">DISCOMs: {discomsForState.join(' · ')} · Sanctioned-load limit &amp; net-meter policy: {selectedState.policyNotes.slice(0, 110)}…</p>
                </div>

                {/* Connection */}
                <div>
                  <span className="label-mono text-ink-mute mb-2 block">Connection Category</span>
                  <div className="grid grid-cols-2 border border-ink/20 divide-x divide-ink/20">
                    {(['residential', 'commercial'] as const).map((type) => (
                      <button key={type} type="button" aria-pressed={connectionType === type} onClick={() => setConnectionType(type)} className={`py-3.5 text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-inset ${connectionType === type ? 'bg-ink text-paper' : 'bg-paper-card text-ink-soft hover:bg-sun-tint'}`}>
                        {type === 'residential' ? <Home aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /> : <Building2 aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} />}
                        {type}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-ink-mute mt-2">{connectionType === 'residential' ? 'PM Surya Ghar subsidy applies (up to ₹78k).' : '40% accelerated depreciation applies (no MNRE subsidy).'}</p>
                </div>

                {/* Monthly bill */}
                <div>
                  <label htmlFor="bill-range" className="label-mono text-ink-mute mb-2 block">Average Monthly Electricity Bill (₹)</label>
                  <span className="font-display font-black uppercase tracking-tightest text-4xl text-sun block mb-3 tabular-nums">₹{monthlyBill.toLocaleString('en-IN')}</span>
                  <input id="bill-range" name="monthlyBill" type="range" min={1000} max={150000} step={500} value={monthlyBill} onChange={(e) => { setMonthlyBill(Number(e.target.value)); setKwpInput(''); }} className="w-full accent-sun cursor-pointer focus:outline-none touch-manipulation" />
                  <div className="flex justify-between text-[11px] text-ink-mute mt-1"><span>₹1,000</span><span>₹1.5 L</span></div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {[3500, 6000, 12000, 25000].map((v) => (
                      <button key={v} type="button" onClick={() => { setMonthlyBill(v); setKwpInput(''); }} className={`text-xs px-3 py-1.5 border transition-colors ${monthlyBill === v ? 'bg-sun border-sun text-paper' : 'border-ink/15 hover:border-sun hover:text-sun'}`}>₹{v.toLocaleString('en-IN')}</button>
                    ))}
                  </div>
                </div>

                {/* kWp alternative */}
                <div className="hairline-t pt-6">
                  <label htmlFor="kwp-input" className="label-mono text-ink-mute mb-2 block">Or — desired system size (kWp) <span className="text-ink/30 normal-case tracking-normal">optional</span></label>
                  <div className="relative">
                    <Calculator aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" strokeWidth={1.75} />
                     <input id="kwp-input" name="kwp" type="number" min={1} max={1000} step={0.5} inputMode="decimal" autoComplete="off" spellCheck={false} placeholder="e.g. 5…" value={kwpInput} onChange={(e) => setKwpInput(e.target.value)} className="w-full border border-ink/20 bg-paper-card pl-9 pr-16 py-3.5 text-sm focus:border-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-sun touch-manipulation tabular-nums min-w-0" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 label-mono text-ink-mute">kWp</span>
                  </div>
                  {kwpInput && <p className="text-xs text-sun mt-2">Using kWp → bill derived as ~₹{effectiveBill.toLocaleString('en-IN')}/mo for {selectedState.name}.</p>}
                </div>

                <div className="hairline-t pt-5 text-xs text-ink-mute leading-relaxed">
                  Roof needed: ~80–100 sq.ft / kWp shadow-free · {roofArea.toLocaleString('en-IN')} sq.ft for recommended system. 3D shadow audit refines it.
                </div>
              </div>
            </div>
          </motion.div>

          {/* RESULTS — sun-tint big display numbers */}
          <motion.div {...rise} transition={{ duration: 0.55, ease, delay: 0.08 }} className="lg:col-span-7">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between border-b border-ink/12 pb-5 mb-6">
                <h3 className="font-display font-black uppercase tracking-tightest text-xl md:text-2xl">Recommended — {selectedState.name}</h3>
                <Zap aria-hidden="true" className="w-6 h-6 text-sun shrink-0" strokeWidth={1.75} />
              </div>

              {/* Top metrics grid — editorial */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-ink/15 bg-paper-card">
                <div className="p-6 border-r border-b md:border-b-0 border-ink/10">
                  <span className="label-mono text-ink-mute block mb-2">System Capacity</span>
                  <span className="font-display font-black uppercase tracking-tight text-4xl block">{results.systemSizeKW} <span className="text-lg">kWp</span></span>
                  <span className="text-xs text-ink-mute mt-1 block">{roofArea.toLocaleString('en-IN')} sq.ft · {results.dailyGenerationKWh} kWh/day</span>
                </div>
                <div className="p-6 border-b md:border-b-0 md:border-r border-ink/10">
                  <span className="label-mono text-ink-mute block mb-2">Central Subsidy</span>
                  <span className="font-display font-black uppercase tracking-tight text-4xl block text-sun">₹{results.centralSubsidyINR.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-ink-mute mt-1 block">{connectionType === 'residential' ? 'MNRE DBT (up to 30 days)' : 'Commercial — AD benefit via Sec 32'}</span>
                </div>
                <div className="p-6 col-span-2 md:col-span-1 border-r-0">
                  <span className="label-mono text-ink-mute block mb-2">Est. Net Cost</span>
                  <span className="font-display font-black uppercase tracking-tight text-3xl block">₹{results.netCostINR.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-ink-mute mt-1 block">After subsidy · gross ₹{results.grossCostINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Second row — bill reduction + payback + CO2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-b border-ink/15 bg-paper-card">
                <div className="p-6 border-b md:border-b-0 md:border-r border-ink/10">
                  <span className="label-mono text-ink-mute block mb-2">Monthly Bill Cut</span>
                  <span className="font-display font-black text-2xl block">₹{results.monthlySavingsINR.toLocaleString('en-IN')}<span className="text-sm font-normal text-ink-mute"> / mo</span></span>
                  <span className="text-xs text-ink-mute mt-1 block">From ₹{effectiveBill.toLocaleString('en-IN')} → ~₹{Math.max(0, effectiveBill - results.monthlySavingsINR).toLocaleString('en-IN')} net</span>
                </div>
                <div className="p-6 border-b md:border-b-0 md:border-r border-ink/10">
                  <span className="label-mono text-ink-mute block mb-2">Payback</span>
                  <span className="font-display font-black text-2xl block flex items-center gap-2"><Clock3 aria-hidden="true" className="w-5 h-5 text-sun" strokeWidth={1.75} />{results.paybackPeriodYears} yrs</span>
                  <span className="text-xs text-ink-mute mt-1 block">ROI {results.roiPercentage}% · 25–30 yr life</span>
                </div>
                <div className="p-6">
                  <span className="label-mono text-ink-mute block mb-2">CO₂ Offset (30 yr)</span>
                  <span className="font-display font-black text-2xl block flex items-center gap-2"><Leaf aria-hidden="true" className="w-5 h-5 text-sun" strokeWidth={1.75} />{results.co2OffsetTonnes30Yr} t</span>
                  <span className="text-xs text-ink-mute mt-1 block">{results.treesPlantedEquivalent} trees · {results.coalSavedTonnes30Yr} t coal avoided</span>
                </div>
              </div>

              {/* Lifetime — sun-tint big display */}
              <div className="bg-sun-tint border border-ink/15 p-8 md:p-10 mt-6 flex flex-col gap-6">
                <div>
                  <span className="label-mono text-ink-mute block mb-2 flex items-center gap-2"><TrendingUp aria-hidden="true" className="w-4 h-4 text-sun" strokeWidth={1.75} />30-Year Cumulative Savings</span>
                  <span className="font-display font-black uppercase tracking-tight leading-none text-[clamp(2.8rem,6vw,4.8rem)] text-ink block">₹{results.lifetimeSavingsINR30Yr.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-ink-soft mt-3 block leading-relaxed">₹{results.annualSavingsINR.toLocaleString('en-IN')}/yr · {results.annualGenerationKWh.toLocaleString('en-IN')} kWh/yr · ~{results.monthlyGenerationKWh.toLocaleString('en-IN')} kWh/mo</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contact" className="btn-premium flex-1 justify-center py-4">Claim ₹{results.centralSubsidyINR.toLocaleString('en-IN')} Subsidy Quote <ArrowRight aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} /></Link>
                  <Link to="/pm-surya-ghar-yojana" className="btn-outline-premium shrink-0">Subsidy guide</Link>
                </div>
              </div>

              <p className="text-xs text-ink-mute mt-4 leading-relaxed">Indicative only — final quote after 3D shadow &amp; sanction-load check. {selectedState.name} tariff ₹{selectedState.defaultTariff}/unit, {selectedState.dailyGenFactor} kWh/kWp/day. Costs use DCR slabs for {selectedState.name}.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
