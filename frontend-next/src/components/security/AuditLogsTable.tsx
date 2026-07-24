'use client';

import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';
import { useAuditLogs } from '@/hooks/useAuditLogs';
import { GlassCard } from '@/components/ui/GlassCard';

export const AuditLogsTable: React.FC = () => {
  const { logs } = useAuditLogs();

  return (
    <GlassCard space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">CHRONOLOGICAL AUDIT TRAIL LOGS</h3>
        </div>
        <span className="text-[10px] text-[#00FF95]">IMMUTABLE AUDIT TRAIL</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase">
              <th className="pb-2">TIMESTAMP</th>
              <th className="pb-2">USER</th>
              <th className="pb-2">ROLE</th>
              <th className="pb-2">ACTION EXECUTED</th>
              <th className="pb-2">STATUS</th>
              <th className="pb-2 text-right">IP ADDRESS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02]">
                <td className="py-3 text-gray-400">{log.timestamp}</td>
                <td className="py-3 font-bold text-white">{log.user}</td>
                <td className="py-3 text-amber-400">{log.role}</td>
                <td className="py-3 text-gray-300">{log.action}</td>
                <td className="py-3">
                  <span className="text-[9px] font-bold text-[#00FF95] bg-[#00FF95]/10 px-2 py-0.5 rounded">
                    {log.status}
                  </span>
                </td>
                <td className="py-3 text-right text-gray-400">{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
