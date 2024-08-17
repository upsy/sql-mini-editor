import { SQLMiniEditorCard } from "@/components/sql-mini-editor-card";
import { QueryResultsCard } from "@/components/query-results-card";
import { QueryHistoryCard } from "@/components/query-history-card";


import { useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { DashboardContext } from "./contexts/DashboardContext";
import { bpmEngine as fakeBpmEngine } from "./external-dummy/bpmEngine";


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Database, DatabaseIcon, PenBoxIcon } from "lucide-react";
import { SchemaOverviewCard } from "./components/schema-overview-card";


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
        <Tabs defaultValue="sql-editor" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-2 m-2">
            <TabsTrigger value="sql-editor"><PenBoxIcon className="w-4 h-4 mr-2"></PenBoxIcon>SQL Editor</TabsTrigger>
            <TabsTrigger value="overview"><DatabaseIcon className="w-4 h-4 mr-2" />Schema Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="sql-editor">
            <div className="flex p-2 w-full flex-col">
              <div className="flex flex-row gap-2 w-full">
                <SQLMiniEditorCard allowedTables={allowedTables} tableColumns={tableColumns}/>
                <QueryHistoryCard/>
              </div>
                <QueryResultsCard />
            </div>
          </TabsContent>
          <TabsContent value="overview">
            <div className="flex p-2 w-full flex-col">
              <SchemaOverviewCard/>
            </div>
          </TabsContent>
        </Tabs>
      </QueryClientProvider>
    </DashboardContext.Provider>
  );
}

export default App
