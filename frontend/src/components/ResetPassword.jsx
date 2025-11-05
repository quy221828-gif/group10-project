import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://192.168.38.34:3000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi server");
    }
  };

  return (
    <div className="card">
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Mật khẩu mới" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Cập nhật</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
