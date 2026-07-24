export interface ComponentHealth {
  battery: number;       // 0 - 100
  motor: number;         // 0 - 100
  tyres: number;         // 0 - 100
  brakes: number;        // 0 - 100
  suspension: number;    // 0 - 100
  gps: boolean;
  radar: boolean;
  camera: boolean;
  lidar: boolean;
  engine: boolean;
  abs: boolean;
  transmission: boolean;
}

export interface VehicleDigitalTwin {
  id: string;
  vin: string;
  manufacturer: string;
  model: string;
  variant: string;
  fuelType: 'EV' | 'Hybrid' | 'ICE';
  modelYear: number;
  health: ComponentHealth;
  telemetry: {
    speed: number;
    rpm: number;
    batterySoc: number;
    batteryTemp: number;
    tirePressureBar: number;
    brakePressurePct: number;
    latitude: number;
    longitude: number;
  };
}
