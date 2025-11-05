import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });

    if (result.token) {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setMessage("Đăng nhập thành công!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setMessage(result.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="card">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
      </p>
    </div>
  );
}
