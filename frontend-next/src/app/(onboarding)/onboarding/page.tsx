'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { useVehicleStore } from '@/store/useVehicleStore';
import { searchVehicleByReg } from '@/services/vehicleService';
import { VehicleDigitalTwin } from '@/types/vehicle';
import { Step1VehicleInput } from '@/components/onboarding/Step1VehicleInput';
import { Step2VerifyVehicle } from '@/components/onboarding/Step2VerifyVehicle';
import { Step3Initialization } from '@/components/onboarding/Step3Initialization';
import { Step4SaviraWelcome } from '@/components/onboarding/Step4SaviraWelcome';

export default function OnboardingPage() {
  const router = useRouter();
  const { setVehicle, onboardingStep, setOnboardingStep } = useVehicleStore();

  const [regNumber, setRegNumber] = useState('TN 38 AB 1234');
  const [fetchedVehicle, setFetchedVehicle] = useState<VehicleDigitalTwin | null>(null);

  const handleStep1Submit = async (reg: string) => {
    setRegNumber(reg);
    const vehicleData = await searchVehicleByReg(reg);
    setFetchedVehicle(vehicleData);
    setOnboardingStep(2);
  };

  const handleStep2Confirm = () => {
    setOnboardingStep(3);
  };

  const handleStep3Complete = () => {
    if (fetchedVehicle) {
      setVehicle(fetchedVehicle);
    }
    setOnboardingStep(4);
  };

  const handleStep4Launch = () => {
    router.push('/dashboard/overview');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Ambient background */}
      <div className="absolute w-[500px] h-[500px] bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none animate-pulse-gold" />

      <GlassCard goldBorder className="w-full max-w-lg p-8 relative z-10 space-y-6 backdrop-blur-2xl">
        {/* Step Progress Indicator Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
          <span className="text-amber-400">VEHICLE ONBOARDING WIZARD</span>
          <span className="text-gray-400">STEP {onboardingStep} OF 4</span>
        </div>

        {/* Step Content Switcher */}
        {onboardingStep === 1 && (
          <Step1VehicleInput initialReg={regNumber} onSubmitReg={handleStep1Submit} />
        )}

        {onboardingStep === 2 && fetchedVehicle && (
          <Step2VerifyVehicle
            vehicle={fetchedVehicle}
            onConfirm={handleStep2Confirm}
            onSearchAgain={() => setOnboardingStep(1)}
          />
        )}

        {onboardingStep === 3 && (
          <Step3Initialization onComplete={handleStep3Complete} />
        )}

        {onboardingStep === 4 && (
          <Step4SaviraWelcome onLaunchDashboard={handleStep4Launch} />
        )}
      </GlassCard>
    </main>
  );
}
