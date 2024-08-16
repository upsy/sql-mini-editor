// src/store/dashboardStore.ts
import { create } from 'zustand';


interface DashboardState {
  currentQuery: string;
  queryResults: Array<unknown>;
  setCurrentQuery: (query: string) => void;
  setQueryResults: (newResults: Array<unknown>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentQuery: '',
  queryResults: [],
  setCurrentQuery: (query) => set({ currentQuery: query }),
  setQueryResults: (newResults) => set({queryResults: newResults})
}));