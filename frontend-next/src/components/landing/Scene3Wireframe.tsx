'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, Layers, Activity } from 'lucide-react';

export const Scene3Wireframe: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-end px-6 md:px-16 py-24 relative z-10">
      <div className="max-w-xl text-right">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-6">
          <Activity className="w-4 h-4 animate-spin" />
          DIGITAL TWIN MATRIX ACTIVATED
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
          PHYSICAL CHASSIS TO DIGITAL TWIN
        </h2>

        <p className="text-base text-gray-300 leading-relaxed mb-8">
          The physical vehicle body transforms into a live high-fidelity neural wireframe. Every body
          panel, structural beam, and sensor cluster streams microsecond telemetry directly into the
          Guardian AI Core.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard goldBorder className="text-left">
            <Cpu className="w-5 h-5 text-[#FFB800] mb-2" />
            <h4 className="text-sm font-bold text-white font-mono">10,000 Hz</h4>
            <p className="text-[11px] text-gray-400">Sensor Telemetry Sampling</p>
          </GlassCard>

          <GlassCard goldBorder className="text-left">
            <Layers className="w-5 h-5 text-[#00FF95] mb-2" />
            <h4 className="text-sm font-bold text-white font-mono">&lt; 2ms Latency</h4>
            <p className="text-[11px] text-gray-400">Digital Twin Syncing</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
