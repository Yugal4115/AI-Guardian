'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Scene7CTA: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-24 relative z-10 text-center">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mb-8 shadow-[0_0_60px_rgba(255,184,0,0.6)] animate-pulse-gold">
        <Shield className="w-12 h-12 fill-black" />
      </div>

      <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-mono tracking-tight">
        ENTER GUARDIAN OS
      </h2>

      <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed font-light">
        Experience the future of autonomous intelligent mobility today.
      </p>

      <Button
        variant="primary"
        size="lg"
        onClick={() => router.push('/login')}
        rightIcon={<ArrowRight className="w-6 h-6" />}
        className="text-lg px-10 py-5 rounded-2xl"
      >
        Enter Guardian OS
      </Button>
    </div>
  );
};
