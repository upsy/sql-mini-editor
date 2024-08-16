
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboardStore";

import { QueryResultsTable } from "./query-results-table";
import { DownloadCSVButton } from "./download-csv-button";

export function QueryResultsCard(){
  const queryResults = useDashboardStore((state)=>state.queryResults);
  console.log(">> render QueryResultsCard", queryResults);
  const displayResults = queryResults as  Record<string, string | number >[];;
    return (<Card className="w-full mt-2">
    <CardHeader>
      <CardTitle>Query Results</CardTitle>
    </CardHeader>
    <CardContent>
      {(!displayResults || displayResults.length === 0) && <p>No results to display.</p>}
      {displayResults && displayResults[0] && <QueryResultsTable data={displayResults}></QueryResultsTable>}
    </CardContent>
    <CardFooter>
    <DownloadCSVButton data={displayResults} filename="query_results.csv"></DownloadCSVButton>
    </CardFooter>
  </Card>);
}