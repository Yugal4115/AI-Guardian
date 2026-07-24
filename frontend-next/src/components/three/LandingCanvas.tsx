'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AmbientParticles } from './AmbientParticles';
import { LuxurySUVModel } from './LuxurySUVModel';
import { SaviraCore } from './SaviraCore';

interface LandingCanvasProps {
  currentScene?: number;
  activeComponent?: string | null;
}

export const LandingCanvas: React.FC<LandingCanvasProps> = ({
  currentScene = 1,
  activeComponent = null,
}) => {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Ambient Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#FFFFFF" />
        <spotLight
          position={[-10, 10, -5]}
          intensity={2.5}
          color="#FFB800"
          angle={0.6}
          penumbra={1}
        />

        {/* Ambient Golden Particles */}
        <AmbientParticles count={400} />

        {/* Scene 6 renders SAVIRA Core, all other scenes render the SUV */}
        {currentScene === 6 ? (
          <SaviraCore />
        ) : (
          <LuxurySUVModel
            isWireframe={currentScene === 3 || currentScene === 4}
            activeComponent={activeComponent}
          />
        )}

        {/* Ground Plane Shadows & Reflections */}
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
