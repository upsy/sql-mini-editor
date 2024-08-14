import { SQLMiniEditorCard } from "@/components/sql-mini-editor-card";
import { QueryResultsCard } from "@/components/query-results-card";
import { QueryHistoryCard } from "@/components/query-history-card";


import { useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { DashboardContext } from "./contexts/DashboardContext";
import { bpmEngine as fakeBpmEngine } from "./external-dummy/bpmEngine";

function App() {


  const [queryClient] = useState(
    () =>
        new QueryClient({
          defaultOptions: { queries: { refetchOnWindowFocus: false } },
        })
  );

  const allowedTables = ['users', 'orders', 'products'];
  const tableColumns = {
    users: ['id', 'name', 'email'],
    orders: ['id', 'user_id', 'total'],
    products: ['id', 'name', 'price']
  };


  return (
    <DashboardContext.Provider value={{bpmEngine:fakeBpmEngine, url:'fake_url'}}>
      <QueryClientProvider client={queryClient}>
        
        <div className="flex p-2 w-full flex-col">
          <div className="flex flex-row gap-2 w-full">
            <SQLMiniEditorCard allowedTables={allowedTables} tableColumns={tableColumns}/>
            <QueryHistoryCard/>
          </div>
            <QueryResultsCard />
        </div>
      </QueryClientProvider>
    </DashboardContext.Provider>
  );
}

export default App
