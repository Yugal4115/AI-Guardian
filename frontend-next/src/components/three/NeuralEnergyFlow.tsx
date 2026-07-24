'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralEnergyFlow: React.FC = () => {
  const lineRef = useRef<THREE.LineLoop>(null);

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += delta * 0.2;
    }
  });

  const points = [
    new THREE.Vector3(0, 0.2, 1.5),
    new THREE.Vector3(0.8, 0.4, 0.8),
    new THREE.Vector3(0, 1.3, 0),
    new THREE.Vector3(-0.8, 0.4, 0.8),
    new THREE.Vector3(0, 0.2, -1.5),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group position={[0, 0.2, 0]}>
      <lineLoop ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#FFB800" linewidth={2} transparent opacity={0.8} />
      </lineLoop>
    </group>
  );
};
