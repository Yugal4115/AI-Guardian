'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SaviraCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8;
      coreRef.current.rotation.z += delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.2;
      ring1Ref.current.rotation.y += delta * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 1.0;
      ring2Ref.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Golden Holographic Sphere Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color="#FFB800"
          wireframe
          emissive="#FF8A00"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Inner Glowing Point Light */}
      <pointLight color="#FFB800" intensity={4} distance={8} />

      {/* Orbiting Particle Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshBasicMaterial color="#FFB800" transparent opacity={0.7} />
      </mesh>

      {/* Orbiting Particle Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00FF95" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
