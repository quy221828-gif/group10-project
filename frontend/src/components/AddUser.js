import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu tới backend Node.js
      await axios.post("http://localhost:5000/api/users", { name, email });

      // Reset input
      setName("");
      setEmail("");

      // Thông báo App re-render UserList
      onUserAdded();
    } catch (err) {
      console.error("Lỗi thêm user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;
