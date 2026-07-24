'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { Radio } from 'lucide-react';

interface SensorNode {
  id: string;
  label: string;
  position: [number, number, number];
  type: string;
}

const nodes: SensorNode[] = [
  { id: 'LiDAR', label: 'Solid-State LiDAR', position: [0, 1.65, -0.2], type: 'LiDAR' },
  { id: 'Radar', label: '77GHz Front Radar', position: [0, 0.7, 2.25], type: 'Radar' },
  { id: 'Camera', label: 'Tricam Vision Module', position: [0, 1.4, 0.9], type: 'Camera' },
  { id: 'GPS', label: 'Dual-Band GNSS GPS', position: [0, 1.62, -0.9], type: 'GPS' },
  { id: 'Battery', label: 'HV Battery ECU', position: [0, 0.2, 0], type: 'Battery' },
  { id: 'Motor', label: 'Rear Drive Inverter', position: [0, 0.45, -1.5], type: 'Motor' },
];

interface OverlayProps {
  onSelectSensor: (id: string) => void;
}

export const SensorNodesOverlay: React.FC<OverlayProps> = ({ onSelectSensor }) => {
  return (
    <group>
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          {/* Glowing 3D Node Sphere */}
          <mesh onClick={() => onSelectSensor(node.id)}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00FF95" />
          </mesh>

          {/* HTML Glass Tooltip Overlay */}
          <Html distanceFactor={10} zIndexRange={[100, 0]}>
            <div
              onClick={() => onSelectSensor(node.id)}
              className="bg-[#111111]/90 backdrop-blur-md border border-[#00FF95]/40 text-[#00FF95] text-[10px] font-mono px-2.5 py-1 rounded-lg shadow-[0_0_15px_rgba(0,255,149,0.3)] whitespace-nowrap cursor-pointer hover:scale-110 transition-transform flex items-center gap-1.5"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{node.label}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
