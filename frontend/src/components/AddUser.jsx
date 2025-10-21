import React, { useState } from "react";

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddUser({ name });
    setName("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tên người dùng"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "5px 10px",
            marginRight: "10px",
            borderRadius: "5px",
          }}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;
