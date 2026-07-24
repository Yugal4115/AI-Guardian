'use client';

import { useState, useEffect, useRef } from 'react';

export interface TelemetryStreamData {
  speed: number;            // 0 - 240 km/h
  rpm: number;              // 0 - 8000
  batterySoc: number;       // 0 - 100%
  batteryTemp: number;      // °C
  brakePressure: number;    // %
  throttle: number;         // %
  imuGForce: number;        // G
  riskScore: number;        // 0 - 100
  tripDistance: number;     // km
  latitude: number;
  longitude: number;
  status: 'OPTIMAL' | 'ELEVATED_RISK' | 'WARNING';
}

export function useWebSocketTelemetry(wsUrl = 'ws://localhost:8000/api/v1/telemetry/ws?trip_id=trip_01') {
  const [telemetry, setTelemetry] = useState<TelemetryStreamData>({
    speed: 72,
    rpm: 2100,
    batterySoc: 88,
    batteryTemp: 28.4,
    brakePressure: 0,
    throttle: 42,
    imuGForce: 1.02,
    riskScore: 12,
    tripDistance: 42.8,
    latitude: 12.9716,
    longitude: 77.5946,
    status: 'OPTIMAL',
  });

  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    try {
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.telemetry) {
            setTelemetry((prev) => ({ ...prev, ...parsed.telemetry }));
          }
        } catch {
          // ignore invalid JSON
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
      };

      socket.onerror = () => {
        setIsConnected(false);
      };

      return () => {
        socket.close();
      };
    } catch {
      setIsConnected(false);
    }
  }, [wsUrl]);

  // Smooth simulated live jitter for demo when WS is offline
  useEffect(() => {
    if (isConnected) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const jitterSpeed = Math.max(0, Math.min(180, prev.speed + (Math.random() - 0.5) * 4));
        const jitterRpm = Math.max(800, Math.min(6000, prev.rpm + (Math.random() - 0.5) * 80));
        const jitterRisk = Math.max(5, Math.min(95, prev.riskScore + (Math.random() - 0.5) * 2));
        return {
          ...prev,
          speed: Number(jitterSpeed.toFixed(1)),
          rpm: Math.round(jitterRpm),
          riskScore: Number(jitterRisk.toFixed(1)),
          tripDistance: Number((prev.tripDistance + 0.01).toFixed(2)),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return { telemetry, isConnected };
}
