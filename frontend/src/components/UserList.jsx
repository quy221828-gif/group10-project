import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Lấy dữ liệu khi load trang
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://172.21.14.105:3000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi tải user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await axios.delete(`http://172.21.14.105:3000/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
    }
  };

  // ✅ Chỉnh sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  // ✅ Cập nhật user
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Tên không được để trống");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ");
      return;
    }

    try {
      await axios.put(`http://172.21.14.105:3000/users/${editingUser._id}`, {
        name,
        email,
      });
      alert("✅ Cập nhật user thành công!");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  return (
    <div>
      <AddUser onUserAdded={fetchUsers} />
      <h3>Danh sách User</h3>

      {editingUser && (
        <form onSubmit={handleUpdate}>
          <h4>Sửa User</h4>
          <input
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Lưu</button>
          <button type="button" onClick={() => setEditingUser(null)}>
            Hủy
          </button>
        </form>
      )}

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>✏️ Sửa</button>
            <button onClick={() => handleDelete(user._id)}>🗑️ Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
