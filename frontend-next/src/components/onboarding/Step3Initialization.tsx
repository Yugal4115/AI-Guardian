'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const checklist = [
  'Creating Vehicle Profile',
  'Generating Digital Twin',
  'Loading AI Prediction Models',
  'Synchronizing Sensors',
  'Initializing Guardian AI',
  'Activating SAVIRA',
  'Connecting Cloud Services',
];

export const Step3Initialization: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [completedIndex, setCompletedIndex] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedIndex((prev) => {
        if (prev >= checklist.length - 1) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 800);
          return checklist.length - 1;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="space-y-6 text-center">
      <div className="relative w-20 h-20 mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,184,0,0.5)]">
          <Cpu className="w-10 h-10 animate-spin" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-mono text-white mb-1">
          GUARDIAN INITIALIZATION
        </h2>
        <p className="text-xs text-amber-400 font-mono">
          Creating digital twin & binding telemetry stream...
        </p>
      </div>

      <GlassCard className="p-5 text-left space-y-3 font-mono text-xs border border-white/10">
        {checklist.map((item, idx) => {
          const isDone = idx <= completedIndex;
          return (
            <div
              key={item}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isDone ? 'opacity-100 text-white' : 'opacity-30 text-gray-500'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isDone ? 'text-[#00FF95]' : 'text-gray-600'}`}
              />
              <span>{item}</span>
            </div>
          );
        })}
      </GlassCard>
    </div>
  );
};
