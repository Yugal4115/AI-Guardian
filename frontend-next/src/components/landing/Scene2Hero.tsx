'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Brain, LineChart, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const pillars = [
  {
    icon: <Eye className="w-6 h-6 text-[#FFB800]" />,
    title: 'Observe',
    desc: 'High-frequency telemetry stream & multi-modal sensor fusion.',
  },
  {
    icon: <Brain className="w-6 h-6 text-[#FF8A00]" />,
    title: 'Reason',
    desc: 'SAVIRA agentic memory & multi-agent threat attribution.',
  },
  {
    icon: <LineChart className="w-6 h-6 text-[#00FF95]" />,
    title: 'Predict',
    desc: 'Component RUL estimation & predictive hazard trajectory mapping.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
    title: 'Protect',
    desc: 'Autonomous priority execution & proactive cabin safety interventions.',
  },
];

export const Scene2Hero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 py-24 relative z-10 remix-grid">
      {/* Ambient Remix-Style Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] remix-glow-purple rounded-full pointer-events-none filter blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] remix-glow-blue rounded-full pointer-events-none filter blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] remix-glow-amber rounded-full pointer-events-none filter blur-[90px]" />

      <div className="max-w-3xl mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 text-amber-400 text-xs font-mono mb-6 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF95] animate-ping" />
          ENTERPRISE MOBILITY OS v2.0
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 font-mono leading-none">
          <span className="text-gradient-gold">GUARDIAN OS</span>
        </h1>

        <p className="text-xl md:text-3xl text-gray-200 font-light mb-6 font-mono tracking-wide leading-snug">
          The World&apos;s First <span className="text-[#FFB800] font-semibold">Fully Agentic AI</span> Operating System for Autonomous Mobility
        </p>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10 font-sans">
          Guardian OS acts as a digital co-pilot for autonomous vehicle fleets. It merges real-time sensor telemetry with multi-agent threat planning, safety-guarded executions, and explainable intelligence modules.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/login')}
            className="shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_35px_rgba(255,184,0,0.6)] transform hover:scale-[1.03] transition-all duration-300"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Launch OS Portal
          </Button>

          <Button
            variant="glass"
            size="lg"
            className="border-white/10 hover:bg-white/10 transform hover:scale-[1.03] transition-all duration-300"
            leftIcon={<Play className="w-4 h-4 fill-white" />}
          >
            Watch Demo
          </Button>
        </div>
      </div>

      {/* 4 Pillar Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mt-6">
        {pillars.map((item, idx) => (
          <div 
            key={idx} 
            className="glow-card-gold rounded-2xl p-6 transition-all duration-500 group cursor-pointer relative"
          >
            {/* Corner highlight element */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-tr-2xl rounded-bl-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-3 w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 mb-4 flex items-center justify-center group-hover:bg-[#FFB800]/10 group-hover:border-[#FFB800]/40 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-[#FFB800] transition-colors">
              {item.title}
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
