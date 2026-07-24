'use client';

import React from 'react';
import { Smartphone, Monitor, ShieldAlert, X } from 'lucide-react';
import { useSessions } from '@/hooks/useSessions';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const ActiveSessionsCard: React.FC = () => {
  const { sessions, revokeSession, revokeAllOtherSessions } = useSessions();

  return (
    <GlassCard goldBorder space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-[#FFB800]" />
          <h3 className="text-sm font-bold text-white">DEVICE SESSION MANAGEMENT</h3>
        </div>
        <Button variant="secondary" size="sm" onClick={revokeAllOtherSessions}>
          Terminate All Other Sessions
        </Button>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-[#FFB800]/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              {session.os.includes('iOS') || session.os.includes('Android') ? (
                <Smartphone className="w-5 h-5 text-[#FFB800]" />
              ) : (
                <Monitor className="w-5 h-5 text-cyan-400" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{session.name}</span>
                  {session.isCurrent && (
                    <span className="text-[9px] font-bold text-[#00FF95] bg-[#00FF95]/10 px-2 py-0.5 rounded-full">
                      CURRENT DEVICE
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {session.browser} • {session.os} • {session.ip}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-500">{session.lastActive}</span>
              {!session.isCurrent && (
                <button
                  onClick={() => revokeSession(session.id)}
                  className="p-1 rounded bg-white/[0.05] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
