import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VehicleDigitalTwin } from '@/types/vehicle';

interface VehicleStore {
  vehicle: VehicleDigitalTwin | null;
  hasRegisteredVehicle: boolean;
  onboardingStep: number;
  setVehicle: (vehicle: VehicleDigitalTwin) => void;
  setOnboardingStep: (step: number) => void;
  resetOnboarding: () => void;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set) => ({
      vehicle: null,
      hasRegisteredVehicle: false,
      onboardingStep: 1,
      setVehicle: (vehicle) =>
        set({ vehicle, hasRegisteredVehicle: true, onboardingStep: 4 }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      resetOnboarding: () =>
        set({ vehicle: null, hasRegisteredVehicle: false, onboardingStep: 1 }),
    }),
    {
      name: 'guardian_vehicle_twin_session',
    }
  )
);
