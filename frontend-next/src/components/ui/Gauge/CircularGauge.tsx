'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

interface CircularGaugeProps {
  value: number;
  max?: number;
  title: string;
  unit?: string;
  color?: string;
  subtitle?: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  max = 100,
  title,
  unit = '',
  color = '#FFB800',
  subtitle,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <GlassCard hoverEffect className="flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      <div className="relative w-32 h-32 flex items-center justify-center mb-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-white tracking-tighter">
            {value}
          </span>
          {unit && <span className="text-[10px] text-gray-400 font-mono">{unit}</span>}
        </div>
      </div>

      <h4 className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase">{title}</h4>
      {subtitle && <p className="text-[10px] text-gray-400 font-mono mt-1">{subtitle}</p>}
    </GlassCard>
  );
};
