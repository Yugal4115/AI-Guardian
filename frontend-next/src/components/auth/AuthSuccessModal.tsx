'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const checklist = [
  'Loading Guardian Core',
  'Authenticating Identity',
  'Initializing AI Modules',
  'Connecting Services',
];

export const AuthSuccessModal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [completedIndex, setCompletedIndex] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedIndex((prev) => {
        if (prev >= checklist.length - 1) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 600);
          return checklist.length - 1;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-xl flex items-center justify-center p-6 text-white">
      <GlassCard goldBorder className="w-full max-w-md p-8 text-center space-y-6 animate-pulse-gold">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mx-auto shadow-[0_0_40px_rgba(255,184,0,0.5)]">
          <ShieldCheck className="w-10 h-10 stroke-[2]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold font-mono text-white mb-1">
            AUTHENTICATION SUCCESSFUL
          </h2>
          <p className="text-xs text-amber-400 font-mono tracking-wider">
            Preparing your Guardian OS Workspace...
          </p>
        </div>

        <div className="space-y-3 text-left bg-white/[0.03] p-4 rounded-xl border border-white/10">
          {checklist.map((item, idx) => {
            const isDone = idx <= completedIndex;
            return (
              <div
                key={item}
                className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${
                  isDone ? 'opacity-100 text-white' : 'opacity-30 text-gray-500'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${isDone ? 'text-[#00FF95]' : 'text-gray-600'}`}
                />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
