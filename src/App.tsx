import { SQLMiniEditorCard } from "@/components/sql-mini-editor-card";
import { QueryResultsCard } from "@/components/query-results-card";
import { QueryHistoryCard } from "@/components/query-history-card";



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
        <SQLMiniEditorCard allowedTables={allowedTables} tableColumns={tableColumns}/>
        <QueryHistoryCard/>
      </div>
        <QueryResultsCard />
    </div>
  );
}

export default App
