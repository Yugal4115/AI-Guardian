'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert, Sparkles, Database } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ExplainableCardItem {
  id: string;
  title: string;
  whatHappened: string;
  whyHappened: string;
  dataUsed: string;
  confidencePct: number;
  ifIgnored: string;
  nextStep: string;
}

const explainableItems: ExplainableCardItem[] = [
  {
    id: 'e1',
    title: 'HV Cell Impedance & Thermal Optimization',
    whatHappened: 'SAVIRA automatically triggered cell thermal pre-conditioning 15 minutes before 350kW supercharging.',
    whyHappened: 'Pre-cooling reduced internal cell resistance by 8.2%, preventing thermal throttling.',
    dataUsed: '800V HV BMS CAN Bus telemetry, GPS ambient temperature, 350kW Supercharger occupancy queue.',
    confidencePct: 99.8,
    ifIgnored: 'Charging speed would slow by 35% due to thermal throttling, increasing charge duration by 12 minutes.',
    nextStep: 'Maintain active pre-conditioning automation setting in Guardian OS Settings.',
  },
  {
    id: 'e2',
    title: 'Adaptive Regen Braking & Carbon-Ceramic Pad Protection',
    whatHappened: 'Regenerative deceleration torque was dynamically increased from 60% to 88% during city driving.',
    whyHappened: 'Stop-and-go traffic speed patterns detected; kinetic energy recovery prioritized.',
    dataUsed: 'IMU G-force sensor, 77GHz Front Radar lead vehicle distance, Brake Pedal Position Sensor.',
    confidencePct: 99.4,
    ifIgnored: 'Brake pad wear would accelerate by 2.4x and overall vehicle range would drop by ~14 km.',
    nextStep: 'Keep driving mode set to "Balanced" or "Cyber Sport".',
  },
];

export const ExplainableAiCards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('e1');

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <GlassCard goldBorder space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#FFB800]" />
          <h3 className="font-mono text-sm font-bold text-white">EXPLAINABLE AI DECISION DECORDER (WHY?)</h3>
        </div>
        <span className="text-[10px] font-mono text-[#00FF95]">TRANSPARENT REASONING</span>
      </div>

      <div className="space-y-3">
        {explainableItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden font-mono text-xs transition-all"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{item.title}</h4>
                    <span className="text-[10px] text-[#00FF95]">SAVIRA CONFIDENCE: {item.confidencePct}%</span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 space-y-3 text-gray-300 border-t border-white/5 bg-black/40 text-[11px] leading-relaxed animate-fade-in">
                  <div>
                    <strong className="text-amber-400 block mb-0.5">1. WHAT HAPPENED?</strong>
                    <p>{item.whatHappened}</p>
                  </div>
                  <div>
                    <strong className="text-amber-400 block mb-0.5">2. WHY DID IT HAPPEN?</strong>
                    <p>{item.whyHappened}</p>
                  </div>
                  <div>
                    <strong className="text-cyan-400 flex items-center gap-1.5 mb-0.5">
                      <Database className="w-3 h-3" />
                      <span>3. WHICH DATA WAS USED?</span>
                    </strong>
                    <p className="italic text-gray-400">{item.dataUsed}</p>
                  </div>
                  <div>
                    <strong className="text-red-400 flex items-center gap-1.5 mb-0.5">
                      <ShieldAlert className="w-3 h-3" />
                      <span>4. WHAT HAPPENS IF IGNORED?</span>
                    </strong>
                    <p>{item.ifIgnored}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#00FF95]/10 border border-[#00FF95]/30 text-[#00FF95]">
                    <strong className="block font-bold">5. RECOMMENDED NEXT STEP:</strong>
                    <span>{item.nextStep}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
