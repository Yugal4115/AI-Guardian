'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/ui/Sidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { FloatingSaviraOrb } from '@/components/layout/FloatingSaviraOrb';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { NotificationDrawer } from '@/components/layout/NotificationDrawer';
import { KeyboardShortcutsModal } from '@/components/ui/KeyboardShortcutsModal';
import { PerformanceBanner } from '@/components/ui/PerformanceBanner';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isCmdPaletteOpen,
    setIsCmdPaletteOpen,
    isShortcutsHelpOpen,
    setIsShortcutsHelpOpen,
  } = useKeyboardShortcuts();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050505] text-white flex relative overflow-hidden remix-grid">
        {/* Ambient Remix-Style Glow Spheres */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] remix-glow-blue rounded-full pointer-events-none filter blur-[120px] opacity-70" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] remix-glow-purple rounded-full pointer-events-none filter blur-[100px] opacity-70" />

        {/* Strict 5-Item Sidebar Navigation */}
        <Sidebar />

        {/* Main Workspace Area */}
        <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
          {/* Top OS Navbar Header */}
          <TopNavbar
            onOpenCommandPalette={() => setIsCmdPaletteOpen(true)}
            onOpenNotifications={() => setIsNotifOpen(true)}
            onOpenShortcutsHelp={() => setIsShortcutsHelpOpen(true)}
          />

          {/* Module Viewport */}
          <main className="flex-1 p-8 pb-24">{children}</main>
        </div>

        {/* Floating SAVIRA 3D Holographic AI Orb (ALWAYS VISIBLE bottom-right) */}
        <FloatingSaviraOrb />

        {/* Live Performance & Observability HUD Banner (bottom-left) */}
        <PerformanceBanner />

        {/* Global Command Search Palette (Cmd/Ctrl + K) */}
        <CommandPalette
          isOpen={isCmdPaletteOpen}
          onClose={() => setIsCmdPaletteOpen(false)}
        />

        {/* Keyboard Shortcuts Help Modal (Cmd/Ctrl + /) */}
        <KeyboardShortcutsModal
          isOpen={isShortcutsHelpOpen}
          onClose={() => setIsShortcutsHelpOpen(false)}
        />

        {/* Slide-out Notification Drawer */}
        <NotificationDrawer
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
}
