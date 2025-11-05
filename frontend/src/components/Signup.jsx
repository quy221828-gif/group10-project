import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup({ name, email, password });

    if (result.token) {
      setMessage("Đăng ký thành công! Quay lại đăng nhập...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(result.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="card">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
