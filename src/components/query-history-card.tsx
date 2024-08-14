import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryHistory } from "@/hooks/useQueryHistory";
import { useRunQuery } from "@/hooks/useRunQuery";
import { useDashboardStore } from "@/store/dashboardStore";
import React from "react";

export function QueryHistoryCard(){
  debugger;

  const { queryHistory, setCurrentQuery, setQueryHistory } = useDashboardStore();
  const { mutate: runQuery } = useRunQuery();
  const { data:fetchedHistory, isLoading, error } = useQueryHistory();

  console.log(">> data", fetchedHistory);

  React.useEffect(() => {
    debugger;
    if (fetchedHistory) {
      setQueryHistory(fetchedHistory?.results);
    }
  }, [fetchedHistory]);

  const handleQuerySelect = (query: string) => {
    setCurrentQuery(query);  // Update current query in store
    // runQuery(query);  // Run the selected query
  };


    return (
        <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Saved History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div>Loading query history...</div>}
          {error && <div>Error loading query history: {error.message}</div>}
          {!isLoading && !error && (<ul>
              {queryHistory.map((it, index) => (
                <li key={index} onClick={() => handleQuerySelect(it.query)}>
                  {it.query}
                </li>
              ))}
          </ul>)}
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    );
}