import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Kiểm tra rỗng
    if (!name.trim()) {
      alert("⚠️ Name không được để trống");
      return;
    }

    // ✅ Kiểm tra email hợp lệ
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("⚠️ Email không hợp lệ");
      return;
    }

    try {
      await axios.post("http://172.21.14.105:3000/users", { name, email });
      alert("✅ Thêm user thành công!");
      setName("");
      setEmail("");
      onUserAdded(); // gọi lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      alert("❌ Không thể thêm user, kiểm tra lại server hoặc API!");
    }
  };

  return (
    <div>
      <h3>Thêm User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;
