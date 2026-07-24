'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { DigitalTwinMode } from '@/hooks/useDigitalTwin';
import { ComponentHealthDetail } from '@/hooks/useVehicleHealth';

interface ChassisProps {
  mode: DigitalTwinMode;
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  healthMap: Record<string, ComponentHealthDetail>;
}

export const InteractiveChassis: React.FC<ChassisProps> = ({
  mode,
  selectedComponent,
  onSelectComponent,
  healthMap,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidarSpinnerRef = useRef<THREE.Mesh>(null);

  // Smooth lerp positions for Exploded View
  const isExploded = mode === 'EXPLODED';
  const isWireframe = mode === 'WIREFRAME';
  const isHealth = mode === 'HEALTH';

  const bodyY = useRef(0.6);
  const batteryY = useRef(0.15);
  const wheelOffset = useRef(0);

  useFrame((_, delta) => {
    // Continuous slow rotation if not in exploded mode
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }

    if (lidarSpinnerRef.current) {
      lidarSpinnerRef.current.rotation.y += delta * 4;
    }

    // Lerp exploded offsets
    const targetBodyY = isExploded ? 1.8 : 0.6;
    const targetBatteryY = isExploded ? -0.4 : 0.15;
    const targetWheelOffset = isExploded ? 0.45 : 0;

    bodyY.current = THREE.MathUtils.lerp(bodyY.current, targetBodyY, delta * 3);
    batteryY.current = THREE.MathUtils.lerp(batteryY.current, targetBatteryY, delta * 3);
    wheelOffset.current = THREE.MathUtils.lerp(wheelOffset.current, targetWheelOffset, delta * 3);
  });

  const getComponentColor = (id: string, defaultColor: string = '#262930') => {
    if (selectedComponent === id) return '#00FF95';
    if (isHealth && healthMap[id]) return healthMap[id].color;
    if (isWireframe) return '#FFB800';
    return defaultColor;
  };

  const getOutlineColor = (id: string) => {
    if (selectedComponent === id) return '#00FF95';
    if (isHealth && healthMap[id]) return healthMap[id].color;
    return '#FFB800';
  };

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Neon Underglow (only active if not in exploded or wireframe mode) */}
      {!isWireframe && !isExploded && (
        <pointLight
          position={[0, -0.3, 0]}
          color="#FFB800"
          intensity={10}
          distance={3.5}
          decay={1.5}
        />
      )}

      {/* UPPER BODY SHELL ASSEMBLY */}
      <group position={[0, bodyY.current - 0.6, 0]}>
        {/* Main Body Shell */}
        <mesh
          position={[0, 0.6, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent('Body');
          }}
        >
          <boxGeometry args={[2.18, 0.6, 4.3]} />
          <meshPhysicalMaterial
            color={getComponentColor('Body', '#262930')}
            wireframe={isWireframe}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
          />
          {!isWireframe && <Edges threshold={15} color={getOutlineColor('Body')} lineWidth={1.8} />}
        </mesh>

        {/* Windshield & Cabin Glass */}
        <mesh position={[0, 1.2, -0.4]}>
          <boxGeometry args={[1.75, 0.6, 2.4]} />
          <meshPhysicalMaterial
            color={isWireframe ? '#FFB800' : '#0a0b0d'}
            wireframe={isWireframe}
            transparent
            opacity={0.65}
            roughness={0.05}
            metalness={0.95}
            transmission={0.4}
          />
          {!isWireframe && <Edges threshold={20} color="#FFB800" lineWidth={1.5} />}
        </mesh>

        {/* Glowing Headlight Bar (amber/gold) */}
        <mesh position={[0, 0.6, 2.18]}>
          <boxGeometry args={[1.8, 0.08, 0.05]} />
          <meshBasicMaterial color="#FFB800" />
        </mesh>

        {/* Lidar Scanner assembly on roof */}
        <group position={[0, 1.52, -0.4]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.22, 0.08, 16]} />
            <meshStandardMaterial color="#1f2937" metalness={0.8} />
          </mesh>
          <mesh ref={lidarSpinnerRef} position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
            <meshStandardMaterial color="#111827" metalness={0.9} />
            <mesh position={[0, 0, 0.13]}>
              <boxGeometry args={[0.06, 0.04, 0.08]} />
              <meshBasicMaterial color="#00FF95" />
            </mesh>
          </mesh>
        </group>
      </group>

      {/* LOWER HV BATTERY PACK */}
      <mesh
        position={[0, batteryY.current, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent('Battery');
        }}
      >
        <boxGeometry args={[1.85, 0.15, 3.2]} />
        <meshStandardMaterial
          color={getComponentColor('Battery', '#d97706')}
          emissive={selectedComponent === 'Battery' ? '#00FF95' : '#b45309'}
          emissiveIntensity={selectedComponent === 'Battery' ? 1.5 : 0.5}
          wireframe={isWireframe}
        />
        {!isWireframe && <Edges threshold={15} color={getOutlineColor('Battery')} lineWidth={1.2} />}
      </mesh>

      {/* REAR DRIVE MOTOR */}
      <mesh
        position={[0, batteryY.current + 0.3, -1.4]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectComponent('Motor');
        }}
      >
        <cylinderGeometry args={[0.32, 0.32, 0.8, 24]} />
        <meshStandardMaterial
          color={getComponentColor('Motor', '#374151')}
          metalness={0.85}
          roughness={0.2}
          wireframe={isWireframe}
          emissive={selectedComponent === 'Motor' ? '#00FF95' : '#000000'}
          emissiveIntensity={0.8}
        />
        {!isWireframe && <Edges threshold={15} color={getOutlineColor('Motor')} lineWidth={1.2} />}
      </mesh>

      {/* DETAILED CYBER WHEELS */}
      {[
        { id: 'FL', pos: [-1.16, 0.35, 1.4], isLeft: true },
        { id: 'FR', pos: [1.16, 0.35, 1.4], isLeft: false },
        { id: 'RL', pos: [-1.16, 0.35, -1.4], isLeft: true },
        { id: 'RR', pos: [1.16, 0.35, -1.4], isLeft: false },
      ].map((wheel, index) => {
        const offsetMultiplier = wheel.isLeft ? -1 : 1;
        const currentPosX = wheel.pos[0] + (offsetMultiplier * wheelOffset.current);
        const compColor = getComponentColor('Tyres', '#1f2937');
        const rimColor = selectedComponent === 'Tyres' ? '#00FF95' : '#b5b7bd';

        return (
          <group
            key={index}
            position={[currentPosX, wheel.pos[1], wheel.pos[2]]}
            rotation={[0, 0, Math.PI / 2]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent('Tyres');
            }}
          >
            {/* Outer Tire */}
            <mesh>
              <cylinderGeometry args={[0.42, 0.42, 0.32, 24]} />
              <meshStandardMaterial
                color={compColor}
                metalness={0.2}
                roughness={0.85}
                wireframe={isWireframe}
              />
            </mesh>

            {/* Inner Rim Spokes and Hub */}
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

                {/* Spokes */}
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

                {/* Glowing Core Hub Ring */}
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
