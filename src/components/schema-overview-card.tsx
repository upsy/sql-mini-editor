import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DbSchemaViewer } from "./db-schema-viewer";
import { TableSchema } from "@/types";


export function SchemaOverviewCard({dbSchema}:{dbSchema:TableSchema[]}){
    return   (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schema Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[500px] w-[100%]">
            <DbSchemaViewer dbSchema={dbSchema} ></DbSchemaViewer>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}