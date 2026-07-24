'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Fingerprint, Lock, Mail, ShieldAlert, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { LandingCanvas } from '@/components/three/LandingCanvas';
import { useAuthStore } from '@/store/useAuthStore';
import { useVehicleStore } from '@/store/useVehicleStore';
import { loginDriver } from '@/services/authService';
import { AuthSuccessModal } from '@/components/auth/AuthSuccessModal';

export default function LandingPage() {
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
    } catch (err) {
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
    <main className="relative min-h-screen bg-[#050505] text-white overflow-y-auto overflow-x-hidden remix-grid scroll-smooth">
      {/* 1. Fixed R3F 3D Background Canvas */}
      <div className="fixed inset-0 w-full h-full z-0">
        {/* Subtle glow overlay behind the car */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFB800]/5 rounded-full blur-3xl pointer-events-none" />
        <LandingCanvas currentScene={2} />
      </div>

      {/* Ambient Remix-Style Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] remix-glow-purple rounded-full pointer-events-none filter blur-[120px] opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] remix-glow-blue rounded-full pointer-events-none filter blur-[140px] opacity-50" />

      {/* Post-login workspace success modal */}
      {showSuccessModal && <AuthSuccessModal onComplete={handleSuccessComplete} />}

      {/* 2. Scrolling Content Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* SECTION 1: Above the Fold - Hero Introduction (Few lines about project) */}
        <section className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-16 py-24 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]/95">
          <div className="max-w-2xl space-y-6">
            
            {/* Header Branding */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                <Shield className="w-6 h-6 fill-black" />
              </div>
              <div>
                <h1 className="font-bold tracking-wider text-base text-white">
                  GUARDIAN AI OS
                </h1>
                <p className="text-[10px] text-amber-400/80 tracking-widest uppercase font-mono">
                  Mobility Autonomy
                </p>
              </div>
            </motion.div>

            {/* Brief 2-3 Line Project Introduction */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl font-black font-mono tracking-tight leading-none"
              >
                <span className="text-gradient-gold">GUARDIAN OS</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.4 }}
                className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans max-w-lg"
              >
                An enterprise-grade, fully agentic AI platform for autonomous vehicle safety and diagnostics. 
                Fuses high-frequency telemetry streams with active cabin copilot reasoning and explainable driving logic.
              </motion.p>
            </div>
          </div>

          {/* Animated Pulsing Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono text-amber-400/80"
          >
            <span>Scroll down to authenticate</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-[#FFB800]" />
          </motion.div>
        </section>

        {/* SECTION 2: Below the Fold - Login Gateway with Smooth Slide/Fade animation */}
        <section className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-b from-[#050505]/95 via-[#050505] to-[#050505]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full max-w-md"
          >
            <GlassCard goldBorder hoverEffect={false} className="p-6 sm:p-8 backdrop-blur-2xl relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-tr-xl rounded-bl-xl pointer-events-none" />
              
              <div className="text-center mb-6">
                <h3 className="text-sm font-bold font-mono text-white tracking-widest uppercase border-b border-white/10 pb-2">
                  AUTHENTICATE IDENTITY
                </h3>
                <p className="text-[10px] text-amber-400/70 font-mono mt-1">
                  ESTABLISH SECURE WORKSPACE PORTAL CONNECTION
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-400">DRIVER EMAIL / ID</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800] transition-colors"
                    />
                    <Mail className="w-3.5 h-3.5 text-gray-500 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-400">SECURITY PASSPHRASE</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800] transition-colors"
                    />
                    <Lock className="w-3.5 h-3.5 text-gray-500 absolute right-3.5 top-3" />
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full text-xs font-mono py-2.5 mt-2 shadow-[0_0_15px_rgba(255,184,0,0.2)] hover:shadow-[0_0_25px_rgba(255,184,0,0.4)]" 
                  type="submit" 
                  isLoading={isLoading}
                >
                  Establish Secure Connection
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-400 hover:text-white transition-colors"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>Simulate Biometric Scan</span>
                  </button>
                </div>
              </form>
            </GlassCard>

            <div className="text-[10px] text-gray-500 font-mono flex justify-between px-2 mt-4">
              <span>SECURE CONNECTION</span>
              <span>v2.0-STABLE</span>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
