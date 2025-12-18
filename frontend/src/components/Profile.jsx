import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, logout } from "../services/authService";

export default function Profile({ token }) {
  const [user, setUser] = useState({ email: "", avatar: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Tải thông tin người dùng
  const fetchProfile = async () => {
    try {
      const data = await getProfile(token);
      if (data.email) {
        setUser(data);
      } else {
        setMessage("Không thể tải thông tin người dùng!");
      }
    } catch (err) {
      console.error("Lỗi khi lấy profile:", err);
      setMessage("Lỗi khi tải thông tin người dùng!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  // ✅ Cập nhật thông tin (mật khẩu, avatar)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(token, { password, avatar: user.avatar });
      setMessage(res.message || "Đã cập nhật!");
      setPassword("");
      fetchProfile(); // Tải lại thông tin sau khi cập nhật
    } catch (err) {
      setMessage(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  // ✅ Đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Hàm xử lý refresh avatar (tránh cache)
  const avatarSrc = user.avatar
    ? `${user.avatar}?t=${Date.now()}`
    : "https://via.placeholder.com/100x100.png?text=No+Avatar";

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>👤 Hồ sơ cá nhân</h2>

      {/* ✅ Hiển thị avatar (có cache buster) */}
      <img
        src={avatarSrc}
        alt="Avatar"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 10,
          border: "2px solid #ccc",
        }}
      />

      <form onSubmit={handleUpdate} style={{ marginTop: 15 }}>
        <input
          type="email"
          value={user.email}
          readOnly
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            marginBottom: 10,
          }}
        />
        <input
          type="password"
          placeholder="Đổi mật khẩu (nếu muốn)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            marginBottom: 10,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            border: "none",
            borderRadius: 8,
            backgroundColor: "#2196F3",
            color: "white",
            cursor: "pointer",
          }}
        >
          Cập nhật
        </button>
      </form>

      {/* Nút upload avatar */}
      <button
        style={{
          width: "100%",
          padding: 10,
          border: "none",
          borderRadius: 8,
          marginTop: 10,
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/upload-avatar")}
      >
        Upload Avatar
      </button>

      {/* Nút đăng xuất */}
      <button
        style={{
          width: "100%",
          padding: 10,
          border: "none",
          borderRadius: 8,
          marginTop: 10,
          backgroundColor: "#f44336",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Đăng xuất
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
