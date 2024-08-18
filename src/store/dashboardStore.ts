// src/store/dashboardStore.ts
import { create } from 'zustand';


type ReactStyleStateSetter<T> = T | ((prev: T) => T);


interface DashboardState {
  currentQuery: string;
  queryResults: Array<unknown>;
  selectedTableNames: Array<Record<"value" | "label", string>>;
  setCurrentQuery: (query: string) => void;
  setQueryResults: (newResults: Array<unknown>) => void;
  setSelectedTableNames: (newTableNamesOrSetterFn: ReactStyleStateSetter<Array<Record<"value" | "label", string>>>) => void;
}



export const useDashboardStore = create<DashboardState>((set) => ({
  currentQuery: '',
  queryResults: [],
  selectedTableNames: [],
  setCurrentQuery: (query) => set({ currentQuery: query }),
  setQueryResults: (newResults) => set({ queryResults: newResults }),
  setSelectedTableNames: (newTableNames) => {
    set(({ selectedTableNames }) => {
      // your type check equivalent here
      if ((newTableNames instanceof Array)) {
        return { selectedTableNames: newTableNames };
      }
      const setterFn = newTableNames;
      return {
        selectedTableNames: setterFn(selectedTableNames)
      };
    }
    )
  }
}));

console.log(">> create zustand", useDashboardStore);