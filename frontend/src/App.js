import React from "react";
import UserList from "./components/UserList";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Quản lý User (React + MongoDB)</h1>
      <UserList />
    </div>
  );
}

export default App;
