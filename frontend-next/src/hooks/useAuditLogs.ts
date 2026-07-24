'use client';

import { useState } from 'react';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  status: 'SUCCESS' | 'FAILED';
  ipAddress: string;
}

export function useAuditLogs() {
  const [logs] = useState<AuditLogItem[]>([
    {
      id: 'l1',
      timestamp: '2026-07-21 22:45:12',
      user: 'Alex Vance',
      role: 'SUPER_ADMIN',
      action: 'User Authentication Login',
      status: 'SUCCESS',
      ipAddress: '192.168.1.10',
    },
    {
      id: 'l2',
      timestamp: '2026-07-21 22:48:35',
      user: 'Alex Vance',
      role: 'SUPER_ADMIN',
      action: 'Vehicle Twin Registration',
      status: 'SUCCESS',
      ipAddress: '192.168.1.10',
    },
    {
      id: 'l3',
      timestamp: '2026-07-21 22:55:04',
      user: 'Alex Vance',
      role: 'SUPER_ADMIN',
      action: 'Diagnostics Execution Trigger',
      status: 'SUCCESS',
      ipAddress: '192.168.1.10',
    },
    {
      id: 'l4',
      timestamp: '2026-07-21 23:01:22',
      user: 'Alex Vance',
      role: 'SUPER_ADMIN',
      action: 'Export AI Safety Report',
      status: 'SUCCESS',
      ipAddress: '192.168.1.10',
    },
  ]);

  return { logs };
}
