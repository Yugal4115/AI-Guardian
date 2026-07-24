'use client';

import React from 'react';
import { Download, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export const PrivacyCenterCard: React.FC = () => {
  const handleDownloadData = () => {
    toast.success('GDPR Data Archive requested. Download link dispatched to email.', {
      icon: <CheckCircle2 className="w-5 h-5 text-[#00FF95]" />,
    });
  };

  return (
    <GlassCard space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#00FF95]" />
          <h3 className="text-sm font-bold text-white">PRIVACY & DATA CONSENT CENTER</h3>
        </div>
        <span className="text-[10px] text-gray-400">GDPR & CCPA COMPLIANT</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
          <h4 className="font-bold text-white">Download Personal Data Archive</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Export a full JSON/CSV copy of all vehicle telemetry, trip history, and driver telemetry records.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadData}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export GDPR Archive
          </Button>
        </div>

        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-3">
          <h4 className="font-bold text-red-400">Request Account & Data Deletion</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Permanently purge user credentials, vehicle digital twin telemetry, and AI models from Guardian OS servers.
          </p>
          <button
            onClick={() => toast.error('Account deletion request initiated.')}
            className="px-3.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-mono font-bold transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge User Credentials</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
