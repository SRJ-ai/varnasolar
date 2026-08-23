import React, { useState } from 'react';
import { Calculator, Sparkles, Zap, ShieldCheck, ArrowRight, TreeDeciduous, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/common/GlassCard';
import { WatermelonButton } from '@/components/common/WatermelonButton';
import { AnimatedBadge } from '@/components/common/AnimatedBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PageTransition } from '@/components/common/PageTransition';
import { STATE_TARIFFS_DATA } from '@/data/stateTariffs';
import { calculateSolarSavings } from '@/utils/calculations';
import { formatINR, formatKW, formatCO2 } from '@/utils/formatters';
import { ConnectionType } from '@/types/solar';

export const SolarCalculatorPage: React.FC = () => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('TG');
  const [connectionType, setConnectionType] = useState<ConnectionType>('residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);

  const selectedState = STATE_TARIFFS_DATA.find((s) => s.code === selectedStateCode) || STATE_TARIFFS_DATA[0];
  const results = calculateSolarSavings(monthlyBill, selectedStateCode, connectionType);

  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Solar Calculator</span>
          </nav>

          <AnimatedBadge variant="amber" pulseDot={true}>
            <span>Complete 38 Indian States &amp; UTs Tariff Lookup</span>
          </AnimatedBadge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Solar Sizing, Subsidy &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500">
              ROI Calculator
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Discover your recommended solar system capacity (kW), PM Surya Ghar central subsidy up to ₹78,000, net project cost, and 30-year cumulative savings.
          </p>
        </div>
      </section>

      {/* INTERACTIVE CALCULATOR ENGINE */}
      <section className="py-8 pb-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT FORM (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard variant="dark" className="p-6 sm:p-8 space-y-6 border-white/15">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Input Parameters</span>
              </h3>

              {/* 1. Select State / UT (All 38) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select State or UT ({STATE_TARIFFS_DATA.length} Available):
                </label>
                <select
                  value={selectedStateCode}
                  onChange={(e) => setSelectedStateCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {STATE_TARIFFS_DATA.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name} ({state.zone} Zone)
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">
                  Solar Insolation: <strong className="text-emerald-400">{selectedState.dailyGenFactor} kWh/kWp/day</strong> • Base Tariff: ₹{selectedState.defaultTariff}/unit
                </p>
              </div>

              {/* 2. Connection Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Connection Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConnectionType('residential')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      connectionType === 'residential'
                        ? 'bg-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Residential (₹78k Subsidy)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConnectionType('commercial')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      connectionType === 'commercial'
                        ? 'bg-amber-500 text-white shadow-glow-sun'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Commercial (40% AD)
                  </button>
                </div>
              </div>

              {/* 3. Monthly Bill Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Average Monthly Electricity Bill:
                  </label>
                  <span className="text-lg font-black text-amber-400">{formatINR(monthlyBill)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹1,000</span>
                  <span>₹25,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Policy Notes Callout */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedState.name} Solar Policy &amp; DISCOMs:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">{selectedState.policyNotes}</p>
              </div>
            </GlassCard>
          </div>

          {/* OUTPUT RESULTS DASHBOARD (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard variant="glowing" glowColor="emerald" className="p-6 sm:p-8 space-y-6 border-white/15">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Recommended Solar System Sizing</span>
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  90% Bill Offset
                </span>
              </div>

              {/* Key Output Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="text-xs text-slate-400">Recommended Size</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{formatKW(results.systemSizeKW)}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">~{results.roofAreaRequiredSqFt} sq.ft roof</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="text-xs text-slate-400">Govt Central Subsidy</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{formatINR(results.centralSubsidyINR)}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Direct DBT Credit</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-400">Estimated Net Cost</div>
                  <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">{formatINR(results.netCostINR)}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Turnkey Installed</div>
                </div>
              </div>

              {/* Financial Returns Breakdown */}
              <div className="p-5 rounded-2xl bg-[#091322] border border-white/10 space-y-3 text-xs">
                <div className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">Financial Returns &amp; Payback:</div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Monthly Bill Savings:</span>
                  <span className="font-bold text-white">{formatINR(results.monthlySavingsINR)} / month</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Annual Electricity Savings:</span>
                  <span className="font-bold text-emerald-400">{formatINR(results.annualSavingsINR)} / year</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Estimated Capital Payback Period:</span>
                  <span className="font-bold text-amber-400">{results.paybackPeriodYears} Years</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">30-Year Lifetime Savings:</span>
                  <span className="font-bold text-emerald-400 text-sm">{formatINR(results.lifetimeSavingsINR30Yr)}</span>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
                  <TreeDeciduous className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">{results.treesPlantedEquivalent} Trees</div>
                    <div className="text-[10px] text-slate-400">Planted Equivalent</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs">
                  <Sparkles className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">{formatCO2(results.co2OffsetTonnes30Yr)}</div>
                    <div className="text-[10px] text-slate-400">30-Yr CO₂ Eliminated</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <WatermelonButton to="/contact" variant="primary" size="lg" fullWidth={true} glow={true}>
                  Book Free Site Feasibility &amp; Lock Your Quote
                </WatermelonButton>
              </div>
            </GlassCard>
          </div>

        </div>
      </section>
    </PageTransition>
  );
};
