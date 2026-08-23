export function formatINR(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKW(kw: number): string {
  if (kw >= 1000) {
    return `${(kw / 1000).toFixed(1)} MW`;
  }
  return `${kw % 1 === 0 ? kw : kw.toFixed(1)} kW`;
}

export function formatUnits(kwh: number): string {
  return `${new Intl.NumberFormat('en-IN').format(Math.round(kwh))} kWh`;
}

export function formatCO2(tonnes: number): string {
  return `${tonnes.toFixed(1)} Tonnes CO₂`;
}
