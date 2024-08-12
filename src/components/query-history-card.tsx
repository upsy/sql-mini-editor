import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function QueryHistoryCard(){
    return (
        <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Saved History</CardTitle>
        </CardHeader>
        <CardContent>
            The wild history items here...
        </CardContent>
        <CardFooter>
          No actions
        </CardFooter>
      </Card>
    );
}