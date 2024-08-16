import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryHistory } from "@/hooks/useQueryHistory";
import { useDashboardStore } from "@/store/dashboardStore";
import { QueryHistoryItem } from "@/types";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"


export function QueryHistoryCard(){
  

  const setCurrentQuery  = useDashboardStore((state) => state.setCurrentQuery);
  const { data:fetchedHistory, isLoading, error } = useQueryHistory();

  console.log(">> data", fetchedHistory);

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
          {!isLoading && !error && fetchedHistory && (<ul className="max-h-60	overflow-y-scroll">
              {fetchedHistory.map((it, index) => (
                <li key={index} onClick={() => handleQuerySelect(it.query)}>
                 <QueryHistoryDetails queryItem={it}/>
                </li>
              ))}
          </ul>)}
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    );
}


function QueryHistoryDetails( {queryItem}:{queryItem: QueryHistoryItem} ){
  return (
  <div className="flex items-center gap-4 p-4 border-b hover:bg-sky-50">
    <Avatar className="hidden h-9 w-9 sm:flex">
      {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"></AvatarImage> */}
      <AvatarFallback>{queryItem.user_id.toLocaleUpperCase().slice(0,2)}</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none font-mono">
      {queryItem.query}
      </p>
      <p className="text-sm text-muted-foreground">
      {queryItem.user_id}
      </p>
    </div>
    <div className="ml-auto font-medium">{queryItem.created_d}</div>
  </div>)
  
  
  // <div className="p-5 mb-2 border ">
  //   {queryItem.query} / {queryItem.created_d} / {queryItem.user_id}

  // </div>;

}