export type GuardianStatusLevel = 'OPTIMAL' | 'ELEVATED_RISK' | 'CRITICAL' | 'CALIBRATING';

export interface GuardianAgentState {
  status: GuardianStatusLevel;
  riskScore: number; // 0 - 100
  observeActive: boolean;
  reasonActive: boolean;
  predictActive: boolean;
  protectActive: boolean;
  saviraState: 'IDLE' | 'LISTENING' | 'ANALYZING' | 'RESPONDING';
  lastAttribution: string;
}

export interface GuardianAlert {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  actionRequired?: string;
}
