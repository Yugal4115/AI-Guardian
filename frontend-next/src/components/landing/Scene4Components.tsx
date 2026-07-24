'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle2 } from 'lucide-react';

const componentList = [
  'Battery',
  'Motor',
  'Tyres',
  'Brakes',
  'Suspension',
  'GPS',
  'Radar',
  'Camera',
  'LiDAR',
  'Engine',
  'ABS',
  'Transmission',
];

interface Scene4Props {
  activeComponent: string | null;
  onSelectComponent: (comp: string) => void;
}

export const Scene4Components: React.FC<Scene4Props> = ({
  activeComponent,
  onSelectComponent,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 relative z-10">
      <div className="max-w-2xl mb-12">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 font-mono">
          COMPONENT HEALTH DIAGNOSTICS
        </h2>
        <p className="text-gray-300 text-sm md:text-base">
          Interactive neural activation of critical vehicle subsystems. Select any component to inspect
          real-time sensor telemetry and Remaining Useful Life (RUL).
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl">
        {componentList.map((comp) => {
          const isActive = activeComponent === comp;
          return (
            <GlassCard
              key={comp}
              onClick={() => onSelectComponent(comp)}
              className={`cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'border-[#00FF95] bg-[#00FF95]/10 shadow-[0_0_20px_rgba(0,255,149,0.3)]'
                  : 'hover:border-amber-400/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-white">{comp}</span>
                <CheckCircle2
                  className={`w-4 h-4 ${isActive ? 'text-[#00FF95]' : 'text-gray-600'}`}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">
                {isActive ? 'STATUS: OPTIMAL' : 'HEALTH: 99.8%'}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
