'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eye, Brain, LineChart, ShieldCheck, ArrowRight } from 'lucide-react';

export const Scene5Pipeline: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-16 py-24 relative z-10 text-center">
      <div className="max-w-3xl mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
          AUTONOMY INTELLIGENCE PIPELINE
        </h2>
        <p className="text-gray-300 text-base">
          Continuous closed-loop reasoning pipeline executing thousands of safety evaluations per second.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-5xl w-full">
        <GlassCard goldBorder className="flex-1 text-center p-6">
          <Eye className="w-8 h-8 text-[#FFB800] mx-auto mb-3" />
          <h4 className="font-mono font-bold text-white text-base mb-1">1. OBSERVE</h4>
          <p className="text-xs text-gray-400">Sensor stream ingestion</p>
        </GlassCard>

        <ArrowRight className="w-6 h-6 text-amber-400 rotate-90 md:rotate-0 hidden sm:block" />

        <GlassCard goldBorder className="flex-1 text-center p-6">
          <Brain className="w-8 h-8 text-[#FF8A00] mx-auto mb-3" />
          <h4 className="font-mono font-bold text-white text-base mb-1">2. REASON</h4>
          <p className="text-xs text-gray-400">SAVIRA agent context evaluation</p>
        </GlassCard>

        <ArrowRight className="w-6 h-6 text-amber-400 rotate-90 md:rotate-0 hidden sm:block" />

        <GlassCard goldBorder className="flex-1 text-center p-6">
          <LineChart className="w-8 h-8 text-[#00FF95] mx-auto mb-3" />
          <h4 className="font-mono font-bold text-white text-base mb-1">3. PREDICT</h4>
          <p className="text-xs text-gray-400">Hazard trajectory forecasting</p>
        </GlassCard>

        <ArrowRight className="w-6 h-6 text-amber-400 rotate-90 md:rotate-0 hidden sm:block" />

        <GlassCard goldBorder className="flex-1 text-center p-6">
          <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h4 className="font-mono font-bold text-white text-base mb-1">4. PROTECT</h4>
          <p className="text-xs text-gray-400">Autonomous execution & mitigation</p>
        </GlassCard>
      </div>
    </div>
  );
};
