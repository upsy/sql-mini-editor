import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DbSchemaViewer } from "./db-schema-viewer";
import { TableSchema } from "@/types";
import { FancyMultiSelect } from "./fancy-multi-select";
import { useMemo } from "react";
import { useDashboardStore } from "@/store/dashboardStore";


export function SchemaOverviewCard({dbSchema}:{dbSchema:TableSchema[]}){
    console.log('>> render SchemaOverviewCard', dbSchema);

    const allTableNames = useMemo(()=>dbSchema.map(it=>it.tableName),[dbSchema]);
    const selectedTableNames = useDashboardStore((state)=>state.selectedTableNames);
    const displayedSchema = dbSchema.filter(it=>selectedTableNames.map(it=>it.value).includes(it.tableName))
    // const onOptionSelected = useCallback(( newOptions : string[] )=>{
    //     setDisplayedSchema(dbSchema.filter(it=>newOptions.includes(it.tableName)))
    //     console.log(">> onOptionSelected", dbSchema, newOptions);
    // },[setDisplayedSchema,dbSchema]);

    return   (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schema Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
            <FancyMultiSelect options={allTableNames}></FancyMultiSelect>
            <div className="flex h-[500px] w-[100%]">
                <DbSchemaViewer dbSchema={displayedSchema} ></DbSchemaViewer>
            </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}