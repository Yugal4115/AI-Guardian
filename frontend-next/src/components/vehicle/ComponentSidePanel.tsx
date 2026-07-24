'use client';

import React from 'react';
import { ComponentHealthDetail } from '@/hooks/useVehicleHealth';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { X, Sparkles, Activity, Thermometer, ShieldCheck, Clock } from 'lucide-react';

interface PanelProps {
  component: ComponentHealthDetail | null;
  onClose: () => void;
}

const mockGraphData = [
  { t: '1m', val: 99.2 },
  { t: '2m', val: 99.2 },
  { t: '3m', val: 99.1 },
  { t: '4m', val: 99.2 },
  { t: '5m', val: 99.2 },
];

export const ComponentSidePanel: React.FC<PanelProps> = ({ component, onClose }) => {
  if (!component) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-fade-in overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
              COMPONENT INSPECTOR
            </span>
            <h2 className="text-xl font-bold font-mono text-white mt-1">{component.name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Health Metric & RUL Card */}
        <GlassCard goldBorder space-y-4>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">SUBSYSTEM HEALTH</span>
            <span
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${component.color}20`, color: component.color }}
            >
              {component.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between font-mono">
            <span className="text-4xl font-extrabold text-white">{component.healthPct}%</span>
            <div className="text-right">
              <span className="text-sm font-bold text-[#00FF95]">~{component.predictedRulYears} Yrs</span>
              <span className="text-[10px] text-gray-400 block">PREDICTED RUL</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 text-gray-300">
            <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-lg">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span>TEMP: {component.tempCelsius}°C</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.03] p-2 rounded-lg">
              <Activity className="w-4 h-4 text-[#00FF95]" />
              <span>LOAD: {component.loadPct}%</span>
            </div>
          </div>
        </GlassCard>

        {/* Explainable AI Recommendation */}
        <GlassCard className="space-y-3">
          <div className="flex items-center gap-2 text-[#FFB800]">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-mono text-xs font-bold text-white">SAVIRA AI PREDICTION</h4>
          </div>
          <p className="text-xs text-gray-300 font-mono leading-relaxed">{component.recommendation}</p>
          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-gray-400 block mb-1 font-bold">REASONING WHY:</span>
            <p className="text-[11px] text-gray-400 italic font-light">{component.whyAttribution}</p>
          </div>
        </GlassCard>

        {/* Live Telemetry Graph */}
        <GlassCard className="space-y-3">
          <span className="text-xs font-mono font-bold text-white block">LIVE HEALTH STREAM</span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockGraphData}>
                <XAxis dataKey="t" stroke="#8B8B8B" fontSize={10} />
                <YAxis stroke="#8B8B8B" fontSize={10} domain={[98, 100]} />
                <Area type="monotone" dataKey="val" stroke="#00FF95" fill="#00FF9520" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <Button variant="primary" size="md" className="w-full mt-6" onClick={onClose}>
        Close Inspection Panel
      </Button>
    </div>
  );
};
