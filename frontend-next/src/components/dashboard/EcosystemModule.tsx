'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Network, Map, Cpu, CloudSync, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const EcosystemModule: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight">
          CONNECTED ECOSYSTEM MODULE
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          HD Vector Navigation Maps • Fleet Mesh Architecture • OTA Cloud Synchronizer
        </p>
      </div>

      {/* Map Simulation Container */}
      <GlassCard goldBorder className="h-72 w-full relative p-6 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D111A] to-[#050505] opacity-90 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-mono text-sm font-bold text-white">LIVE HD VECTOR NAVIGATION</h3>
          </div>
          <span className="text-[10px] font-mono text-[#00FF95] bg-[#00FF95]/10 px-3 py-1 rounded-full border border-[#00FF95]/30">
            GPS LOCK: 14 SATELLITES
          </span>
        </div>

        <div className="relative z-10 flex items-end justify-between font-mono text-xs">
          <div>
            <p className="text-gray-400">DESTINATION</p>
            <p className="text-lg font-bold text-white">Silicon Valley Tech Center</p>
            <p className="text-amber-400">ETA: 18 mins (14.2 km) • Smooth Traffic</p>
          </div>

          <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            Expand Full Map
          </Button>
        </div>
      </GlassCard>

      {/* Ecosystem Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverEffect space-y-3>
          <Network className="w-6 h-6 text-cyan-400" />
          <h3 className="font-mono text-sm font-bold text-white">FLEET MESH NETWORK</h3>
          <p className="text-xs text-gray-300 font-mono">
            Connected to 42 nearby Guardian OS vehicles sharing real-time traction and hazard maps.
          </p>
        </GlassCard>

        <GlassCard hoverEffect space-y-3>
          <Cpu className="w-6 h-6 text-[#FFB800]" />
          <h3 className="font-mono text-sm font-bold text-white">OTA SOFTWARE UPDATES</h3>
          <p className="text-xs text-gray-300 font-mono">
            Firmware v2.0.4 Installed. SAVIRA neural speech synthesis v2.4 up-to-date.
          </p>
        </GlassCard>

        <GlassCard hoverEffect space-y-3>
          <CloudSync className="w-6 h-6 text-[#00FF95]" />
          <h3 className="font-mono text-sm font-bold text-white">CLOUD DIGITAL TWIN SYNC</h3>
          <p className="text-xs text-gray-300 font-mono">
            Encrypted backup synced 30 seconds ago. Complete vehicle telemetry snapshot saved.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
