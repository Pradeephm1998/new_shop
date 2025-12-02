import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("demo@smartshop.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email.trim(), password.trim());
    if (!res.ok) {
      setError(res.message || "Login failed");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <h2 className="auth-title">Sign in to SmartShop</h2>
          <p className="auth-sub">
            Use the demo credentials or any email/password (dummy only).
          </p>

          <div className="auth-demo">
            <div>
              Demo email: <b>demo@smartshop.com</b>
            </div>
            <div>
              Password: <b>password123</b>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="auth-label" style={{ marginTop: 8 }}>
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: 12 }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
