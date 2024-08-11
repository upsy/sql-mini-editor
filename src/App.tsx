import SQLMiniEditor from "./components/sql-mini-editor";

function App() {

  const allowedTables = ['users', 'orders', 'products'];
  const tableColumns = {
    users: ['id', 'name', 'email'],
    orders: ['id', 'user_id', 'total'],
    products: ['id', 'name', 'price']
  };

  return (
    <div className="App">
      <h1>SQL Editor</h1>
      <SQLMiniEditor allowedTables={allowedTables} tableColumns={tableColumns} />
    </div>
  );
}

export default App
