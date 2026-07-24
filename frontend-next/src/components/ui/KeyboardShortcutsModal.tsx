'use client';

import React from 'react';
import { Command, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcutsList = [
  { keys: ['⌘ / Ctrl', 'K'], label: 'Open Global Command Palette' },
  { keys: ['⌘ / Ctrl', '/'], label: 'Open Keyboard Shortcuts Guide' },
  { keys: ['Esc'], label: 'Close Active Modals or Side Panel' },
  { keys: ['Tab'], label: 'Navigate Focusable Elements (WCAG AA)' },
  { keys: ['Enter'], label: 'Confirm Action / Submit Query' },
];

export const KeyboardShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-xl flex items-center justify-center p-6 text-white">
      <GlassCard goldBorder className="w-full max-w-lg p-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-[#FFB800]" />
            <h3 className="font-mono text-base font-bold text-white">KEYBOARD SHORTCUTS GUIDE</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {shortcutsList.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5"
            >
              <span className="text-gray-300">{sc.label}</span>
              <div className="flex items-center gap-1.5">
                {sc.keys.map((k) => (
                  <kbd
                    key={k}
                    className="bg-white/10 border border-white/10 px-2 py-0.5 rounded text-[10px] text-amber-400 font-bold"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
