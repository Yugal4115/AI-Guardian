'use client';

import React from 'react';
import { Zap, Thermometer, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface BatteryCardProps {
  soc: number;
  temp: number;
  estimatedRangeKm?: number;
}

export const BatteryCard: React.FC<BatteryCardProps> = ({
  soc,
  temp,
  estimatedRangeKm = 342,
}) => {
  return (
    <GlassCard hoverEffect space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-[#00FF95]">
          <Zap className="w-5 h-5" />
          <h4 className="font-mono text-sm font-bold text-white">BATTERY & ENERGY</h4>
        </div>
        <span className="text-[10px] font-mono text-[#00FF95] bg-[#00FF95]/10 px-2.5 py-0.5 rounded-full border border-[#00FF95]/30">
          HEALTH: 99.2%
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{soc}%</span>
          <span className="text-xs text-gray-400 font-mono ml-2">SOC</span>
        </div>
        <div className="text-right font-mono">
          <span className="text-lg font-bold text-[#00FF95]">{estimatedRangeKm} km</span>
          <span className="text-[10px] text-gray-400 block">EST. RANGE</span>
        </div>
      </div>

      {/* SOC Progress bar */}
      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#FFB800] via-[#00FF95] to-[#00FF95] rounded-full transition-all duration-500"
          style={{ width: `${soc}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 text-gray-400">
        <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-lg">
          <Thermometer className="w-4 h-4 text-amber-400" />
          <span>CELL TEMP: {temp}°C</span>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-[#00FF95]" />
          <span>VOLTAGE: 784V</span>
        </div>
      </div>
    </GlassCard>
  );
};
