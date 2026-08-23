export type IndianRegionZone = 'South' | 'North' | 'West' | 'East' | 'North-East' | 'UT';

export interface StateTariffInfo {
  id: number;
  code: string;
  name: string;
  dailyGenFactor: number;
  defaultTariff: number;
  peakSunHours: number;
  dcrCostPerKwTiers: [number, number, number, number];
  nonDcrCostPerKwTiers: [number, number, number, number];
  centralSubsidySlabs: [number, number, number];
  commercialRate: number;
  policyNotes: string;
  discoms: string[];
  zone: IndianRegionZone;
}

export type CalculationMode = 'bill' | 'units' | 'area';
export type ConnectionType = 'residential' | 'commercial' | 'industrial' | 'agriculture';
export type PanelTierType = 'dcr' | 'nondcr' | 'bifacial' | 'topcon';

export interface SolarCalculationInput {
  mode: CalculationMode;
  value: number;
  stateCode: string;
  connectionType: ConnectionType;
  panelType?: PanelTierType;
  customTariff?: number;
  roofUsableRatioPercent?: number;
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
    centralGovtSubsidyPct: number;
    stateGovtSubsidyPct: number;
    bankLoanPct: number;
    farmerContributionPct: number;
  };
  keyBenefits: string[];
  discomTariffPPA?: string;
}
