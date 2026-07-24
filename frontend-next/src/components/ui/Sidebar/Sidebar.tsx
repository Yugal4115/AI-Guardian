'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SIDEBAR_ITEMS } from '@/constants/navigation';
import { LayoutDashboard, Car, BrainCircuit, Network, Settings, Shield } from 'lucide-react';
import { SidebarProps } from './Sidebar.types';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'w-64 h-screen bg-[#050505] border-r border-white/10 flex flex-col justify-between p-6 fixed top-0 left-0 z-40 backdrop-blur-2xl',
        className
      )}
    >
      <div>
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(255,184,0,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-6 h-6 fill-black" />
          </div>
          <div>
            <h1 className="font-bold tracking-wider text-base text-white group-hover:text-[#FFB800] transition-colors">
              GUARDIAN OS
            </h1>
            <p className="text-[10px] text-amber-400/80 tracking-widest uppercase font-mono">
              Agentic Mobility
            </p>
          </div>
        </Link>

        {/* Strict 5-Item Navigation */}
        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group',
                  isActive
                    ? 'bg-gradient-to-r from-[#FFB800]/20 to-transparent text-[#FFB800] border-l-2 border-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.15)] font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <span
                  className={cn(
                    'transition-colors duration-300',
                    isActive ? 'text-[#FFB800]' : 'text-gray-400 group-hover:text-amber-400'
                  )}
                >
                  {iconMap[item.iconName]}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System Active Footer */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF95] animate-pulse shadow-[0_0_10px_#00FF95]" />
          <div>
            <p className="text-xs font-semibold text-white">SAVIRA Online</p>
            <p className="text-[10px] text-gray-400 font-mono">Telemetry Syncing</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
