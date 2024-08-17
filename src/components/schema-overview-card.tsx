import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DbSchemaViewer } from "./db-schema-viewer";
import { TableSchema } from "@/types";
import { FancyMultiSelect } from "./fancy-multi-select";
import { useState, useMemo, useCallback } from "react";


export function SchemaOverviewCard({dbSchema}:{dbSchema:TableSchema[]}){
    const selectedTableNames = useMemo(()=>dbSchema.map(it=>it.tableName),[dbSchema]);
    const [displayedSchema, setDisplayedSchema] = useState(dbSchema);

    const onOptionsChange = useCallback(( newOptions : string[] )=>{
        setDisplayedSchema(dbSchema.filter(it=>newOptions.includes(it.tableName)))
        console.log(">> onOptionsChange", dbSchema, newOptions);
    },[setDisplayedSchema,dbSchema]);

    return   (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schema Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
            <FancyMultiSelect options={selectedTableNames} onOptionsChange={onOptionsChange}></FancyMultiSelect>
            <div className="flex h-[500px] w-[100%]">
                <DbSchemaViewer dbSchema={displayedSchema} ></DbSchemaViewer>
            </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}