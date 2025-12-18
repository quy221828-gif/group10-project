import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/authService";
import { FaUsers, FaUser, FaSignOutAlt, FaBullseye, FaCloudUploadAlt } from "react-icons/fa";

export default function Dashboard({ token }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile(token);
        if (data.email) setUser(data);
      } catch (err) {
        console.error("Lỗi khi lấy profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <FaBullseye size={40} color="#5e35b1" />
        <h1>Dashboard</h1>
        <p>
          Chào mừng <strong>{user.name || user.email}</strong> đến với hệ thống quản lý người dùng!
        </p>

        {user.avatar && (
          <img
            src={user.avatar}
            alt="Avatar"
            style={{ width: 80, borderRadius: "50%", marginBottom: 10 }}
          />
        )}

        <div className="dashboard-buttons">
          {/* Nút danh sách user chỉ admin */}
          {user.role === "admin" && (
            <button className="btn blue" onClick={() => navigate("/users")}>
              <FaUsers /> Danh sách người dùng
            </button>
          )}

          {/* Nút hồ sơ cá nhân */}
          <button className="btn light-blue" onClick={() => navigate("/profile")}>
            <FaUser /> Hồ sơ cá nhân
          </button>

          {/* Nút Upload Avatar */}
          <button className="btn light-blue" onClick={() => navigate("/upload-avatar")}>
            <FaCloudUploadAlt /> Upload Avatar
          </button>
        </div>

        <button className="btn red" onClick={handleLogout}>
          <FaSignOutAlt /> Đăng xuất
        </button>
      </div>
    </div>
  );
}
