import { STATE_TARIFFS_DATA } from '../data/stateTariffs';
import { ConnectionType, SolarCalculationResult } from '../types/solar';

export function calculateSolarSavings(
  monthlyBill: number,
  stateCode: string = 'TG',
  connectionType: ConnectionType = 'residential',
  liveGenFactor?: number
): SolarCalculationResult {
  const stateData = STATE_TARIFFS_DATA.find((s) => s.code === stateCode) || STATE_TARIFFS_DATA.find((s) => s.code === 'TG') || STATE_TARIFFS_DATA[0];
  
  const tariffPerUnit = connectionType === 'residential' 
    ? (stateData.defaultTariff || 6.5) 
    : (stateData.commercialRate > 0 ? (stateData.commercialRate / 3000) : 9.5);

  const monthlyUnits = monthlyBill / tariffPerUnit;
  const dailyUnits = monthlyUnits / 30;
  const dailyGenPerKW = liveGenFactor || stateData.dailyGenFactor || 4.5;
  
  let rawKw = dailyUnits / dailyGenPerKW;
  if (rawKw < 1) rawKw = 1;
  const systemSizeKW = Math.round(rawKw * 10) / 10;
  const roofAreaRequiredSqFt = Math.round(systemSizeKW * 85);

  const dailyGenerationKWh = Math.round(systemSizeKW * dailyGenPerKW * 10) / 10;
  const monthlyGenerationKWh = Math.round(dailyGenerationKWh * 30);
  const annualGenerationKWh = Math.round(dailyGenerationKWh * 365);
  const lifetimeGenerationKWh30Yr = Math.round(annualGenerationKWh * 30 * 0.9);

  const baseCostPerKw = systemSizeKW <= 3.5 
    ? stateData.dcrCostPerKwTiers[0] 
    : systemSizeKW <= 5.5 
    ? stateData.dcrCostPerKwTiers[1] 
    : systemSizeKW <= 10 
    ? stateData.dcrCostPerKwTiers[2] 
    : stateData.dcrCostPerKwTiers[3];
  
  const grossCostINR = Math.round(systemSizeKW * baseCostPerKw);

  let centralSubsidyINR = 0;
  if (connectionType === 'residential') {
    if (systemSizeKW <= 1.2) {
      centralSubsidyINR = stateData.centralSubsidySlabs[0];
    } else if (systemSizeKW <= 2.2) {
      centralSubsidyINR = stateData.centralSubsidySlabs[0] + stateData.centralSubsidySlabs[1];
    } else {
      centralSubsidyINR = stateData.centralSubsidySlabs[0] + stateData.centralSubsidySlabs[1] + stateData.centralSubsidySlabs[2];
    }
  }

  const stateSubsidyINR = 0;
  const totalSubsidyINR = centralSubsidyINR + stateSubsidyINR;
  const netCostINR = Math.max(0, grossCostINR - totalSubsidyINR);

  const monthlySavingsINR = Math.round(Math.min(monthlyBill * 0.92, monthlyGenerationKWh * tariffPerUnit));
  const annualSavingsINR = Math.round(monthlySavingsINR * 12);
  const lifetimeSavingsINR30Yr = Math.round(annualSavingsINR * 30);

  const paybackPeriodYears = netCostINR > 0 && annualSavingsINR > 0 
    ? Math.round((netCostINR / annualSavingsINR) * 10) / 10 
    : 3.2;
  
  const roiPercentage = netCostINR > 0 
    ? Math.round((annualSavingsINR / netCostINR) * 100) 
    : 28;

  const co2OffsetTonnes30Yr = Math.round((lifetimeGenerationKWh30Yr * 0.82) / 1000 * 10) / 10;
  const treesPlantedEquivalent = Math.round(co2OffsetTonnes30Yr * 1.5);
  const coalSavedTonnes30Yr = Math.round(lifetimeGenerationKWh30Yr * 0.45 / 1000 * 10) / 10;

  return {
    systemSizeKW,
    roofAreaRequiredSqFt,
    dailyGenerationKWh,
    monthlyGenerationKWh,
    annualGenerationKWh,
    lifetimeGenerationKWh30Yr,
    grossCostINR,
    centralSubsidyINR,
    stateSubsidyINR,
    totalSubsidyINR,
    netCostINR,
    monthlySavingsINR,
    annualSavingsINR,
    lifetimeSavingsINR30Yr,
    paybackPeriodYears,
    roiPercentage,
    co2OffsetTonnes30Yr,
    treesPlantedEquivalent,
    coalSavedTonnes30Yr,
  };
}
