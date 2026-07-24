'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useVehicleStore } from '@/store/useVehicleStore';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { hasRegisteredVehicle } = useVehicleStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated) {
      router.push('/login');
    } else if (!hasRegisteredVehicle) {
      router.push('/onboarding');
    }
  }, [mounted, isAuthenticated, hasRegisteredVehicle, router]);

  if (!mounted) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !hasRegisteredVehicle) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
