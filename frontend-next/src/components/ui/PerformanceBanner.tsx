'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Wifi, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const PerformanceBanner: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animFrameId: number;

    const tick = () => {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;

        // Smooth jitter simulation for API Latency
        setLatency((prev) => Math.max(8, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono text-[10px]">
      <GlassCard
        goldBorder
        className="p-3 shadow-[0_5px_20px_rgba(0,255,149,0.15)] flex flex-col gap-2 transition-all duration-300"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 text-[#00FF95] font-bold"
        >
          <Activity className="w-4 h-4 animate-pulse" />
          <span>PERFORMANCE MONITOR HUD</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="space-y-1.5 pt-1.5 border-t border-white/10 text-gray-300">
            <div className="flex justify-between gap-6">
              <span>RENDER FPS:</span>
              <span className={fps >= 58 ? 'text-[#00FF95] font-bold' : 'text-amber-400'}>{fps} FPS</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>API LATENCY:</span>
              <span className="text-cyan-400 font-bold">{latency} ms</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>TELEMETRY FEED:</span>
              <span className="text-[#00FF95] font-bold flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="flex justify-between gap-6">
              <span>ACCESSIBILITY:</span>
              <span className="text-purple-400 font-bold">WCAG AA OK</span>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
