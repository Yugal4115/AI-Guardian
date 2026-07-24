'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AmbientParticles } from './AmbientParticles';
import { InteractiveChassis } from './InteractiveChassis';
import { SensorNodesOverlay } from './SensorNodesOverlay';
import { NeuralEnergyFlow } from './NeuralEnergyFlow';
import { DigitalTwinMode } from '@/hooks/useDigitalTwin';
import { ComponentHealthDetail } from '@/hooks/useVehicleHealth';

interface CanvasProps {
  mode: DigitalTwinMode;
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  healthMap: Record<string, ComponentHealthDetail>;
}

export const DigitalTwinCanvas: React.FC<CanvasProps> = ({
  mode,
  selectedComponent,
  onSelectComponent,
  healthMap,
}) => {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 2.5, 7.5], fov: 45 }}>
        {/* Soft Ambient & Spotlight */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={2.0} color="#FFFFFF" />
        <spotLight
          position={[-10, 10, -5]}
          intensity={3.0}
          color="#FFB800"
          angle={0.6}
          penumbra={1}
        />

        {/* Ambient Gold Particles */}
        <AmbientParticles count={450} />

        {/* Neural Energy Connection Lines */}
        <NeuralEnergyFlow />

        {/* Interactive 3D Chassis supporting Exploded View */}
        <InteractiveChassis
          mode={mode}
          selectedComponent={selectedComponent}
          onSelectComponent={onSelectComponent}
          healthMap={healthMap}
        />

        {/* Floating 3D Sensor Node Markers in Sensor View */}
        {(mode === 'SENSOR' || mode === 'STANDARD') && (
          <SensorNodesOverlay onSelectSensor={onSelectComponent} />
        )}

        {/* Ground Plane Shadows */}
        <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#050505" roughness={0.8} metalness={0.5} />
        </mesh>

        {/* Cyber Golden Ground Grid */}
        <gridHelper args={[60, 60, '#FFB800', '#1c1d22']} position={[0, -0.51, 0]} />

        {/* Emerald Radar Scan Concentric Rings */}
        <gridHelper args={[15, 6, '#00FF95', '#22252c']} position={[0, -0.505, 0]} />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
