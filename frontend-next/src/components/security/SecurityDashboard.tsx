'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Key, Shield } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const SecurityDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
      {/* Zero Trust Status */}
      <GlassCard goldBorder className="flex items-center gap-4 hover:scale-102 transition-transform">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#00FF95]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] text-gray-400">ZERO TRUST ACCESS</span>
          <p className="text-lg font-bold text-white mt-0.5">ENFORCED</p>
        </div>
      </GlassCard>

      {/* Security Health Score */}
      <GlassCard className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FFB800]">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] text-gray-400">SECURITY INDEX</span>
          <p className="text-lg font-bold text-white mt-0.5">99.8 / 100</p>
        </div>
      </GlassCard>

      {/* Active Sessions */}
      <GlassCard className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Key className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] text-gray-400">ACTIVE DEVICE SESSIONS</span>
          <p className="text-lg font-bold text-white mt-0.5">3 Connected</p>
        </div>
      </GlassCard>

      {/* Blocked Requests */}
      <GlassCard className="flex items-center gap-4 border-red-500/20">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] text-gray-400">BLOCKED ANOMALIES</span>
          <p className="text-lg font-bold text-red-400 mt-0.5">0 Threat Triggers</p>
        </div>
      </GlassCard>
    </div>
  );
};
