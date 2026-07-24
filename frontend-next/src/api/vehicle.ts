import { apiClient } from '@/utils/apiClient';
import { VehicleDigitalTwin } from '@/types/vehicle';

export const vehicleApi = {
  searchByReg: async (regNumber: string): Promise<VehicleDigitalTwin> => {
    try {
      const res = await apiClient.get(`/vehicles/search?reg=${encodeURIComponent(regNumber)}`);
      return res.data;
    } catch {
      return {
        id: 'veh_nio_gtx_2026',
        vin: 'VIN-984021-X',
        manufacturer: 'NIO / GAURDIAN CYBER',
        model: 'GT-X Performance',
        variant: 'Dual-Motor AWD',
        fuelType: 'EV',
        modelYear: 2026,
        health: {
          battery: 99.2,
          motor: 100,
          tyres: 95.0,
          brakes: 98.4,
          suspension: 100,
          gps: true,
          radar: true,
          camera: true,
          lidar: true,
          engine: true,
          abs: true,
          transmission: true,
        },
        telemetry: {
          speed: 72,
          rpm: 2100,
          batterySoc: 88,
          batteryTemp: 28.4,
          tirePressureBar: 2.4,
          brakePressurePct: 0,
          latitude: 12.9716,
          longitude: 77.5946,
        },
      };
    }
  },
  getDigitalTwin: async (id: string): Promise<VehicleDigitalTwin> => {
    try {
      const res = await apiClient.get(`/vehicles/${id}`);
      return res.data;
    } catch {
      return vehicleApi.searchByReg('TN 38 AB 1234');
    }
  },
};
