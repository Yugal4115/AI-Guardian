'use client';

import { useQuery } from '@tanstack/react-query';
import { vehicleApi } from '@/api/vehicle';

export function useVehicle(regNumber = 'TN 38 AB 1234') {
  const { data: vehicle, isLoading, isError, refetch } = useQuery({
    queryKey: ['vehicle', regNumber],
    queryFn: () => vehicleApi.searchByReg(regNumber),
  });

  return {
    vehicle,
    isLoading,
    isError,
    refetch,
  };
}
