// scripts/suites/tier3-calculation-engine.mjs
// Tier 3: Solar Sizing, PM Surya Ghar Subsidy Engine & Financial Engineering Math

import { describe, test, assert, assertEqual, assertGreaterThan, assertLessThan, assertBetween } from '../test-harness.mjs';

export function calculateDetailedSolarMetrics({
  systemKW,
  stateTariff = 6.00,
  dailyGen = 4.56,
  connectionType = 'residential',
  isSpecialCategory = false,
}) {
  // Subsidy Calculation
  let centralSubsidyINR = 0;
  if (connectionType === 'residential') {
    if (isSpecialCategory) {
      if (systemKW <= 1) {
        centralSubsidyINR = systemKW * 33000;
      } else if (systemKW <= 2) {
        centralSubsidyINR = 33000 + (systemKW - 1) * 33000;
      } else if (systemKW < 3) {
        centralSubsidyINR = 66000 + (systemKW - 2) * 19800;
      } else {
        centralSubsidyINR = 85800; // Special category cap
      }
    } else {
      if (systemKW <= 1) {
        centralSubsidyINR = systemKW * 30000;
      } else if (systemKW <= 2) {
        centralSubsidyINR = 30000 + (systemKW - 1) * 30000;
      } else if (systemKW < 3) {
        centralSubsidyINR = 60000 + (systemKW - 2) * 18000;
      } else {
        centralSubsidyINR = 78000; // Standard national cap
      }
    }
  }

  // Cost Structure
  const costPerKW = connectionType === 'residential' ? 60000 : 48000;
  const grossCostINR = systemKW * costPerKW;
  const netCostINR = Math.max(0, grossCostINR - centralSubsidyINR);

  // Generation Metrics
  const dailyUnits = systemKW * dailyGen;
  const annualGenerationKWh = Math.round(dailyUnits * 365 * 0.98); // 2% auxiliary/downtime factor
  const lifetimeGenerationKWh = Math.round(annualGenerationKWh * 30 * 0.93); // 30-yr degradation avg

  // Financial Savings
  const annualSavingsINR = Math.round(annualGenerationKWh * stateTariff);
  const paybackYears = annualSavingsINR > 0 ? Number((netCostINR / annualSavingsINR).toFixed(2)) : 0;
  const lifetimeSavings30YrINR = Math.round((annualSavingsINR * 30 * 0.93) - netCostINR);

  // Commercial Tax Benefits (40% Accelerated Depreciation)
  let year1TaxDepreciationBenefitINR = 0;
  if (connectionType !== 'residential') {
    const corporateTaxRate = 0.2517; // 25.17% standard corporate tax rate under Sec 115BAA
    year1TaxDepreciationBenefitINR = Math.round(grossCostINR * 0.40 * corporateTaxRate);
  }

  // Environmental Metrics
  const co2Factor = 0.82; // 0.82 kg CO2 per kWh grid offset in India (CEA baseline)
  const annualCO2Tons = Number(((annualGenerationKWh * co2Factor) / 1000).toFixed(2));
  const lifetimeCO2Tons = Number(((lifetimeGenerationKWh * co2Factor) / 1000).toFixed(2));
  const treesPlantedEquivalent = Math.round((lifetimeGenerationKWh * co2Factor) / 625);

  return {
    systemKW,
    grossCostINR,
    centralSubsidyINR,
    netCostINR,
    annualGenerationKWh,
    lifetimeGenerationKWh,
    annualSavingsINR,
    paybackYears,
    lifetimeSavings30YrINR,
    year1TaxDepreciationBenefitINR,
    annualCO2Tons,
    lifetimeCO2Tons,
    treesPlantedEquivalent,
  };
}

export function calculateAgriPumpPackage(hp) {
  // Cost per HP based on MNRE benchmark (approx ₹55,000/HP for complete solar pump package)
  const costPerHP = 55000;
  const totalPackageCost = hp * costPerHP;
  
  const centralSubsidy = Math.round(totalPackageCost * 0.30); // 30% Central MNRE
  const stateSubsidy = Math.round(totalPackageCost * 0.30);   // 30% State Govt
  const totalGovtSubsidy = centralSubsidy + stateSubsidy;     // 60% Total Subsidy
  
  const bankLoan = Math.round(totalPackageCost * 0.30);       // 30% Low Interest Loan
  const farmerShare = totalPackageCost - totalGovtSubsidy - bankLoan; // 10% Farmer Share
  
  // Diesel savings estimation: ~3.5 liters/hour, ~600 hours/year @ ₹90/liter
  const dieselLitersSavedPerYear = Math.round(hp * 0.9 * 600);
  const annualDieselSavingsINR = Math.round(dieselLitersSavedPerYear * 90);

  return {
    hp,
    totalPackageCost,
    centralSubsidy,
    stateSubsidy,
    totalGovtSubsidy,
    bankLoan,
    farmerShare,
    dieselLitersSavedPerYear,
    annualDieselSavingsINR,
  };
}

export function registerTier3CalculationEngine() {
  describe(3, 'Solar Sizing, PM Surya Ghar Subsidy Engine & Financial Engineering Math', () => {
    test('3.1 PM Surya Ghar DBT Central Subsidy Exact Slabs & Pro-Rata Interpolation', () => {
      // 1. Exact 1 kW
      const m1kW = calculateDetailedSolarMetrics({ systemKW: 1, connectionType: 'residential' });
      assertEqual(m1kW.centralSubsidyINR, 30000, '1 kW must receive exact ₹30,000 subsidy');

      // 2. Exact 2 kW
      const m2kW = calculateDetailedSolarMetrics({ systemKW: 2, connectionType: 'residential' });
      assertEqual(m2kW.centralSubsidyINR, 60000, '2 kW must receive exact ₹60,000 subsidy');

      // 3. Pro-rata 1.5 kW
      const m1_5kW = calculateDetailedSolarMetrics({ systemKW: 1.5, connectionType: 'residential' });
      assertEqual(m1_5kW.centralSubsidyINR, 45000, '1.5 kW must receive exact ₹45,000 subsidy');

      // 4. Exact 3 kW
      const m3kW = calculateDetailedSolarMetrics({ systemKW: 3, connectionType: 'residential' });
      assertEqual(m3kW.centralSubsidyINR, 78000, '3 kW must receive exact ₹78,000 subsidy');

      // 5. Pro-rata 2.5 kW
      const m2_5kW = calculateDetailedSolarMetrics({ systemKW: 2.5, connectionType: 'residential' });
      assertEqual(m2_5kW.centralSubsidyINR, 69000, '2.5 kW must receive exact ₹69,000 subsidy');

      // 6. High Capacities (5 kW, 10 kW, 20 kW) - Statutory Cap
      const m5kW = calculateDetailedSolarMetrics({ systemKW: 5, connectionType: 'residential' });
      assertEqual(m5kW.centralSubsidyINR, 78000, '5 kW residential must be strictly capped at ₹78,000');

      const m10kW = calculateDetailedSolarMetrics({ systemKW: 10, connectionType: 'residential' });
      assertEqual(m10kW.centralSubsidyINR, 78000, '10 kW residential must be strictly capped at ₹78,000');
    });

    test('3.2 Special Category States (NE / Hill States) Enhanced Subsidy Rates', () => {
      const spec1kW = calculateDetailedSolarMetrics({ systemKW: 1, connectionType: 'residential', isSpecialCategory: true });
      assertEqual(spec1kW.centralSubsidyINR, 33000, 'Special Category 1 kW receives ₹33,000');

      const spec2kW = calculateDetailedSolarMetrics({ systemKW: 2, connectionType: 'residential', isSpecialCategory: true });
      assertEqual(spec2kW.centralSubsidyINR, 66000, 'Special Category 2 kW receives ₹66,000');

      const spec3kW = calculateDetailedSolarMetrics({ systemKW: 3, connectionType: 'residential', isSpecialCategory: true });
      assertEqual(spec3kW.centralSubsidyINR, 85800, 'Special Category 3 kW is capped at ₹85,800');

      const spec10kW = calculateDetailedSolarMetrics({ systemKW: 10, connectionType: 'residential', isSpecialCategory: true });
      assertEqual(spec10kW.centralSubsidyINR, 85800, 'Special Category 10 kW is capped at ₹85,800');
    });

    test('3.3 Commercial Solar Financial Engineering & 40% Accelerated Depreciation', () => {
      const comm100kW = calculateDetailedSolarMetrics({
        systemKW: 100,
        stateTariff: 8.50, // Commercial tariff
        dailyGen: 4.60,
        connectionType: 'commercial',
      });

      assertEqual(comm100kW.centralSubsidyINR, 0, 'Commercial connections do not receive residential DBT subsidy');
      assertEqual(comm100kW.grossCostINR, 4800000, '100 kW commercial plant capex @ ₹48k/kW = ₹48 Lakhs');
      
      // 40% Accelerated Depreciation tax benefit in Year 1
      assertGreaterThan(comm100kW.year1TaxDepreciationBenefitINR, 400000, 'Year 1 tax depreciation savings should exceed ₹4 Lakhs');
      
      // Fast Payback
      assertBetween(comm100kW.paybackYears, 2.0, 4.0, 'Commercial solar payback must be between 2.0 and 4.0 years');
      
      // Substantial 30-year lifetime returns
      assertGreaterThan(comm100kW.lifetimeSavings30YrINR, 25000000, '30-Year savings for 100kW must exceed ₹2.5 Crores');
    });

    test('3.4 PM KUSUM Agriculture Solar Water Pump Sizing & Financial Model', () => {
      const pump7_5HP = calculateAgriPumpPackage(7.5);
      
      assertEqual(pump7_5HP.hp, 7.5, 'Pump rating should be 7.5 HP');
      assertEqual(pump7_5HP.totalPackageCost, 412500, '7.5 HP package cost @ ₹55k/HP = ₹4,12,500');
      assertEqual(pump7_5HP.totalGovtSubsidy, 247500, 'Total 60% Govt Subsidy = ₹2,47,500');
      assertEqual(pump7_5HP.bankLoan, 123750, '30% Bank Loan = ₹1,23,750');
      assertEqual(pump7_5HP.farmerShare, 41250, '10% Farmer Share = ₹41,250');
      
      assertGreaterThan(pump7_5HP.annualDieselSavingsINR, 35000, 'Annual diesel savings must exceed ₹35,000/yr');
    });

    test('3.5 Environmental Metrics: CO2 Offset & Trees Planted Calculations', () => {
      const plant5kW = calculateDetailedSolarMetrics({ systemKW: 5, dailyGen: 4.56 });
      assertGreaterThan(plant5kW.annualCO2Tons, 5.0, '5 kW plant should offset >5 tonnes CO2 annually');
      assertGreaterThan(plant5kW.treesPlantedEquivalent, 200, '5 kW plant should equate to >200 lifetime trees planted');

      const plant1MW = calculateDetailedSolarMetrics({ systemKW: 1000, dailyGen: 4.60, connectionType: 'industrial' });
      assertGreaterThan(plant1MW.annualCO2Tons, 1200, '1 MW plant should offset >1,200 tonnes CO2 annually');
      assertGreaterThan(plant1MW.treesPlantedEquivalent, 50000, '1 MW plant equates to >50,000 lifetime trees');
    });
  });
}
