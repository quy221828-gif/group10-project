import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../services/authService";

export default function UserList({ token: tokenProp }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = tokenProp || localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://192.168.38.34:3000/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await axios.delete(`http://192.168.38.34:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Xóa user thất bại!");
    }
  };

  useEffect(() => { fetchUsers(); }, [token]);

  if (loading) return <p>Đang tải danh sách người dùng...</p>;

  return (
    <div className="card">
      <h2>Danh sách người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.avatar ? <img src={u.avatar} alt="Avatar" style={{ width: 50, borderRadius: "50%" }} /> : "-"}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn red" onClick={() => handleDelete(u._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
