import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  const [reload, setReload] = useState(false);

  const refreshList = () => {
    setReload(!reload); // Đảo trạng thái để reload danh sách user
  };

  return (
    <div className="App" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Quản lý người dùng</h1>
      <AddUser onUserAdded={refreshList} />
      <hr />
      <UserList key={reload} />
    </div>
  );
}

export default App;
