'use client';

import React from 'react';
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { TrendingUp, Battery } from 'lucide-react';

const batteryTrendData = [
  { day: 'Day 1', soc: 99.8, rangeKm: 520 },
  { day: 'Day 5', soc: 99.6, rangeKm: 518 },
  { day: 'Day 10', soc: 99.5, rangeKm: 517 },
  { day: 'Day 15', soc: 99.4, rangeKm: 516 },
  { day: 'Day 20', soc: 99.3, rangeKm: 515 },
  { day: 'Day 25', soc: 99.3, rangeKm: 515 },
  { day: 'Day 30', soc: 99.2, rangeKm: 514 },
];

const safetyTrendData = [
  { wk: 'Wk 1', safety: 94.2, efficiency: 88.0 },
  { wk: 'Wk 2', safety: 95.8, efficiency: 90.5 },
  { wk: 'Wk 3', safety: 97.1, efficiency: 93.2 },
  { wk: 'Wk 4', safety: 98.4, efficiency: 96.0 },
];

export const TrendAnalysisCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Battery Capacity & Range Evolution */}
      <GlassCard space-y-4>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
          <div className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-[#FFB800]" />
            <h3 className="text-sm font-bold text-white">BATTERY CAPACITY & RANGE TREND (30 DAYS)</h3>
          </div>
          <span className="text-[10px] text-[#00FF95]">-0.02% DEGRADATION</span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={batteryTrendData}>
              <XAxis dataKey="day" stroke="#8B8B8B" fontSize={10} />
              <YAxis stroke="#8B8B8B" fontSize={10} domain={[98, 100]} />
              <Tooltip
                contentStyle={{ background: '#111111', border: '1px solid rgba(255,184,0,0.3)', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="soc" stroke="#FFB800" fill="#FFB80020" name="Battery Health %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Chart 2: Driver Safety Index & Efficiency */}
      <GlassCard space-y-4>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00FF95]" />
            <h3 className="text-sm font-bold text-white">SAFETY & ENERGY EFFICIENCY TREND</h3>
          </div>
          <span className="text-[10px] text-[#00FF95]">+8.0% EFFICIENCY BOOST</span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safetyTrendData}>
              <XAxis dataKey="wk" stroke="#8B8B8B" fontSize={10} />
              <YAxis stroke="#8B8B8B" fontSize={10} domain={[85, 100]} />
              <Tooltip
                contentStyle={{ background: '#111111', border: '1px solid rgba(0,255,149,0.3)', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="safety" stroke="#00FF95" strokeWidth={2} name="Safety Score" />
              <Line type="monotone" dataKey="efficiency" stroke="#FF8A00" strokeWidth={2} name="Efficiency Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
