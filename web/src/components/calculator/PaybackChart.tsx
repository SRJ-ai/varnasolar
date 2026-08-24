import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface PaybackChartProps {
  netCostINR: number;
  annualSavingsINR: number;
}

export const PaybackChart: React.FC<PaybackChartProps> = ({ netCostINR, annualSavingsINR }) => {
  const data = useMemo(() => {
    const points = [];
    for (let year = 0; year <= 25; year++) {
      points.push({
        year: `Year ${year}`,
        cumulativeCashflow: -netCostINR + (annualSavingsINR * year),
      });
    }
    return points;
  }, [netCostINR, annualSavingsINR]);

  const paybackYear = netCostINR / annualSavingsINR;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const isProfit = val >= 0;
      return (
        <div className="bg-paper-card border border-ink/15 p-4 shadow-xl">
          <p className="label-mono text-ink-mute mb-2">{label}</p>
          <p className="font-display font-bold text-lg text-ink">
            {isProfit ? 'Net Savings: ' : 'Net Cost: '}
            <span className={isProfit ? 'text-sun' : 'text-ink-soft'}>
              ₹{Math.abs(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (tick: number) => {
    if (tick === 0) return '₹0';
    const isNegative = tick < 0;
    const abs = Math.abs(tick);
    if (abs >= 10000000) return `${isNegative ? '-' : ''}₹${(abs / 10000000).toFixed(1)}Cr`;
    if (abs >= 100000) return `${isNegative ? '-' : ''}₹${(abs / 100000).toFixed(1)}L`;
    return `${isNegative ? '-' : ''}₹${(abs / 1000).toFixed(1)}k`;
  };

  return (
    <div className="w-full h-80 md:h-96 bg-paper-card border border-ink/15 p-4 md:p-6 flex flex-col mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-display font-bold uppercase tracking-tight text-lg">25-Year Financial Projection</h4>
          <p className="text-xs text-ink-mute mt-1">Cumulative Cashflow (Break-even at ~{paybackYear.toFixed(1)} years)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-ink/20"></div><span className="text-[10px] uppercase tracking-wider">Cost</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-sun"></div><span className="text-[10px] uppercase tracking-wider">Profit</span></div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--sun)" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="var(--sun)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--ink-soft)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--ink-mute)" opacity={0.2} />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--ink-mute)', fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--ink-mute)', fontSize: 12 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--sun)', strokeWidth: 1, strokeDasharray: '5 5' }} />
            <ReferenceLine y={0} stroke="var(--ink-soft)" strokeDasharray="3 3" opacity={0.5} />
            
            {/* Break-even point marker */}
            <ReferenceLine x={`Year ${Math.ceil(paybackYear)}`} stroke="var(--sun)" opacity={0.3} />
            
            <Area 
              type="monotone" 
              dataKey="cumulativeCashflow" 
              strokeWidth={3}
              stroke="var(--sun)"
              fill="url(#colorCashflow)" 
              fillOpacity={1}
              animationDuration={1500}
              activeDot={{ r: 6, fill: 'var(--sun)', stroke: 'var(--paper)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
