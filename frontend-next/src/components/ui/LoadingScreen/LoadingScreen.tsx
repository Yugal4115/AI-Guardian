'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingScreenProps } from './LoadingScreen.types';

const bootMessages = [
  'Initializing Guardian Core...',
  'Loading AI Modules...',
  'Preparing Vehicle Intelligence...',
  'Starting SAVIRA...',
  'Almost Ready...',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, className }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 100;
        }
        const nextProgress = prev + 2;
        const index = Math.min(
          Math.floor((nextProgress / 100) * bootMessages.length),
          bootMessages.length - 1
        );
        setMessageIndex(index);
        return nextProgress;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 text-white overflow-hidden',
        className
      )}
    >
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none animate-pulse-gold" />

      {/* Center Icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,184,0,0.5)] animate-bounce">
          <Shield className="w-10 h-10 fill-black" />
        </div>
        <Cpu className="absolute -bottom-2 -right-2 w-7 h-7 text-[#FFB800] animate-spin" />
      </div>

      {/* Brand Heading */}
      <h1 className="text-2xl font-bold tracking-widest text-white mb-2 font-mono">
        AI GUARDIAN OS
      </h1>
      <p className="text-xs text-[#FFB800] uppercase tracking-[0.3em] font-mono mb-10">
        Agentic Mobility Core
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-full h-2 p-0.5 mb-4 relative overflow-hidden backdrop-blur-md">
        <div
          className="h-full bg-gradient-to-r from-[#FFB800] via-[#FF8A00] to-[#00FF95] rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_#FFB800]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Log text */}
      <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
        <span className="text-[#FFB800]">{progress}%</span>
        <span>—</span>
        <span className="text-gray-200 animate-pulse">{bootMessages[messageIndex]}</span>
      </div>
    </div>
  );
};
