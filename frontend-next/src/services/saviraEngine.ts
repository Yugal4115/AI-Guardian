'use client';

export interface GrammarCorrection {
  original: string;
  corrected: string;
  hasCorrection: boolean;
}

export interface SaviraResponse {
  grammar: GrammarCorrection;
  text: string;
  isOutOfDomain: boolean;
  attribution?: {
    reason: string;
    confidence: number;
    component: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    recommendedAction: string;
    estimatedTime: string;
  };
}

const OUT_OF_DOMAIN_KEYWORDS = [
  'ipl', 'cricket', 'ronaldo', 'messi', 'joke', 'bitcoin', 'crypto', 'recipe', 'movie', 'president', 'capital'
];

export function correctGrammar(input: string): GrammarCorrection {
  const lower = input.toLowerCase().trim();

  if (lower.includes('wht is battrey helth')) {
    return { original: input, corrected: 'What is the battery health?', hasCorrection: true };
  }
  if (lower.includes('check tyre presure')) {
    return { original: input, corrected: 'Check tyre pressure status.', hasCorrection: true };
  }
  if (lower.includes('whens next servis')) {
    return { original: input, corrected: 'When is the next vehicle service due?', hasCorrection: true };
  }

  // Capitalize first letter and append question mark if appropriate
  let corrected = input.trim();
  if (corrected.length > 0) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    if (!/[.!?]$/.test(corrected)) {
      corrected += '?';
    }
  }

  return {
    original: input,
    corrected,
    hasCorrection: corrected !== input,
  };
}

export function processSaviraPrompt(prompt: string): SaviraResponse {
  const grammar = correctGrammar(prompt);
  const lower = prompt.toLowerCase();

  // Check out-of-domain guardrails
  const isOutOfDomain = OUT_OF_DOMAIN_KEYWORDS.some((kw) => lower.includes(kw));

  if (isOutOfDomain) {
    return {
      grammar,
      isOutOfDomain: true,
      text: `This question is outside my operational domain. I specialize in intelligent mobility, vehicle health, predictive maintenance, driver safety, navigation, and Guardian OS. For general-purpose topics, assistants such as ChatGPT or Claude are better suited. How may I assist you with Guardian OS today?`,
    };
  }

  // Domain-specific reasoning responses
  if (lower.includes('battery')) {
    return {
      grammar,
      isOutOfDomain: false,
      text: `HV Battery Pack state of charge is 88%. Current cell temperature is 28.4°C. Remaining Useful Life is estimated at 12.4 years with zero thermal degradation.`,
      attribution: {
        reason: 'Cell impedance and thermal gradient monitored across 784V architecture.',
        confidence: 99.8,
        component: '800V HV Battery Pack',
        riskLevel: 'LOW',
        recommendedAction: 'Pre-condition cells prior to 350kW supercharging at next stop.',
        estimatedTime: 'Next 12 km',
      },
    };
  }

  if (lower.includes('tyre') || lower.includes('tire') || lower.includes('pressure')) {
    return {
      grammar,
      isOutOfDomain: false,
      text: `Pirelli P-Zero Elect tyre pressures are calibrated to 2.4 Bar across all four wheels. Tread wear rate is 0.12mm per 1,000 km.`,
      attribution: {
        reason: 'TPMS wireless sensor telemetry synced at 10,000 Hz.',
        confidence: 99.5,
        component: 'Pirelli P-Zero Elect Tyres',
        riskLevel: 'LOW',
        recommendedAction: 'Rotate front and rear tyres at 50,000 km odometer mark.',
        estimatedTime: 'In ~8,200 km',
      },
    };
  }

  if (lower.includes('service') || lower.includes('maintenance')) {
    return {
      grammar,
      isOutOfDomain: false,
      text: `Next scheduled predictive maintenance is Tyre Rotation in approximately 8,200 km. All primary powertrain components report 99.4% health.`,
      attribution: {
        reason: 'Machine learning RUL model evaluated odometer and driver acceleration history.',
        confidence: 98.4,
        component: 'Chassis & Powertrain',
        riskLevel: 'LOW',
        recommendedAction: 'Schedule service check at certified Guardian Mobility Center.',
        estimatedTime: 'Within 45 days',
      },
    };
  }

  // General Vehicle Intelligence Response
  return {
    grammar,
    isOutOfDomain: false,
    text: `Guardian OS AI Core analyzed "${grammar.corrected}". All 12 vehicle subsystems report optimal status. Driver safety index is 98.4/100 with zero critical alerts detected.`,
    attribution: {
      reason: 'Multimodal sensor fusion combining LiDAR, 77GHz Radar, and ECU telemetry.',
      confidence: 99.2,
      component: 'SAVIRA Autonomy Loop',
      riskLevel: 'LOW',
      recommendedAction: 'Maintain current autonomous cruise configuration.',
      estimatedTime: 'Immediate',
    },
  };
}
