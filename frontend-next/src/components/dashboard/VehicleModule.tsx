'use client';

import React, { useState } from 'react';
import { DigitalTwinCanvas } from '@/components/three/DigitalTwinCanvas';
import { DigitalTwinModeBar } from '@/components/vehicle/DigitalTwinModeBar';
import { ComponentSidePanel } from '@/components/vehicle/ComponentSidePanel';
import { PredictiveMaintenanceCard } from '@/components/vehicle/PredictiveMaintenanceCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { useDigitalTwin } from '@/hooks/useDigitalTwin';
import { useVehicleHealth } from '@/hooks/useVehicleHealth';
import { CheckCircle2, Zap, Disc, Gauge, ShieldCheck, Activity } from 'lucide-react';

const tabs = ['Overview', 'Health', 'Diagnostics', 'Components', 'Maintenance', 'Energy', 'Specifications'];
const drivingModes = ['Range', 'Balanced', 'Cyber Sport', 'Autonomous Copilot'];

export const VehicleModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeMode, setActiveMode] = useState('Balanced');

  const { mode, setMode, selectedComponent, setSelectedComponent, clearSelection } = useDigitalTwin();
  const { subsystemHealthMap } = useVehicleHealth();

  const activeComponentDetail = selectedComponent
    ? subsystemHealthMap[selectedComponent] || {
        id: selectedComponent,
        name: `${selectedComponent} Subsystem`,
        healthPct: 99.4,
        status: 'HEALTHY',
        color: '#00FF95',
        tempCelsius: 32.0,
        loadPct: 40,
        predictedRulYears: 10.0,
        predictedRulKm: 200000,
        recommendation: `Subsystem ${selectedComponent} operating at peak thermal efficiency.`,
        whyAttribution: 'Microsecond telemetry signals zero harmonic anomaly.',
      }
    : null;

  return (
    <div className="space-y-8 relative">
      {/* Header & Tab Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono text-white tracking-tight">
            VEHICLE DIGITAL TWIN CENTER
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            FLAGSHIP 3D DIGITAL TWIN SYSTEM • REAL-TIME SENSOR FUSION
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto bg-white/[0.04] p-1.5 rounded-xl border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#FF8A00] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Flagship 3D Digital Twin Hero Viewport with 6-Mode Switcher */}
      <GlassCard goldBorder className="relative h-[480px] w-full p-0 overflow-hidden group shadow-[0_0_50px_rgba(255,184,0,0.15)]">
        {/* R3F Master Digital Twin Canvas */}
        <DigitalTwinCanvas
          mode={mode}
          selectedComponent={selectedComponent}
          onSelectComponent={(id) => setSelectedComponent(id)}
          healthMap={subsystemHealthMap}
        />

        {/* 6 Digital Twin Modes Floating Toolbar */}
        <DigitalTwinModeBar currentMode={mode} onSelectMode={(m) => setMode(m)} />
      </GlassCard>

      {/* Predictive Maintenance & Driving Dynamics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PredictiveMaintenanceCard />

        {/* Driving Dynamics Mode Selector */}
        <GlassCard hoverEffect space-y-4>
          <h3 className="font-mono text-sm font-bold text-white border-b border-white/10 pb-3">
            DRIVING DYNAMICS & REGEN PROFILE
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {drivingModes.map((dm) => (
              <button
                key={dm}
                onClick={() => setActiveMode(dm)}
                className={`p-3 rounded-xl flex items-center justify-between text-xs font-mono transition-all ${
                  activeMode === dm
                    ? 'bg-gradient-to-r from-[#FFB800]/20 to-transparent text-[#FFB800] border-l-4 border-[#FFB800] font-bold'
                    : 'bg-white/[0.03] text-gray-400 hover:text-white'
                }`}
              >
                <span>{dm}</span>
                {activeMode === dm && <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Slide-out Component Inspector Panel */}
      <ComponentSidePanel component={activeComponentDetail} onClose={clearSelection} />
    </div>
  );
};
