'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketService } from '@/services/websocketService';

interface WebSocketContextType {
  wsService: WebSocketService | null;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType>({
  wsService: null,
  isConnected: false,
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wsService, setWsService] = useState<WebSocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const service = new WebSocketService();
    service.connect();
    setWsService(service);

    const unsubscribe = service.subscribe(() => {
      setIsConnected(true);
    });

    return () => {
      unsubscribe();
      service.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ wsService, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
