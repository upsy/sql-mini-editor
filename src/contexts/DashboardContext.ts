import { createContext, useContext } from 'react';
import { BPMEngine } from '@/types';

interface DashboardContextType {
  bpmEngine: BPMEngine;
  url: string;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};

