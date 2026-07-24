'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Fingerprint, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { LandingCanvas } from '@/components/three/LandingCanvas';
import { useAuthStore } from '@/store/useAuthStore';
import { useVehicleStore } from '@/store/useVehicleStore';
import { loginDriver } from '@/services/authService';
import { AuthSuccessModal } from '@/components/auth/AuthSuccessModal';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { hasRegisteredVehicle } = useVehicleStore();

  const [email, setEmail] = useState('driver@guardian.ai');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await loginDriver(email, password);
      setAuth(data.user, data.access_token);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch {
      setIsLoading(false);
      setErrorMessage('Invalid authentication credentials.');
    }
  };

  const handleSuccessComplete = () => {
    if (hasRegisteredVehicle) {
      router.push('/dashboard/overview');
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Vehicle Canvas & Glow background */}
      <LandingCanvas currentScene={2} />
      <div className="absolute w-[500px] h-[500px] bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none animate-pulse-gold" />

      {/* Post-login workspace modal */}
      {showSuccessModal && <AuthSuccessModal onComplete={handleSuccessComplete} />}

      <GlassCard goldBorder className="w-full max-w-md p-8 relative z-10 space-y-6 backdrop-blur-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mx-auto shadow-[0_0_30px_rgba(255,184,0,0.5)]">
            <Shield className="w-8 h-8 fill-black" />
          </div>
          <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
            AUTHENTICATION GATEWAY
          </h1>
          <p className="text-xs text-amber-400 font-mono tracking-widest uppercase">
            AI GUARDIAN OS v2.0
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-xs font-mono text-gray-300">DRIVER EMAIL / ID</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-gray-300">SECURITY PASSPHRASE</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800] transition-colors"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit" isLoading={isLoading}>
            Sign In & Next
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleLogin}
              className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-white transition-colors"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Simulate Biometric Passkey Scan</span>
            </button>
          </div>
        </form>

        <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-white/10 font-mono">
          <Link href="/register" className="hover:text-amber-400">Create Account</Link>
          <Link href="/forgot-password" className="hover:text-amber-400">Forgot Passphrase?</Link>
        </div>
      </GlassCard>
    </main>
  );
}
