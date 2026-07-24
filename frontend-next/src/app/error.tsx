'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Guardian OS Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <GlassCard goldBorder className="max-w-md p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-mono text-white mb-2">SYSTEM FAULT DETECTED</h1>
          <p className="text-xs text-gray-400 font-mono">
            {error.message || 'An unexpected anomaly occurred in Guardian OS core runtime.'}
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => reset()} rightIcon={<RefreshCw className="w-4 h-4" />}>
          Re-initialize Operating System
        </Button>
      </GlassCard>
    </main>
  );
}
