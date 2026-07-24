'use client';

import React from 'react';
import { Sparkles, ArrowUpRight, ShieldAlert, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export interface AiInsightItem {
  id: string;
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  component: string;
  explanation: string;
  suggestedAction: string;
  timestamp: string;
}

const insights: AiInsightItem[] = [
  {
    id: 'i1',
    title: 'HV Battery Efficiency Boost (+8%)',
    priority: 'LOW',
    confidence: 99.4,
    component: '800V HV Battery Pack',
    explanation: 'Thermal pre-conditioning prior to supercharging reduced cell impedance load by 8.2%.',
    suggestedAction: 'Maintain active pre-conditioning route automation.',
    timestamp: '12m ago',
  },
  {
    id: 'i2',
    title: 'Front Tyre Tread Wear Uniformity Verified',
    priority: 'MEDIUM',
    confidence: 98.2,
    component: 'Pirelli P-Zero Tyres',
    explanation: 'Tread depth wear rate is uniform across all contact patches at 0.12mm / 1,000 km.',
    suggestedAction: 'Schedule tyre rotation at 50,000 km odometer mark.',
    timestamp: '1h ago',
  },
  {
    id: 'i3',
    title: 'Regen Energy Recovery Optimization (+12%)',
    priority: 'LOW',
    confidence: 99.8,
    component: 'Brembo Carbon-Ceramic Brakes',
    explanation: 'Proactive SAVIRA regen blending absorbed 88% of deceleration energy during urban transit.',
    suggestedAction: 'No action required. Friction pad wear is negligible.',
    timestamp: '3h ago',
  },
];

export const AiInsightFeed: React.FC = () => {
  return (
    <GlassCard goldBorder space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          <h3 className="font-mono text-sm font-bold text-white">SAVIRA CONTINUOUS AI INSIGHT FEED</h3>
        </div>
        <span className="text-[10px] font-mono text-[#00FF95]">REAL-TIME INFERENCE</span>
      </div>

      <div className="space-y-3">
        {insights.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-[#FFB800]/30 transition-all font-mono text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    item.priority === 'HIGH'
                      ? 'bg-red-500/20 text-red-400'
                      : item.priority === 'MEDIUM'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {item.priority} PRIORITY
                </span>
                <span className="text-white font-bold">{item.title}</span>
              </div>
              <span className="text-[10px] text-gray-500">{item.timestamp}</span>
            </div>

            <p className="text-gray-300 leading-relaxed">{item.explanation}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px]">
              <span className="text-amber-400 font-bold">COMPONENT: {item.component}</span>
              <div className="flex items-center gap-1.5 text-[#00FF95]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>CONFIDENCE: {item.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
