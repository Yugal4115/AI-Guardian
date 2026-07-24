'use client';

import React, { useState } from 'react';
import { FileText, Download, Share2, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

const reportTypes = [
  { id: 'daily', label: 'Daily Safety Summary', range: 'Today' },
  { id: 'weekly', label: 'Weekly Diagnostics Log', range: 'Last 7 Days' },
  { id: 'monthly', label: 'Monthly Fleet Analytics', range: 'Last 30 Days' },
  { id: 'battery', label: 'HV Battery Health Curve', range: 'All Time' },
];

export const ReportCenter: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('weekly');

  const handleExport = (format: 'PDF' | 'CSV') => {
    toast.success(`${format} report generated successfully!`, {
      icon: <CheckCircle2 className="w-5 h-5 text-[#00FF95]" />,
    });
  };

  return (
    <GlassCard space-y-4>
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-sm font-bold text-white">PROFESSIONAL AI REPORT CENTER</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Selector */}
        <div className="md:col-span-1 space-y-2">
          {reportTypes.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReport(r.id)}
              className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                selectedReport === r.id
                  ? 'bg-gradient-to-r from-[#FFB800]/20 to-transparent border-l-4 border-[#FFB800] text-white font-bold'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <span>{r.label}</span>
              <span className="text-[10px] text-gray-500">{r.range}</span>
            </button>
          ))}
        </div>

        {/* Action Panel */}
        <div className="md:col-span-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] text-amber-400 font-bold">REPORT SYNOPSIS</span>
            <p className="text-gray-300 leading-relaxed">
              Odometer distance evaluated at 41,800 km. Average energy consumption is 162 Wh/km. Overall battery longevity remains high with zero localized cell thermal stress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleExport('PDF')}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export PDF
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport('CSV')}
              leftIcon={<FileText className="w-4 h-4" />}
            >
              Export CSV
            </Button>
            <button
              onClick={() => window.print()}
              title="Print Report"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => toast.success('Report shared via fleet API.')}
              title="Share Report"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
