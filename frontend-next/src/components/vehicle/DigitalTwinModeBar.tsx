'use client';

import React from 'react';
import { DigitalTwinMode } from '@/hooks/useDigitalTwin';
import { Layers, Eye, Radio, Cpu, Sparkles, Activity } from 'lucide-react';

interface ModeBarProps {
  currentMode: DigitalTwinMode;
  onSelectMode: (mode: DigitalTwinMode) => void;
}

const modeButtons: Array<{ mode: DigitalTwinMode; label: string; icon: React.ReactNode }> = [
  { mode: 'STANDARD', label: 'Standard View', icon: <Eye className="w-3.5 h-3.5" /> },
  { mode: 'WIREFRAME', label: 'Wireframe Matrix', icon: <Layers className="w-3.5 h-3.5" /> },
  { mode: 'SENSOR', label: 'Sensor Overlay', icon: <Radio className="w-3.5 h-3.5" /> },
  { mode: 'COMPONENT', label: 'Powertrain Components', icon: <Cpu className="w-3.5 h-3.5" /> },
  { mode: 'EXPLODED', label: 'Exploded View', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { mode: 'HEALTH', label: 'Health Heatmap', icon: <Activity className="w-3.5 h-3.5" /> },
];

export const DigitalTwinModeBar: React.FC<ModeBarProps> = ({
  currentMode,
  onSelectMode,
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#050505]/90 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-x-auto max-w-[95%]">
      {modeButtons.map((b) => {
        const isActive = currentMode === b.mode;
        return (
          <button
            key={b.mode}
            onClick={() => onSelectMode(b.mode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 whitespace-nowrap ${
              isActive
                ? 'bg-gradient-to-r from-[#FFB800] to-[#FF8A00] text-black font-bold shadow-[0_0_15px_rgba(255,184,0,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {b.icon}
            <span>{b.label}</span>
          </button>
        );
      })}
    </div>
  );
};
