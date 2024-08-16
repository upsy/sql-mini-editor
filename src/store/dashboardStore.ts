// src/store/dashboardStore.ts
import { create } from 'zustand';


interface DashboardState {
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentQuery: '',
  setCurrentQuery: (query) => set({ currentQuery: query }),
}));