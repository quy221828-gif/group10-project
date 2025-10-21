import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.length === 0 ? (
          <p>Chưa có người dùng nào</p>
        ) : (
          users.map((u, index) => <li key={index}>{u.name}</li>)
        )}
      </ul>
    </div>
  );
};

export default UserList;
