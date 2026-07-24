'use client';

import React from 'react';
import { AlertTriangle, Info, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: 'n1',
    category: 'Critical',
    title: 'High Brake Temperature Detected',
    message: 'Left front brake caliper thermal threshold reached 140°C during deceleration.',
    timestamp: '2 mins ago',
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
  },
  {
    id: 'n2',
    category: 'AI',
    title: 'SAVIRA Coaching Intervention',
    message: 'Optimal regen braking trajectory suggested for +14km extended battery range.',
    timestamp: '15 mins ago',
    icon: <Info className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'n3',
    category: 'Maintenance',
    title: 'Tyre Pressure Calibration Nominal',
    message: 'All four Pirelli P-Zero tyres verified at 2.4 Bar.',
    timestamp: '1 hour ago',
    icon: <CheckCircle2 className="w-5 h-5 text-[#00FF95]" />,
  },
];

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-mono text-base font-bold text-white">GUARDIAN NOTIFICATIONS</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {mockNotifications.map((n) => (
            <GlassCard key={n.id} hoverEffect className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {n.icon}
                  <span className="font-mono text-xs font-bold text-white">{n.title}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{n.timestamp}</span>
              </div>
              <p className="text-xs text-gray-300 font-mono leading-relaxed">{n.message}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 text-center font-mono text-xs text-gray-400">
        Guardian OS Alert Dispatch v2.0
      </div>
    </div>
  );
};
