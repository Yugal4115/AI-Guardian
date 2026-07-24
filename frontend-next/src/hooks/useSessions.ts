'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export interface DeviceSession {
  id: string;
  name: string;
  browser: string;
  os: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export function useSessions() {
  const [sessions, setSessions] = useState<DeviceSession[]>([
    {
      id: 's1',
      name: 'NIO Cockpit Hyperscreen OS',
      browser: 'WebKit Embedded',
      os: 'QNX / Guardian OS',
      ip: '192.168.1.10',
      lastActive: 'Active Now',
      isCurrent: true,
    },
    {
      id: 's2',
      name: 'Apple Vision Pro',
      browser: 'Safari Mobile',
      os: 'visionOS 3.0',
      ip: '10.0.0.42',
      lastActive: '12m ago',
      isCurrent: false,
    },
    {
      id: 's3',
      name: 'iPhone 16 Pro Max',
      browser: 'Safari',
      os: 'iOS 19.4',
      ip: '172.16.0.8',
      lastActive: '2h ago',
      isCurrent: false,
    },
  ]);

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success('Device session revoked and terminated.');
  };

  const revokeAllOtherSessions = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    toast.success('All secondary device sessions terminated.');
  };

  return {
    sessions,
    revokeSession,
    revokeAllOtherSessions,
  };
}
