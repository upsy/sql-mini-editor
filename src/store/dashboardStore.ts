// src/store/dashboardStore.ts
import create from 'zustand';

type QueryHistoryItem = {
    query: string;
    created_d: string;
    user_id: string;
}

interface DashboardState {
  currentQuery: string;
  queryHistory: Array<QueryHistoryItem>
  setCurrentQuery: (query: string) => void;
  addToQueryHistory: (query: QueryHistoryItem) => void;
  setQueryHistory:(query: Array<QueryHistoryItem>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentQuery: '',
  queryHistory: [],
  setCurrentQuery: (query) => set({ currentQuery: query }),
  addToQueryHistory: (query) => set((state) => ({ 
    queryHistory: [query, ...state.queryHistory]
  })),
  setQueryHistory: (query)=>set({queryHistory: query}),
}));