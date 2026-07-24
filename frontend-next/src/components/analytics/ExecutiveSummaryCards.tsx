'use client';

import React from 'react';
import { ShieldCheck, Activity, BatteryCharging, Clock, Sparkles, Award } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const ExecutiveSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* Guardian Score */}
      <GlassCard goldBorder hoverEffect space-y-2>
        <div className="flex items-center justify-between text-[#FFB800]">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-mono text-[#00FF95]">OPTIMAL</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">GUARDIAN SCORE</span>
          <p className="text-2xl font-mono font-extrabold text-white mt-0.5">98.4 / 100</p>
        </div>
      </GlassCard>

      {/* Vehicle Health */}
      <GlassCard hoverEffect space-y-2>
        <div className="flex items-center justify-between text-[#00FF95]">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-mono text-[#00FF95]">NOMINAL</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">VEHICLE HEALTH</span>
          <p className="text-2xl font-mono font-extrabold text-[#00FF95] mt-0.5">99.2%</p>
        </div>
      </GlassCard>

      {/* Driver Safety Index */}
      <GlassCard hoverEffect space-y-2>
        <div className="flex items-center justify-between text-cyan-400">
          <Award className="w-5 h-5" />
          <span className="text-[10px] font-mono text-cyan-400">EXPERT</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">SAFETY INDEX</span>
          <p className="text-2xl font-mono font-extrabold text-white mt-0.5">98.4 / 100</p>
        </div>
      </GlassCard>

      {/* Battery Health */}
      <GlassCard hoverEffect space-y-2>
        <div className="flex items-center justify-between text-[#FFB800]">
          <BatteryCharging className="w-5 h-5" />
          <span className="text-[10px] font-mono text-amber-400">800V HV</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">BATTERY HEALTH</span>
          <p className="text-2xl font-mono font-extrabold text-[#FFB800] mt-0.5">99.2%</p>
        </div>
      </GlassCard>

      {/* Predicted Vehicle Life */}
      <GlassCard hoverEffect space-y-2>
        <div className="flex items-center justify-between text-indigo-400">
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-mono text-indigo-400">RUL</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">PREDICTED LIFE</span>
          <p className="text-2xl font-mono font-extrabold text-white mt-0.5">12.4 Yrs</p>
        </div>
      </GlassCard>

      {/* SAVIRA AI Confidence */}
      <GlassCard hoverEffect space-y-2>
        <div className="flex items-center justify-between text-purple-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-mono text-purple-400">HIGH</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-gray-400">SAVIRA CONFIDENCE</span>
          <p className="text-2xl font-mono font-extrabold text-purple-400 mt-0.5">99.8%</p>
        </div>
      </GlassCard>
    </div>
  );
};
