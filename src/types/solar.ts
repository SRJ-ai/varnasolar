/**
 * Varna Solar - Solar & Calculator Domain Types
 */

export type IndianRegionZone = 'South' | 'North' | 'West' | 'East' | 'North-East' | 'UT';

export interface StateTariffInfo {
  id: number;
  code: string;
  name: string;
  dailyGenFactor: number; // kWh/kWp/day (e.g. 4.56 for Telangana)
  defaultTariff: number; // ₹/unit (e.g. 6.00 for domestic)
  peakSunHours: number; // hrs/day (e.g. 5.7)
  dcrCostPerKwTiers: [number, number, number, number]; // [<3.5kW, 3.5-5.3kW, 5.3-8.1kW, >8.1kW]
  nonDcrCostPerKwTiers: [number, number, number, number];
  centralSubsidySlabs: [number, number, number]; // [1st kW, 2nd kW, 3rd+ kW]
  commercialRate: number; // Base rate for commercial calculations
  policyNotes: string; // Specific state solar net metering & subsidy policy
  discoms: string[]; // State electricity distribution companies
  zone: IndianRegionZone;
}

export type CalculationMode = 'bill' | 'units' | 'area';
export type ConnectionType = 'residential' | 'commercial' | 'industrial' | 'agriculture';
export type PanelTierType = 'dcr' | 'nondcr' | 'bifacial' | 'topcon';

export interface SolarCalculationInput {
  mode: CalculationMode;
  value: number; // ₹ Bill, kWh Units, or Sq.Ft Area
  stateCode: string;
  connectionType: ConnectionType;
  panelType?: PanelTierType;
  customTariff?: number;
  roofUsableRatioPercent?: number; // default 70%
}

export interface SolarCalculationResult {
  systemSizeKW: number;
  roofAreaRequiredSqFt: number;
  dailyGenerationKWh: number;
  monthlyGenerationKWh: number;
  annualGenerationKWh: number;
  lifetimeGenerationKWh30Yr: number;
  grossCostINR: number;
  centralSubsidyINR: number;
  stateSubsidyINR: number;
  totalSubsidyINR: number;
  netCostINR: number;
  monthlySavingsINR: number;
  annualSavingsINR: number;
  lifetimeSavingsINR30Yr: number;
  paybackPeriodYears: number;
  roiPercentage: number;
  co2OffsetTonnes30Yr: number;
  treesPlantedEquivalent: number;
  coalSavedTonnes30Yr: number;
}

export interface SubsidySlabTier {
  capacityBracket: string;
  centralSubsidyINR: number;
  effectiveSubsidyRate: string;
  monthlySavingsRange: string;
  idealFor: string;
}

export interface PMKusumSchemeDetails {
  componentId: 'A' | 'B' | 'C';
  componentName: string;
  targetAudience: string;
  capacityRange: string;
  financialShare: {
    centralGovtSubsidyPct: number; // 30%
    stateGovtSubsidyPct: number;   // 30%
    bankLoanPct: number;           // 30%
    farmerContributionPct: number; // 10%
  };
  keyBenefits: string[];
  discomTariffPPA?: string;
}
