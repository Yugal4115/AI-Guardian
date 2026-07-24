'use client';

import { useQuery } from '@tanstack/react-query';
import { guardianApi } from '@/api/guardian';

export function useGuardian(vehicleId = 'veh_nio_gtx_2026') {
  const { data: reasoning, isLoading, refetch } = useQuery({
    queryKey: ['guardian_reasoning', vehicleId],
    queryFn: () => guardianApi.getReasoning(vehicleId),
  });

  return {
    reasoning,
    isLoading,
    refetch,
  };
}
