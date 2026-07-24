'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SaviraCore3D } from '@/components/savira/SaviraCore3D';
import { SaviraFullPanel } from '@/components/savira/SaviraFullPanel';
import { useSavira } from '@/hooks/useSavira';

export const FloatingSaviraOrb: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { saviraState } = useSavira();

  return (
    <>
      {/* Floating 3D Holographic AI Orb Trigger Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 rounded-full bg-[#111111]/90 backdrop-blur-2xl border border-[#FFB800]/40 shadow-[0_0_35px_rgba(255,184,0,0.4)] flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
        >
          {/* R3F Mini Canvas Hosting SaviraCore3D */}
          <div className="w-14 h-14 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4.5] }}>
              <ambientLight intensity={0.8} />
              <SaviraCore3D state={saviraState} />
            </Canvas>
          </div>

          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#00FF95] border-2 border-[#050505] animate-ping" />
        </button>
      </div>

      {/* Full SAVIRA Copilot Inspector Modal */}
      {isOpen && <SaviraFullPanel onClose={() => setIsOpen(false)} />}
    </>
  );
};
