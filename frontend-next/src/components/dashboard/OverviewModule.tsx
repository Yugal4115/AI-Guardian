'use client';

import React from 'react';
import { ExecutiveSummaryCards } from '@/components/analytics/ExecutiveSummaryCards';
import { AiInsightFeed } from '@/components/analytics/AiInsightFeed';
import { TrendAnalysisCharts } from '@/components/analytics/TrendAnalysisCharts';
import { PredictiveAnalyticsGrid } from '@/components/analytics/PredictiveAnalyticsGrid';
import { ExplainableAiCards } from '@/components/analytics/ExplainableAiCards';
import { ReportCenter } from '@/components/analytics/ReportCenter';

export const OverviewModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Workspace Header */}
      <div className="relative z-10">
        <h1 className="text-3xl font-black font-mono tracking-tight">
          <span className="text-gradient-gold">ANALYTICS & EXPLAINABLE INTELLIGENCE CENTER</span>
        </h1>
        <p className="text-xs text-amber-400/80 font-mono mt-1 tracking-wider">
          SAVIRA EXPLAINABLE DECISION PLATFORM • REAL-TIME MULTIMODAL INFERENCE
        </p>
      </div>

      {/* Executive Summary Metric Cards */}
      <ExecutiveSummaryCards />

      {/* Continuous AI Insight Feed & Predictive Diagnostics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AiInsightFeed />
        <PredictiveAnalyticsGrid />
      </div>

      {/* Interactive Trend Analysis (Recharts Curves) */}
      <TrendAnalysisCharts />

      {/* Expandable Explainable AI Cards (Answers WHY?) */}
      <ExplainableAiCards />

      {/* Professional AI Report Center & Export */}
      <ReportCenter />
    </div>
  );
};
