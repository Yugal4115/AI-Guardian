'use client';

import React, { useState } from 'react';
import { Sparkles, Mic, Send, X, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useSavira } from '@/hooks/useSavira';
import { VoiceWaveform } from './VoiceWaveform';
import { GrammarBadge } from './GrammarBadge';

interface SaviraPanelProps {
  onClose: () => void;
}

const suggestedCommands = [
  'wht is battrey helth',
  'Check tyre pressure status.',
  'When is the next service due?',
  'Generate daily safety report.',
  'Find nearest charging station.',
  'Who won IPL?',
];

export const SaviraFullPanel: React.FC<SaviraPanelProps> = ({ onClose }) => {
  const { saviraState, messages, sendMessage } = useSavira();
  const [inputQuery, setInputQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      sendMessage(inputQuery.trim());
      setInputQuery('');
    }
  };

  const handleCommandClick = (cmd: string) => {
    sendMessage(cmd);
  };

  return (
    <GlassCard
      goldBorder
      className="fixed bottom-24 right-6 z-50 w-[420px] md:w-[480px] p-6 shadow-[0_0_60px_rgba(255,184,0,0.35)] animate-fade-in space-y-4 backdrop-blur-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8A00] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,184,0,0.4)]">
            <Shield className="w-5 h-5 fill-black" />
          </div>
          <div>
            <h3 className="font-mono text-base font-bold text-white">SAVIRA AI CORE</h3>
            <span className="text-[10px] font-mono text-[#00FF95] font-bold">STATE: {saviraState}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Voice Waveform Visualizer */}
      <VoiceWaveform isActive={saviraState !== 'IDLE'} />

      {/* Chat Conversation Stream */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs font-mono">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-1">
            <div
              className={`p-3.5 rounded-2xl ${
                msg.sender === 'USER'
                  ? 'bg-amber-500/20 text-white ml-8 text-right border border-amber-500/30'
                  : 'bg-white/[0.04] text-gray-200 mr-8 border border-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] text-amber-400 font-bold mb-1">
                <span>{msg.sender}</span>
                <span className="text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </div>

            {/* Grammar Correction Badge if applicable */}
            {msg.responseDetails?.grammar && (
              <GrammarBadge grammar={msg.responseDetails.grammar} />
            )}

            {/* Explainable AI Reasoning Box if present */}
            {msg.responseDetails?.attribution && (
              <div className="ml-2 mr-8 p-3 rounded-xl bg-white/[0.02] border border-[#FFB800]/20 text-[11px] font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-[#FFB800] font-bold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>SAVIRA REASONING ATTRIBUTION</span>
                </div>
                <p className="text-gray-300">{msg.responseDetails.attribution.reason}</p>
                <div className="flex items-center gap-3 pt-1 text-[10px] text-gray-400">
                  <span>CONFIDENCE: {msg.responseDetails.attribution.confidence}%</span>
                  <span>ACTION: {msg.responseDetails.attribution.recommendedAction}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Commands Pills */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-mono text-gray-400 font-bold">SUGGESTED COMMANDS:</span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommandClick(cmd)}
              className="text-[10px] font-mono bg-white/[0.04] hover:bg-amber-500/20 text-gray-300 hover:text-amber-400 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask SAVIRA (e.g. wht is battrey helth)..."
          className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-[#FFB800]"
        />
        <button
          type="button"
          onClick={() => sendMessage('Check vehicle diagnostics')}
          className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-amber-400 border border-white/10"
        >
          <Mic className="w-4 h-4" />
        </button>
        <Button variant="primary" size="md" type="submit">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </GlassCard>
  );
};
