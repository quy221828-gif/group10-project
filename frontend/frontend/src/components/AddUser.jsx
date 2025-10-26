import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email };

    try {
      await axios.post("http://localhost:3000/users", newUser);
      alert("Thêm người dùng thành công!");
      setName("");
      setEmail("");
      onUserAdded(); // reload danh sách
    } catch (error) {
      console.error("Lỗi thêm user:", error);
      alert("Không thể thêm người dùng.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Thêm người dùng mới</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "8px", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", width: "100%" }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Thêm
      </button>
    </form>
  );
};

export default AddUser;
