'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export const Scene1Darkness: React.FC<{ onExplore?: () => void }> = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-10">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(255,184,0,0.5)] animate-pulse-gold">
        <Shield className="w-10 h-10 fill-black" />
      </div>

      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-mono">
        AI GUARDIAN OS
      </h1>

      <p className="text-lg md:text-2xl text-amber-400 font-light max-w-2xl mb-8 tracking-wide">
        The World&apos;s First Fully Agentic AI Operating System for Intelligent Mobility
      </p>

      <div className="flex items-center gap-6 text-xs text-gray-400 uppercase tracking-[0.3em] font-mono">
        <span>Observe</span>
        <span>•</span>
        <span>Reason</span>
        <span>•</span>
        <span>Predict</span>
        <span>•</span>
        <span>Protect</span>
      </div>
    </div>
  );
};
