'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface LuxurySUVProps {
  isWireframe?: boolean;
  activeComponent?: string | null;
}

export const LuxurySUVModel: React.FC<LuxurySUVProps> = ({
  isWireframe = false,
  activeComponent = null,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidarSpinnerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<number>(0);

  // Frame animations: rotate car, rotate lidar, pulse sensor node glow
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation speed: ~1 full rotation every 40s
      groupRef.current.rotation.y += delta * 0.157;
    }
    if (lidarSpinnerRef.current) {
      // Fast rotation for lidar scanner
      lidarSpinnerRef.current.rotation.y += delta * 4;
    }
    pulseRef.current += delta * 3;
  });

  const getComponentColor = (name: string, defaultColor: string = '#202226') => {
    if (activeComponent === name) return '#00FF95';
    return isWireframe ? '#FFB800' : defaultColor;
  };

  const getOutlineColor = (name: string) => {
    if (activeComponent === name) return '#00FF95';
    return '#FFB800'; // AI Guardian signature gold outline
  };

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* 1. Neon Underglow PointLight */}
      {!isWireframe && (
        <pointLight
          position={[0, -0.3, 0]}
          color="#FFB800"
          intensity={12}
          distance={4}
          decay={1.5}
        />
      )}

      {/* 2. Main Lower Chassis Plate */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.2, 0.15, 4.4]} />
        <meshPhysicalMaterial
          color={getComponentColor('Body', '#15171a')}
          wireframe={isWireframe}
          metalness={0.95}
          roughness={0.2}
          clearcoat={1.0}
        />
        {!isWireframe && <Edges threshold={15} color={getOutlineColor('Body')} lineWidth={1.2} />}
      </mesh>

      {/* 3. Main Sleek SUV Body Shell */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[2.18, 0.6, 4.3]} />
        <meshPhysicalMaterial
          color={getComponentColor('Body', '#262930')}
          wireframe={isWireframe}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
        {!isWireframe && <Edges threshold={15} color={getOutlineColor('Body')} lineWidth={1.8} />}
      </mesh>

      {/* 4. Streamlined Front Hood Taper */}
      <mesh position={[0, 0.6, 1.6]}>
        <boxGeometry args={[2.0, 0.45, 1.2]} />
        <meshPhysicalMaterial
          color={getComponentColor('Body', '#262930')}
          wireframe={isWireframe}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
        />
        {!isWireframe && <Edges threshold={15} color={getOutlineColor('Body')} lineWidth={1.5} />}
      </mesh>

      {/* 5. Tapered Cabin / Panoramic Roof Glass */}
      <mesh position={[0, 1.15, -0.4]}>
        <boxGeometry args={[1.75, 0.6, 2.4]} />
        <meshPhysicalMaterial
          color={isWireframe ? '#FFB800' : '#0a0b0d'}
          wireframe={isWireframe}
          transparent
          opacity={isWireframe ? 0.7 : 0.65}
          roughness={0.05}
          metalness={0.95}
          transmission={0.4}
        />
        {!isWireframe && <Edges threshold={20} color="#FFB800" lineWidth={1.5} />}
      </mesh>

      {/* 6. Front Headlight Glow Bar */}
      <mesh position={[0, 0.55, 2.18]}>
        <boxGeometry args={[1.8, 0.08, 0.05]} />
        <meshBasicMaterial color="#FFB800" />
      </mesh>
      {/* Outer Headlights */}
      <mesh position={[-0.85, 0.55, 2.19]}>
        <boxGeometry args={[0.3, 0.14, 0.05]} />
        <meshBasicMaterial color="#FFB800" />
      </mesh>
      <mesh position={[0.85, 0.55, 2.19]}>
        <boxGeometry args={[0.3, 0.14, 0.05]} />
        <meshBasicMaterial color="#FFB800" />
      </mesh>

      {/* 7. Rear Crimson Red Taillight LED Bar */}
      <mesh position={[0, 0.65, -2.18]}>
        <boxGeometry args={[1.85, 0.07, 0.05]} />
        <meshBasicMaterial color="#FF4D4F" />
      </mesh>

      {/* 8. HV Battery Pack (Glowing orange/green underbody) */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.85, 0.12, 3.2]} />
        <meshStandardMaterial
          color={getComponentColor('Battery', '#d97706')}
          emissive={activeComponent === 'Battery' ? '#00FF95' : '#b45309'}
          emissiveIntensity={activeComponent === 'Battery' ? 1.5 : 0.6}
          wireframe={isWireframe}
        />
        {!isWireframe && <Edges threshold={15} color="#d97706" lineWidth={1.0} />}
      </mesh>

      {/* 9. Roof-Mounted Lidar Turret Assembly */}
      <group position={[0, 1.48, -0.4]}>
        {/* Lidar Base */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lidar Rotating Head */}
        <mesh ref={lidarSpinnerRef} position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
          {/* Lidar Lens Aperture */}
          <mesh position={[0, 0, 0.13]}>
            <boxGeometry args={[0.06, 0.04, 0.08]} />
            <meshBasicMaterial color="#00FF95" />
          </mesh>
        </mesh>
      </group>

      {/* 10. Autonomous Camera/Sensor Pods (Side-mirrors replacement) */}
      <group position={[-1.1, 0.8, 1.0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.08, 0.12]} />
          <meshStandardMaterial color="#1a1c1e" />
        </mesh>
        <mesh position={[-0.08, 0, 0.03]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
      </group>
      <group position={[1.1, 0.8, 1.0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.08, 0.12]} />
          <meshStandardMaterial color="#1a1c1e" />
        </mesh>
        <mesh position={[0.08, 0, 0.03]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
      </group>

      {/* 11. Detailed Wheels */}
      {/* Front Axle */}
      <mesh position={[0, 0.3, 1.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.3, 12]} />
        <meshStandardMaterial color="#374151" metalness={0.8} />
      </mesh>
      {/* Rear Axle */}
      <mesh position={[0, 0.3, -1.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.3, 12]} />
        <meshStandardMaterial color="#374151" metalness={0.8} />
      </mesh>

      {/* Wheel Renderer Helper */}
      {[
        { pos: [-1.16, 0.3, 1.4], isLeft: true },   // Front Left
        { pos: [1.16, 0.3, 1.4], isLeft: false },   // Front Right
        { pos: [-1.16, 0.3, -1.4], isLeft: true },  // Rear Left
        { pos: [1.16, 0.3, -1.4], isLeft: false },  // Rear Right
      ].map((wheel, index) => {
        const componentColor = getComponentColor('Tyres', '#1f2937');
        const rimColor = activeComponent === 'Tyres' ? '#00FF95' : '#b5b7bd';
        
        return (
          <group key={index} position={wheel.pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            {/* Outer Tire Rubber */}
            <mesh>
              <cylinderGeometry args={[0.42, 0.42, 0.32, 24]} />
              <meshStandardMaterial
                color={componentColor}
                metalness={0.2}
                roughness={0.85}
                wireframe={isWireframe}
              />
            </mesh>

            {/* Inner Metallic Rim */}
            {!isWireframe && (
              <>
                <mesh position={[0, wheel.isLeft ? 0.02 : -0.02, 0]}>
                  <cylinderGeometry args={[0.32, 0.32, 0.3, 24]} />
                  <meshStandardMaterial
                    color={rimColor}
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>

                {/* Rim Spokes Pattern */}
                {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, sIdx) => (
                  <mesh
                    key={sIdx}
                    position={[0, wheel.isLeft ? 0.16 : -0.16, 0]}
                    rotation={[angle, 0, 0]}
                  >
                    <boxGeometry args={[0.05, 0.58, 0.05]} />
                    <meshStandardMaterial color="#4b5563" metalness={0.9} />
                  </mesh>
                ))}

                {/* Glowing Hub Ring */}
                <mesh position={[0, wheel.isLeft ? 0.17 : -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.18, 0.015, 8, 32]} />
                  <meshBasicMaterial color={rimColor === '#00FF95' ? '#00FF95' : '#FFB800'} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
};
