'use client';

import React from 'react';
import { CheckCircle2, RefreshCw, Car } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { VehicleDigitalTwin } from '@/types/vehicle';

interface Step2Props {
  vehicle: VehicleDigitalTwin;
  onConfirm: () => void;
  onSearchAgain: () => void;
}

export const Step2VerifyVehicle: React.FC<Step2Props> = ({
  vehicle,
  onConfirm,
  onSearchAgain,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF95]/10 border border-[#00FF95]/30 text-[#00FF95] text-xs font-mono mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>VEHICLE IDENTIFIED IN DATABASE</span>
        </div>
        <h2 className="text-2xl font-bold font-mono text-white">IS THIS YOUR VEHICLE?</h2>
        <p className="text-xs text-gray-300">
          Verify specification details before initializing Guardian Digital Twin.
        </p>
      </div>

      {/* Vehicle Spec Matrix Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-4 pb-3 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-white text-base">{vehicle.manufacturer}</h3>
            <p className="text-xs text-amber-400 font-mono">{vehicle.model} {vehicle.variant}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <span className="text-gray-400 block text-[10px]">VIN IDENTIFIER</span>
            <span className="text-white font-bold">{vehicle.vin}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">POWERTRAIN</span>
            <span className="text-white font-bold">{vehicle.fuelType}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">MODEL YEAR</span>
            <span className="text-white font-bold">{vehicle.modelYear}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">OWNER STATUS</span>
            <span className="text-[#00FF95] font-bold">VERIFIED OPERATOR</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={onSearchAgain}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Search Again
        </Button>
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={onConfirm}
          rightIcon={<CheckCircle2 className="w-4 h-4" />}
        >
          Confirm Vehicle
        </Button>
      </div>
    </div>
  );
};
