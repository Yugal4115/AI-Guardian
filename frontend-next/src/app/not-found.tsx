'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <GlassCard goldBorder className="max-w-md p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FFB800] mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-mono text-white mb-2">404</h1>
          <h2 className="text-lg font-bold font-mono text-[#FFB800] mb-2">ROUTE NOT FOUND</h2>
          <p className="text-xs text-gray-400 font-mono">
            The requested Guardian OS telemetry sector does not exist or has been relocated.
          </p>
        </div>
        <Link href="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Guardian OS Base
          </Button>
        </Link>
      </GlassCard>
    </main>
  );
}
