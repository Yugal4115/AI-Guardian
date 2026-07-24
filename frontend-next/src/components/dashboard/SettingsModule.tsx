'use client';

import React from 'react';
import { SecurityDashboard } from '@/components/security/SecurityDashboard';
import { ActiveSessionsCard } from '@/components/security/ActiveSessionsCard';
import { MfaSetupCard } from '@/components/security/MfaSetupCard';
import { AuditLogsTable } from '@/components/security/AuditLogsTable';
import { PrivacyCenterCard } from '@/components/security/PrivacyCenterCard';

export const SettingsModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight">
          ENTERPRISE SECURITY & ADMINISTRATION CONSOLE
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          ZERO TRUST ACCESS CONTROL • DEVICE SESSIONS • MFA • IMMUTABLE AUDIT TRAIL
        </p>
      </div>

      {/* Top Security Metric Banner */}
      <SecurityDashboard />

      {/* Device Session Management */}
      <ActiveSessionsCard />

      {/* Multi-Factor Authentication Setup */}
      <MfaSetupCard />

      {/* Chronological Audit Log Trail */}
      <AuditLogsTable />

      {/* Privacy & GDPR Data Center */}
      <PrivacyCenterCard />
    </div>
  );
};
