import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboardStore";
import {FileDown} from 'lucide-react';

export function QueryResultsCard(){
  const queryResults = useDashboardStore((state)=>state.queryResults);
  console.log(">> render QueryResultsCard", queryResults);
  const displayResults = queryResults as Array<object>;
    return (<Card className="w-full mt-2">
    <CardHeader>
      <CardTitle>Query Results</CardTitle>
    </CardHeader>
    <CardContent>
      { JSON.stringify(displayResults) }
    </CardContent>
    <CardFooter>
      <Button variant={"secondary"}><FileDown className="w-4 h-4 mr-2"></FileDown>Download CSV</Button>
    </CardFooter>
  </Card>);
}