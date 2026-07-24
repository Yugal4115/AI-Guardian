'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

interface RecommendationProps {
  title: string;
  recommendation: string;
  whyExplanation: string;
  attributionTags: string[];
}

export const RecommendationCard: React.FC<RecommendationProps> = ({
  title,
  recommendation,
  whyExplanation,
  attributionTags,
}) => {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <GlassCard goldBorder className="relative space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#FFB800]">
          <Sparkles className="w-4 h-4" />
          <h4 className="font-mono text-xs font-bold text-white tracking-wider">{title}</h4>
        </div>
        <button
          onClick={() => setShowWhy(!showWhy)}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-white bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>EXPLAIN WHY</span>
        </button>
      </div>

      <p className="text-sm text-gray-200 leading-relaxed font-light">{recommendation}</p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {attributionTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono bg-white/[0.05] text-gray-400 px-2 py-0.5 rounded border border-white/10"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Explainable AI Modal Overlay */}
      {showWhy && (
        <div className="absolute inset-0 z-30 bg-[#050505]/95 backdrop-blur-md p-5 rounded-xl border border-[#FFB800]/40 flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="text-xs font-mono font-bold text-[#FFB800]">
                EXPLAINABLE AI REASONING ATTRIBUTION
              </span>
              <button onClick={() => setShowWhy(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">{whyExplanation}</p>
          </div>
          <Button variant="glass" size="sm" className="w-full mt-3" onClick={() => setShowWhy(false)}>
            Close Attribution
          </Button>
        </div>
      )}
    </GlassCard>
  );
};
