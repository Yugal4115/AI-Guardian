'use client';

import { useMemo } from 'react';

export interface ComponentHealthDetail {
  id: string;
  name: string;
  healthPct: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  color: string;
  tempCelsius: number;
  loadPct: number;
  predictedRulYears: number;
  predictedRulKm: number;
  recommendation: string;
  whyAttribution: string;
}

export function useVehicleHealth() {
  const subsystemHealthMap: Record<string, ComponentHealthDetail> = useMemo(
    () => ({
      Battery: {
        id: 'Battery',
        name: '800V High-Voltage Battery Pack',
        healthPct: 99.2,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 28.4,
        loadPct: 42,
        predictedRulYears: 12.4,
        predictedRulKm: 280000,
        recommendation: 'Pre-condition cell thermal state prior to 350kW supercharging.',
        whyAttribution: 'Cell degradation rate is 0.02% per 10,000 km, operating well within nominal manufacturing bounds.',
      },
      Motor: {
        id: 'Motor',
        name: 'Dual Permanent Magnet Electric Motors',
        healthPct: 100.0,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 48.0,
        loadPct: 35,
        predictedRulYears: 15.0,
        predictedRulKm: 350000,
        recommendation: 'Torque vectoring distribution is running in optimal 40:60 AWD split.',
        whyAttribution: 'Inverter frequency modulation is synchronized with zero harmonic distortion.',
      },
      Tyres: {
        id: 'Tyres',
        name: 'Pirelli P-Zero Elect Smart Tyres',
        healthPct: 95.0,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 32.1,
        loadPct: 50,
        predictedRulYears: 3.2,
        predictedRulKm: 42000,
        recommendation: 'Rotate front-rear tires at 50,000 km odometer mark.',
        whyAttribution: 'Tread depth wear rate is uniform across all four contact patches at 0.12mm / 1,000 km.',
      },
      Brakes: {
        id: 'Brakes',
        name: 'Brembo Carbon-Ceramic Brakes',
        healthPct: 98.4,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 64.2,
        loadPct: 12,
        predictedRulYears: 8.5,
        predictedRulKm: 180000,
        recommendation: 'Regen braking accounts for 88% of deceleration energy.',
        whyAttribution: 'Friction brake pad wear is negligible due to proactive SAVIRA regen blending.',
      },
      Suspension: {
        id: 'Suspension',
        name: 'Active Air Suspension & Damping',
        healthPct: 100.0,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 24.0,
        loadPct: 28,
        predictedRulYears: 10.0,
        predictedRulKm: 220000,
        recommendation: 'Air spring pressure is calibrated to 7.2 Bar.',
        whyAttribution: 'Dynamic damper valves respond in 2 milliseconds to road bump impulses.',
      },
      Transmission: {
        id: 'Transmission',
        name: 'Single-Speed Direct Drive Gearbox',
        healthPct: 99.8,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 41.5,
        loadPct: 38,
        predictedRulYears: 14.0,
        predictedRulKm: 320000,
        recommendation: 'Gearbox oil viscosity is nominal.',
        whyAttribution: 'Gear mesh acoustic telemetry shows zero anomalous vibration peaks.',
      },
      Cooling: {
        id: 'Cooling',
        name: 'Glycol Dual-Loop Liquid Cooling',
        healthPct: 97.8,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 22.0,
        loadPct: 15,
        predictedRulYears: 7.0,
        predictedRulKm: 150000,
        recommendation: 'Coolant pump flow rate is 18 L/min.',
        whyAttribution: 'Thermal dissipation capacity maintains 15°C margin under peak load.',
      },
      LiDAR: {
        id: 'LiDAR',
        name: 'Roof-Mounted 1550nm Solid-State LiDAR',
        healthPct: 100.0,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 26.0,
        loadPct: 60,
        predictedRulYears: 12.0,
        predictedRulKm: 250000,
        recommendation: 'Optical window self-cleaning heater active.',
        whyAttribution: 'Point cloud density is 2.4 million points/second with 0% ray occlusion.',
      },
      Radar: {
        id: 'Radar',
        name: '77GHz Long-Range Front Radar',
        healthPct: 99.5,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 30.0,
        loadPct: 40,
        predictedRulYears: 12.0,
        predictedRulKm: 250000,
        recommendation: 'Target tracking locked on lead vehicle at 65 meters.',
        whyAttribution: 'Doppler velocity resolution is accurate to 0.05 m/s.',
      },
    }),
    []
  );

  return { subsystemHealthMap };
}
