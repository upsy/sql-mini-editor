import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {FileDown} from 'lucide-react';

export function QueryResultsCard(){
    return (<Card className="w-full mt-2">
    <CardHeader>
      <CardTitle>Query Results</CardTitle>
    </CardHeader>
    <CardContent>
      {/* <SQLMiniEditor allowedTables={allowedTables} tableColumns={tableColumns} /> */}
    </CardContent>
    <CardFooter>
      <Button variant={"secondary"}><FileDown className="w-4 h-4 mr-2"></FileDown>Download CSV</Button>
    </CardFooter>
  </Card>);
}