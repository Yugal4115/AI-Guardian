'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle2, Phone, Mail, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: 'Empty', score: 0, color: 'bg-gray-700' };
    if (pass.length < 6) return { label: 'Weak', score: 25, color: 'bg-red-500' };
    if (pass.length < 10) return { label: 'Moderate', score: 65, color: 'bg-amber-500' };
    return { label: 'Strong Guardian Passphrase', score: 100, color: 'bg-[#00FF95]' };
  };

  const strength = getPasswordStrength(password);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      alert('Please accept terms & privacy policy.');
      return;
    }

    setAuth(
      { id: 'usr_new', email, name: fullName, mobile },
      'mock_jwt_token_guardian_os'
    );
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute w-[450px] h-[450px] bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none animate-pulse-gold" />

      <GlassCard goldBorder className="w-full max-w-lg p-8 relative z-10 space-y-6 backdrop-blur-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black mx-auto">
            <Shield className="w-6 h-6 fill-black" />
          </div>
          <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
            CREATE DRIVER ACCOUNT
          </h1>
          <p className="text-xs text-amber-400 font-mono">GUARDIAN IDENTITY REGISTRATION</p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-1">
            <label className="text-xs font-mono text-gray-300">FULL NAME</label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Vance"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
              />
              <User className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300">EMAIL ADDRESS</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="driver@guardian.ai"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300">MOBILE NUMBER</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
                <Phone className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300">SECURITY PASSPHRASE</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-300">CONFIRM PASSPHRASE</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
                <Lock className="w-4 h-4 text-gray-500 absolute right-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Password Strength Meter */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>STRENGTH:</span>
                <span className="text-white font-bold">{strength.label}</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}

          {/* Terms Acceptance */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-white/10 text-[#FFB800] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-300 cursor-pointer font-mono">
              I accept Guardian OS Terms of Service & Privacy Policy
            </label>
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit">
            Create Account & Continue
          </Button>
        </form>

        <div className="text-center text-xs text-gray-400 font-mono">
          Already registered?{' '}
          <Link href="/login" className="text-amber-400 hover:underline">
            Sign In
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
