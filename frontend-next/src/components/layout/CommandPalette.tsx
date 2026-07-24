'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Activity, AlertTriangle, FileText, Zap, Car, BrainCircuit, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const commands = [
    {
      icon: <Activity className="w-4 h-4 text-[#00FF95]" />,
      label: 'Run System Diagnostics',
      category: 'System',
      action: () => {
        router.push('/dashboard/vehicle');
        onClose();
      },
    },
    {
      icon: <Zap className="w-4 h-4 text-[#FFB800]" />,
      label: 'Battery & Thermal Analysis',
      category: 'Energy',
      action: () => {
        router.push('/dashboard/vehicle');
        onClose();
      },
    },
    {
      icon: <BrainCircuit className="w-4 h-4 text-[#FF8A00]" />,
      label: 'Open SAVIRA AI Intelligence',
      category: 'AI',
      action: () => {
        router.push('/dashboard/guardian-ai');
        onClose();
      },
    },
    {
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      label: 'Generate Daily Safety Report',
      category: 'Reports',
      action: () => {
        router.push('/dashboard/overview');
        onClose();
      },
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
      label: 'Trigger Emergency SOS Triage',
      category: 'Emergency',
      action: () => {
        alert('Emergency SOS Signal Broadcasted to Guardian Network');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-xl flex items-start justify-center pt-24 p-6">
      <GlassCard goldBorder className="w-full max-w-xl p-4 shadow-[0_0_50px_rgba(255,184,0,0.3)] space-y-3 animate-fade-in">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search telemetry..."
            autoFocus
            className="flex-1 bg-transparent font-mono text-sm text-white focus:outline-none placeholder-gray-500"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {filteredCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={cmd.action}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] text-left transition-colors font-mono text-xs text-gray-200 group"
            >
              <div className="flex items-center gap-3">
                {cmd.icon}
                <span className="group-hover:text-amber-400 transition-colors">{cmd.label}</span>
              </div>
              <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded text-gray-400">
                {cmd.category}
              </span>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
