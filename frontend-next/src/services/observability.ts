'use client';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

class ObservabilityEngine {
  private metrics: PerformanceMetric[] = [];

  public logMetric(name: string, value: number, unit = 'ms') {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    this.metrics.push(metric);
    if (this.metrics.length > 50) {
      this.metrics.shift();
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }
}

export const observability = new ObservabilityEngine();
