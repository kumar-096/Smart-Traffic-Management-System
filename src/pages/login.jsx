import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Demo credentials for traffic authority
    if (
      (username === "auth001" && password === "Authority@2025") ||
      (username === "admin001" && password === "Admin@2025")
    ) {
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card animate-fadeIn">
        <h1 className="title">
          🚦 Smart Traffic Management System
        </h1>

        <form onSubmit={handleLogin} className="form">
          <input
            type="text"
            placeholder="👤 Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="🔑 Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

