'use client';

import React, { useState } from 'react';
import { KeyRound, QrCode, ShieldCheck, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export const MfaSetupCard: React.FC = () => {
  const [isMfaEnabled, setIsMfaEnabled] = useState(true);

  const toggleMfa = () => {
    setIsMfaEnabled(!isMfaEnabled);
    toast.success(isMfaEnabled ? 'MFA protection disabled.' : 'MFA protection enabled.');
  };

  return (
    <GlassCard space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#FFB800]" />
          <h3 className="text-sm font-bold text-white">MULTI-FACTOR AUTHENTICATION (MFA)</h3>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
            isMfaEnabled ? 'bg-[#00FF95]/20 text-[#00FF95]' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {isMfaEnabled ? 'ACTIVE' : 'DISABLED'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <QrCode className="w-4 h-4" />
            <span>TOTP Authenticator App</span>
          </div>
          <p className="text-[11px] text-gray-400">Google Authenticator / 1Password synchronized.</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SMS / Email OTP Backup</span>
          </div>
          <p className="text-[11px] text-gray-400">Fallback mobile OTP verification enabled.</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
          <span className="text-gray-400 text-[10px]">STEP-UP AUTH FOR REMOTE COMMANDS</span>
          <Button
            variant={isMfaEnabled ? 'secondary' : 'primary'}
            size="sm"
            onClick={toggleMfa}
            className="mt-2"
          >
            {isMfaEnabled ? 'Disable Step-up MFA' : 'Enable Step-up MFA'}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
