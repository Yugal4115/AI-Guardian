'use client';

import { useState } from 'react';
import { processSaviraPrompt, SaviraResponse } from '@/services/saviraEngine';

export type SaviraState =
  | 'IDLE'
  | 'LISTENING'
  | 'THINKING'
  | 'RESPONDING'
  | 'WARNING'
  | 'EMERGENCY'
  | 'OFFLINE'
  | 'INITIALIZING';

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'SAVIRA';
  text: string;
  responseDetails?: SaviraResponse;
  timestamp: string;
}

export function useSavira() {
  const [saviraState, setSaviraState] = useState<SaviraState>('IDLE');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'SAVIRA',
      text: "Good Evening. Welcome to Guardian OS. Your vehicle is connected. Vehicle Health: 98%. Battery: 88%. No critical alerts detected. Today's weather is ideal for driving. How may I assist you today?",
      timestamp: '22:45',
    },
  ]);

  const sendMessage = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'USER',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setSaviraState('LISTENING');

    setTimeout(() => {
      setSaviraState('THINKING');

      setTimeout(() => {
        const responseData = processSaviraPrompt(promptText);
        const saviraMsg: ChatMessage = {
          id: `s_${Date.now()}`,
          sender: 'SAVIRA',
          text: responseData.text,
          responseDetails: responseData,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, saviraMsg]);
        setSaviraState('RESPONDING');

        setTimeout(() => {
          setSaviraState('IDLE');
        }, 3000);
      }, 800);
    }, 600);
  };

  return {
    saviraState,
    setSaviraState,
    messages,
    sendMessage,
  };
}
