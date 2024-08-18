import { SQLMiniEditorCard } from "@/components/sql-mini-editor-card";
import { QueryResultsCard } from "@/components/query-results-card";
import { QueryHistoryCard } from "@/components/query-history-card";


import { useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { DashboardContext } from "./contexts/DashboardContext";


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Toaster } from "@/components/ui/sonner"

import { DatabaseIcon, PenBoxIcon } from "lucide-react";
import { SchemaOverviewCard } from "./components/schema-overview-card";
import { useDbSchema } from "./hooks/useDBSchema";
import { BPMEngine } from "./types";
// import { error } from "console";
import React, { } from 'react';
import { createRoot } from 'react-dom/client';
import { useDashboardStore } from "./store/dashboardStore";
import { bpmEngine as fakeBpmEngine } from "./external-dummy/bpmEngine";
import { Skeleton } from "./components/ui/skeleton";


declare global {
  interface Window {
    react_sqlDashboard: object;
  }
}

window.react_sqlDashboard = {
  SQLDashboard,
  React,
  createRoot,
  fakeBpmEngine,
  zustand_useStore: useDashboardStore
};

function SQLDashboard({ bpmEngine, url }: { bpmEngine: BPMEngine, url: string }) {


  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <DashboardContext.Provider value={{ bpmEngine: bpmEngine, url: url }}>
      <QueryClientProvider client={queryClient}>
        <div className="px-4 py-2 bg-zinc-50">
          <FullDashboard />
        </div>
        <Toaster></Toaster>
      </QueryClientProvider>
    </DashboardContext.Provider>
  );
}

export default SQLDashboard;


function FullDashboard() {
  // console.log(">> render FullDashboard");
  const { data: fetchedSchema, error } = useDbSchema();


  const allowedTables = fetchedSchema?.map(it => it.tableName);
  const tableColumns: Record<string, string[]> = {};
  fetchedSchema?.forEach(it => {

    if (!tableColumns[it.tableName]) {
      tableColumns[it.tableName] = [];
    }

    it.columns.forEach(col => {
      tableColumns[it.tableName].push(col.name);
    });

  });

  if (!fetchedSchema) return (<FullDashboardSkeleton/>);
  if (!allowedTables) return (<p>Error.. failed to load allowed tables from server!</p>);

  if (error) return (<p>{'Error loading schema ' + error.toString()}</p>);

  return (<Tabs defaultValue="sql-editor" className="w-full">
    <TabsList className="grid w-[400px] grid-cols-2 m-2">
      <TabsTrigger value="sql-editor"><PenBoxIcon className="w-4 h-4 mr-2"></PenBoxIcon>SQL Execution</TabsTrigger>
      <TabsTrigger value="overview"><DatabaseIcon className="w-4 h-4 mr-2" />Schema Overview</TabsTrigger>
    </TabsList>
    <TabsContent value="sql-editor">
      <div className="flex p-2 w-full flex-col">
        <div className="flex flex-row gap-2 w-full">
          <SQLMiniEditorCard allowedTables={allowedTables} tableColumns={tableColumns} />
          <QueryHistoryCard />
        </div>
        <QueryResultsCard />
      </div>
    </TabsContent>
    <TabsContent value="overview">
      <div className="flex p-2 w-full flex-col">
        <SchemaOverviewCard dbSchema={fetchedSchema} />
      </div>
    </TabsContent>
  </Tabs>)
}


function FullDashboardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[40px] w-[400px] rounded-md m-2 bg-zinc-200" />
      <div className="flex p-2 w-full flex-col gap-2">
        <div className="flex flex-row gap-2 w-full">
          <Skeleton className="w-2/3 h-[380px] bg-zinc-200"/>
          <Skeleton className="w-1/3 h-[380px] bg-zinc-200"/>
        </div>
        <Skeleton className="w-full h-[146px] bg-zinc-200" />
      </div>
    </div>
  )
}