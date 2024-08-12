import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SQLMiniEditorTextarea from "./sql-mini-editor-textarea";
import { Play } from 'lucide-react';

interface SQLEditorProps {
  allowedTables: string[];
  tableColumns: Record<string, string[]>;
}

export function SQLMiniEditorCard({allowedTables, tableColumns} : SQLEditorProps ){
    return   (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle>SQL Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <SQLMiniEditorTextarea allowedTables={allowedTables} tableColumns={tableColumns} />
      </CardContent>
      <CardFooter>
        <Button><Play className='w-4 h-4 mr-2'></Play>Run Query</Button>
      </CardFooter>
    </Card>)
}