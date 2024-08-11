import SQLMiniEditor from "./components/sql-mini-editor";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card";

function App() {

  const allowedTables = ['users', 'orders', 'products'];
  const tableColumns = {
    users: ['id', 'name', 'email'],
    orders: ['id', 'user_id', 'total'],
    products: ['id', 'name', 'price']
  };

  return (
    <div className="flex p-2 w-full flex-col">
      <div className="flex flex-row gap-2 w-full">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>SQL Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <SQLMiniEditor allowedTables={allowedTables} tableColumns={tableColumns} />
        </CardContent>
        <CardFooter>
          <Button>Run Query</Button>
        </CardFooter>
      </Card>
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Saved History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <SQLMiniEditor allowedTables={allowedTables} tableColumns={tableColumns} /> */}
        </CardContent>
        <CardFooter>
          {/* <Button>Run Query</Button> */}
        </CardFooter>
      </Card>
      </div>
      <Card className="w-full mt-2">
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <SQLMiniEditor allowedTables={allowedTables} tableColumns={tableColumns} /> */}
        </CardContent>
        <CardFooter>
          <Button variant={"secondary"}>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App
