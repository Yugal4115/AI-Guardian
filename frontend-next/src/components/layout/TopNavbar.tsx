'use client';

import React from 'react';
import { Search, Bell, Wifi, User, CloudSun, ShieldCheck, Command } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useVehicleStore } from '@/store/useVehicleStore';

interface TopNavbarProps {
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  onOpenShortcutsHelp?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  onOpenShortcutsHelp,
}) => {
  const { user } = useAuthStore();
  const { vehicle } = useVehicleStore();

  return (
    <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Left: Vehicle Connected & Guardian Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF95] shadow-[0_0_8px_#00FF95] animate-pulse" />
          <span className="text-xs font-mono text-gray-200">
            {vehicle?.vin || 'VIN-984021-X'} • {vehicle?.model || 'NIO GT-X'}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>GUARDIAN OPTIMAL</span>
        </div>
      </div>

      {/* Center: Global Search Bar / Command Launcher */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center gap-3 bg-white/[0.04] border border-white/10 hover:border-amber-500/40 rounded-xl px-4 py-2 text-xs font-mono text-gray-400 w-64 md:w-80 transition-all duration-300 shadow-inner"
      >
        <Search className="w-4 h-4 text-amber-400" />
        <span>Search commands or telemetries...</span>
        <kbd className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Right: Shortcuts, Weather, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {onOpenShortcutsHelp && (
          <button
            onClick={onOpenShortcutsHelp}
            title="Keyboard Shortcuts Guide (⌘/)"
            className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-amber-400 border border-white/10 transition-colors"
          >
            <Command className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-300 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>24°C Clear</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <Wifi className="w-3.5 h-3.5" />
          <span>5G ONLINE</span>
        </div>

        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-white/10 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF4D4F] rounded-full animate-ping" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_rgba(255,184,0,0.4)]">
            <User className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium text-gray-200 hidden md:inline font-mono">
            {user?.name || 'Alex Vance'}
          </span>
        </div>
      </div>
    </header>
  );
};
