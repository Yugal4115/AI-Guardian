'use client';

import React from 'react';
import { Calendar, ShieldCheck, Wrench } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const PredictiveMaintenanceCard: React.FC = () => {
  return (
    <GlassCard goldBorder space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFB800]" />
          <h3 className="font-mono text-sm font-bold text-white">PREDICTIVE MAINTENANCE TIMELINE</h3>
        </div>
        <span className="text-[10px] font-mono text-[#00FF95]">ZERO URGENT SERVICE</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench className="w-4 h-4 text-[#FFB800]" />
            <div>
              <p className="text-white font-bold">Tyre Rotation Service</p>
              <p className="text-[10px] text-gray-400">Scheduled at 50,000 km Odometer</p>
            </div>
          </div>
          <span className="text-amber-400 font-bold">In ~8,200 km</span>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#00FF95]" />
            <div>
              <p className="text-white font-bold">Brake Fluid & Coolant Flush</p>
              <p className="text-[10px] text-gray-400">Scheduled at 100,000 km Odometer</p>
            </div>
          </div>
          <span className="text-[#00FF95] font-bold">In ~58,000 km</span>
        </div>
      </div>
    </GlassCard>
  );
};
