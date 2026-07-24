'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCardProps } from './GlassCard.types';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  goldBorder = false,
  hoverEffect = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative rounded-xl p-6 backdrop-blur-xl transition-all duration-500 overflow-hidden',
        goldBorder
          ? 'bg-[#111111]/80 border border-[#FFB800]/30 shadow-[0_0_25px_rgba(255,184,0,0.1)]'
          : 'bg-white/[0.04] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
        hoverEffect &&
          'hover:bg-white/[0.06] hover:border-[#FFB800]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(255,184,0,0.25)]',
        className
      )}
      {...props}
    >
      {/* Reflection Highlight */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      {children}
    </div>
  );
};
