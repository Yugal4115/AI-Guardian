'use client';

import { useState } from 'react';

export type DigitalTwinMode = 'STANDARD' | 'WIREFRAME' | 'SENSOR' | 'COMPONENT' | 'EXPLODED' | 'HEALTH';

export function useDigitalTwin() {
  const [mode, setMode] = useState<DigitalTwinMode>('STANDARD');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return {
    mode,
    setMode,
    selectedComponent,
    setSelectedComponent,
    hoveredComponent,
    setHoveredComponent,
    clearSelection: () => setSelectedComponent(null),
  };
}
