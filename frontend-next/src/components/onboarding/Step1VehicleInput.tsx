'use client';

import React, { useState } from 'react';
import { Car, Search, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Step1Props {
  initialReg?: string;
  onSubmitReg: (reg: string) => void;
}

export const Step1VehicleInput: React.FC<Step1Props> = ({
  initialReg = 'TN 38 AB 1234',
  onSubmitReg,
}) => {
  const [regNumber, setRegNumber] = useState(initialReg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      onSubmitReg(regNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mx-auto shadow-[0_0_30px_rgba(255,184,0,0.5)]">
          <Car className="w-9 h-9 stroke-[2]" />
        </div>
        <h2 className="text-2xl font-bold font-mono text-white tracking-wide">
          REGISTER YOUR VEHICLE
        </h2>
        <p className="text-xs text-gray-300">
          Guardian OS requires a registered vehicle to generate your live Digital Twin.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-amber-400">VEHICLE REGISTRATION NUMBER</label>
        <div className="relative">
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            placeholder="e.g. TN 38 AB 1234"
            className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-base font-mono text-white tracking-wider focus:outline-none focus:border-[#FFB800] transition-colors"
          />
          <Search className="w-5 h-5 text-gray-500 absolute right-4 top-4" />
        </div>
      </div>

      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-400 font-mono">
        <ShieldAlert className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
        <p>
          Your registration number links your physical vehicle telemetry sensors directly into the
          SAVIRA Autonomous Reasoning Engine.
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        type="submit"
        rightIcon={<ArrowRight className="w-5 h-5" />}
      >
        Continue to Verification
      </Button>
    </form>
  );
};
