'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';

export const VoiceWaveform: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
  return (
    <div className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-amber-400">
      <Volume2 className={`w-4 h-4 ${isActive ? 'animate-pulse' : 'text-gray-500'}`} />
      <div className="flex items-center gap-1.5 h-4">
        <span className={`w-1 h-full bg-[#FFB800] rounded-full ${isActive ? 'animate-bounce' : ''}`} />
        <span className={`w-1 h-3/4 bg-[#FFB800] rounded-full ${isActive ? 'animate-bounce delay-100' : ''}`} />
        <span className={`w-1 h-full bg-[#00FF95] rounded-full ${isActive ? 'animate-bounce delay-200' : ''}`} />
        <span className={`w-1 h-1/2 bg-[#FFB800] rounded-full ${isActive ? 'animate-bounce delay-300' : ''}`} />
        <span className={`w-1 h-4/5 bg-[#FF8A00] rounded-full ${isActive ? 'animate-bounce delay-150' : ''}`} />
      </div>
    </div>
  );
};
