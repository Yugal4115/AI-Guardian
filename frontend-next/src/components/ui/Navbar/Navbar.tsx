'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';
import { NavbarProps } from './Navbar.types';

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl transition-all duration-500 rounded-2xl px-6 py-3.5 flex items-center justify-between',
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg',
        className
      )}
    >
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(255,184,0,0.4)] group-hover:scale-105 transition-transform duration-300">
          <Shield className="w-5 h-5 fill-black" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-wider text-white group-hover:text-[#FFB800] transition-colors">
            AI GUARDIAN OS
          </span>
          <span className="text-[9px] text-amber-400/80 tracking-widest uppercase font-mono">
            Mobility Autonomy
          </span>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <a href="#home" className="hover:text-[#FFB800] transition-colors">Home</a>
        <a href="#technology" className="hover:text-[#FFB800] transition-colors">Technology</a>
        <a href="#guardian-ai" className="hover:text-[#FFB800] transition-colors">Guardian AI</a>
        <a href="#vehicle" className="hover:text-[#FFB800] transition-colors">Vehicle</a>
        <a href="#about" className="hover:text-[#FFB800] transition-colors">About</a>
      </nav>

      {/* Experience OS Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={() => router.push('/login')}
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Experience OS
      </Button>
    </header>
  );
};
