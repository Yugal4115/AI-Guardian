'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { GrammarCorrection } from '@/services/saviraEngine';

export const GrammarBadge: React.FC<{ grammar: GrammarCorrection }> = ({ grammar }) => {
  if (!grammar.hasCorrection) return null;

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30 my-1">
      <Sparkles className="w-3.5 h-3.5" />
      <span>
        Grammar Corrected: <strong className="text-white">&ldquo;{grammar.corrected}&rdquo;</strong>
      </span>
    </div>
  );
};
