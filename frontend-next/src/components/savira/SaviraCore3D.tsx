'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SaviraState } from '@/hooks/useSavira';

interface SaviraCore3DProps {
  state: SaviraState;
}

export const SaviraCore3D: React.FC<SaviraCore3DProps> = ({ state }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const getStateColors = () => {
    switch (state) {
      case 'EMERGENCY':
        return { core: '#FF4D4F', ring: '#FFB800', light: '#FF4D4F', speed: 2.5 };
      case 'WARNING':
        return { core: '#FF8A00', ring: '#FFB800', light: '#FF8A00', speed: 1.8 };
      case 'LISTENING':
        return { core: '#00FF95', ring: '#00FF95', light: '#00FF95', speed: 1.5 };
      case 'THINKING':
        return { core: '#FFB800', ring: '#00FF95', light: '#FFB800', speed: 2.0 };
      case 'RESPONDING':
        return { core: '#FFB800', ring: '#FF8A00', light: '#FFB800', speed: 1.2 };
      default:
        return { core: '#FFB800', ring: '#FF8A00', light: '#FFB800', speed: 0.8 };
    }
  };

  const colors = getStateColors();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * colors.speed;
      coreRef.current.rotation.z += delta * (colors.speed * 0.5);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * (colors.speed * 1.2);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * (colors.speed * 1.1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Holographic AI Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color={colors.core}
          wireframe
          emissive={colors.core}
          emissiveIntensity={1.8}
        />
      </mesh>

      <pointLight color={colors.light} intensity={5} distance={10} />

      {/* Orbiting Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshBasicMaterial color={colors.ring} transparent opacity={0.8} />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={colors.core} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
