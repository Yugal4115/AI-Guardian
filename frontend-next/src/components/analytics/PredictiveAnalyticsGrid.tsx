'use client';

import React from 'react';
import { Calendar, ChevronRight, Activity, Percent } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface PredictionItem {
  id: string;
  name: string;
  probability: number;
  confidence: number;
  estDate: string;
  reason: string;
  action: string;
}

const predictions: PredictionItem[] = [
  {
    id: 'p1',
    name: 'Rear Tyres Rotational Alignment Check',
    probability: 92,
    confidence: 98.4,
    estDate: 'Sept 15, 2026',
    reason: 'Dynamic friction telemetry shows rear tread wearing 4% faster than front tires.',
    action: 'Schedule 50,000 km tire rotation service.',
  },
  {
    id: 'p2',
    name: 'Brake Pad Replacement Estimation',
    probability: 45,
    confidence: 99.2,
    estDate: 'Feb 12, 2027',
    reason: 'Friction pad thickness wear is currently uniform at 0.08mm / 10,000 km.',
    action: 'No immediate action. Continuous monitoring active.',
  },
];

export const PredictiveAnalyticsGrid: React.FC = () => {
  return (
    <GlassCard space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFB800]" />
          <h3 className="font-mono text-sm font-bold text-white">SAVIRA PREDICTIVE DIAGNOSTICS</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3 font-mono text-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-bold">{p.name}</p>
                <p className="text-[10px] text-amber-400 mt-0.5">ESTIMATED DATE: {p.estDate}</p>
              </div>
              <span className="text-xs font-bold text-[#00FF95] bg-[#00FF95]/10 px-2 py-0.5 rounded">
                {p.probability}% PROB
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-[11px]">{p.reason}</p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
              <span>ACTION: {p.action}</span>
              <span className="text-[#00FF95]">CONFIDENCE: {p.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
