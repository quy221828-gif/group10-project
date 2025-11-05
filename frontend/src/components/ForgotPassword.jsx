import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://192.168.38.34:3000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi server");
    }
  };

  return (
    <div className="card">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Gửi email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
