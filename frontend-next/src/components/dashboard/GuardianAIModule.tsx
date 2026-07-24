'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { SaviraFullPanel } from '@/components/savira/SaviraFullPanel';
import { BrainCircuit, FileText, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const GuardianAIModule: React.FC = () => {
  const [showFullCopilot, setShowFullCopilot] = useState(false);

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight">
            GUARDIAN AI INTELLIGENCE CENTER
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            SAVIRA Autonomous Cognition Engine • Grammar Intelligence & Guardrails Active
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowFullCopilot(true)}
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          Open Full SAVIRA Copilot
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard hoverEffect>
          <span className="text-[10px] font-mono text-gray-400">DRIVER SAFETY SCORE</span>
          <p className="text-3xl font-mono font-extrabold text-[#00FF95] mt-2">98.4 / 100</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1">Classified: Expert Driver</p>
        </GlassCard>

        <GlassCard hoverEffect>
          <span className="text-[10px] font-mono text-gray-400">FATIGUE DETECTION INDEX</span>
          <p className="text-3xl font-mono font-extrabold text-[#FFB800] mt-2">4%</p>
          <p className="text-[10px] text-[#00FF95] font-mono mt-1">Driver Alertness High</p>
        </GlassCard>

        <GlassCard hoverEffect>
          <span className="text-[10px] font-mono text-gray-400">DISTRACTION INDEX</span>
          <p className="text-3xl font-mono font-extrabold text-cyan-400 mt-2">1.2%</p>
          <p className="text-[10px] text-cyan-400 font-mono mt-1">Eye Gaze Centered</p>
        </GlassCard>

        <GlassCard hoverEffect>
          <span className="text-[10px] font-mono text-gray-400">COLLISION TRAJECTORY RISK</span>
          <p className="text-3xl font-mono font-extrabold text-[#00FF95] mt-2">0.002%</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1">Clear Horizon</p>
        </GlassCard>
      </div>

      {/* SAVIRA Intelligence & Reasoning Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard goldBorder space-y-4>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#FFB800]" />
              <h3 className="font-mono text-sm font-bold text-white">SAVIRA MULTI-AGENT REASONING</h3>
            </div>
            <span className="text-[10px] font-mono text-[#00FF95]">10,000 Hz STREAM</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[#FFB800] font-bold">[GRAMMAR ENGINE]</span>
              <p className="text-gray-300">Live prompt correction and intent normalization active.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[#FF8A00] font-bold">[DOMAIN GUARDRAILS]</span>
              <p className="text-gray-300">Interceptors bound to Intelligent Mobility & Guardian OS domain.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[#00FF95] font-bold">[EXPLAINABLE AI]</span>
              <p className="text-gray-300">Every prediction carries confidence %, risk level, & action time.</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard space-y-4>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white">AI DAILY & WEEKLY REPORTS</h3>
            </div>
          </div>

          <p className="text-xs text-gray-300 font-mono leading-relaxed">
            Daily AI summary compiled: 428km traveled across 3 trips. Zero safety interventions required. Total energy efficiency achieved: 162 Wh/km.
          </p>

          <Button variant="primary" size="md" className="w-full" leftIcon={<Sparkles className="w-4 h-4" />}>
            Download Full Guardian Intelligence Report
          </Button>
        </GlassCard>
      </div>

      {showFullCopilot && <SaviraFullPanel onClose={() => setShowFullCopilot(false)} />}
    </div>
  );
};
