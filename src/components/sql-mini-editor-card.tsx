import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SQLMiniEditorTextarea from "./sql-mini-editor-textarea";
import { Play } from 'lucide-react';
import { useDashboardStore } from "@/store/dashboardStore";
import { useRunQuery } from "@/hooks/useRunQuery";

interface SQLEditorProps {
  allowedTables: string[];
  tableColumns: Record<string, string[]>;
}

export function SQLMiniEditorCard({allowedTables, tableColumns} : SQLEditorProps ){
  const { currentQuery, setCurrentQuery } = useDashboardStore();
  const { mutate: runQuery, isPending }  = useRunQuery();

  const handleQueryChange = (newQuery:string) => {
    setCurrentQuery(newQuery);
  };

    return   (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle>SQL Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <SQLMiniEditorTextarea currentQuery={currentQuery} allowedTables={allowedTables} tableColumns={tableColumns} onQueryChange={handleQueryChange}/>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
        <Button onClick={() => runQuery(currentQuery)} disabled={isPending || !currentQuery}><Play className='w-4 h-4 mr-2'></Play> {isPending ? 'Running...' : 'Run Query'}</Button>
        <div className="text-sm text-slate-400">{currentQuery}</div>
        </div>
      </CardFooter>
    </Card>)
}