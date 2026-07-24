'use client';

import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const Scene6Savira: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-16 py-24 relative z-10 text-center">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#FFB800] text-xs font-mono mb-6">
          <Sparkles className="w-4 h-4 animate-spin" />
          MEET YOUR AI COPILOT
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-2 font-mono">
          SAVIRA
        </h2>
        <p className="text-sm md:text-base text-amber-400 font-mono tracking-wider uppercase mb-8">
          Smart AI Virtual Intelligence Response Assistant
        </p>

        {/* Holographic Voice Monologue Glass Card */}
        <GlassCard goldBorder className="p-8 backdrop-blur-2xl max-w-xl mx-auto text-left shadow-[0_0_50px_rgba(255,184,0,0.2)]">
          <div className="flex items-center gap-3 mb-4 text-[#FFB800]">
            <Volume2 className="w-6 h-6 animate-pulse" />
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-4 bg-[#FFB800] rounded-full animate-bounce" />
              <span className="w-1.5 h-6 bg-[#FFB800] rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-3 bg-[#FFB800] rounded-full animate-bounce delay-200" />
              <span className="w-1.5 h-7 bg-[#FFB800] rounded-full animate-bounce delay-300" />
            </div>
          </div>

          <blockquote className="text-lg md:text-xl font-light text-white italic leading-relaxed">
            &ldquo;Hello. I am SAVIRA. Your Smart AI Virtual Intelligence Response Assistant.
            Guardian OS is ready.&rdquo;
          </blockquote>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>VOICE ENGINE: v2.4</span>
            <span className="text-[#00FF95]">LATENCY: 12ms</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
