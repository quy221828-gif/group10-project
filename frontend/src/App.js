import React, { useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý người dùng</h1>
      <AddUser onAddUser={handleAddUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
