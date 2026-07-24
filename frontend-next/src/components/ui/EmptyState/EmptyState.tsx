'use client';

import React, { ReactNode } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <GlassCard goldBorder className={`text-center p-8 space-y-4 max-w-md mx-auto ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-amber-400">
        {icon}
      </div>

      <div>
        <h3 className="font-mono text-base font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-400 font-mono leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </GlassCard>
  );
};
