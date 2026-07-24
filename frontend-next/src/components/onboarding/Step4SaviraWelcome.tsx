'use client';

import React from 'react';
import { Volume2, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export const Step4SaviraWelcome: React.FC<{ onLaunchDashboard: () => void }> = ({
  onLaunchDashboard,
}) => {
  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#FFB800] text-xs font-mono">
        <Sparkles className="w-4 h-4 animate-spin" />
        SAVIRA ACTIVATED
      </div>

      <GlassCard goldBorder className="p-6 text-left space-y-4 shadow-[0_0_40px_rgba(255,184,0,0.25)]">
        <div className="flex items-center gap-3 text-[#FFB800]">
          <Volume2 className="w-6 h-6 animate-pulse" />
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-4 bg-[#FFB800] rounded-full animate-bounce" />
            <span className="w-1.5 h-6 bg-[#FFB800] rounded-full animate-bounce delay-100" />
            <span className="w-1.5 h-3 bg-[#FFB800] rounded-full animate-bounce delay-200" />
            <span className="w-1.5 h-7 bg-[#FFB800] rounded-full animate-bounce delay-300" />
          </div>
        </div>

        <p className="text-base font-light text-white italic leading-relaxed">
          &ldquo;Good Evening. Your vehicle has been successfully registered. Guardian OS has created
          a secure Digital Twin. From now on I will continuously monitor your vehicle, predict
          maintenance, optimize routes, provide intelligent recommendations, and help keep every
          journey safer. Welcome to Guardian OS.&rdquo;
        </p>

        <div className="pt-3 border-t border-white/10 flex justify-between text-xs font-mono text-gray-400">
          <span>DIGITAL TWIN: LIVE</span>
          <span className="text-[#00FF95]">SAVIRA READY</span>
        </div>
      </GlassCard>

      <Button
        variant="primary"
        size="lg"
        className="w-full text-base py-4"
        onClick={onLaunchDashboard}
        rightIcon={<Rocket className="w-5 h-5" />}
      >
        Launch Dashboard
      </Button>
    </div>
  );
};
