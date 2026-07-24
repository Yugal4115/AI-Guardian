'use client';

import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <GlassCard goldBorder className="w-full max-w-md p-8 relative z-10 space-y-6 backdrop-blur-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mx-auto">
            <Shield className="w-6 h-6 fill-black" />
          </div>
          <h1 className="text-xl font-bold font-mono text-white">RECOVER PASSPHRASE</h1>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Registered Driver Email"
            className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
          />
          <Button variant="primary" size="lg" className="w-full">
            Send Reset Instructions
          </Button>
        </form>

        <div className="text-center text-xs text-gray-400 font-mono">
          Remembered passphrase?{' '}
          <Link href="/login" className="text-amber-400 hover:underline">
            Sign In
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
