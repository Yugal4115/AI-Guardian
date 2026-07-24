'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isOffline?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'SYSTEM ANOMALY DETECTED',
  description = 'Telemetry stream temporarily interrupted or API endpoint unreachable.',
  onRetry,
  isOffline = false,
}) => {
  return (
    <GlassCard goldBorder className="text-center p-8 space-y-5 max-w-md mx-auto border-red-500/30">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto">
        {isOffline ? <WifiOff className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
      </div>

      <div>
        <h3 className="font-mono text-base font-bold text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-400 font-mono leading-relaxed">{description}</p>
      </div>

      {onRetry && (
        <Button
          variant="primary"
          size="sm"
          onClick={onRetry}
          rightIcon={<RefreshCw className="w-4 h-4" />}
        >
          Re-initialize Telemetry Sync
        </Button>
      )}
    </GlassCard>
  );
};
