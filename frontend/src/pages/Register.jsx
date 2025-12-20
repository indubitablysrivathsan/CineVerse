

import { useState } from "react";
import { registerUser } from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [displayName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { toke, user } = await registerUser({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      navigate("/");
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <div className="hero">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <h2
          className="heading-serif"
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <p
              className="text-muted"
              style={{ color: "crimson", marginBottom: "16px" }}
            >
              {error}
            </p>
          )}

          <input
            type="displayName"
            placeholder="Username"
            value={displayName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div style={{ height: "16px" }} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ height: "16px" }} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ height: "28px" }} />

          <button type="submit" className="btn-outline" style={{ width: "100%" }}>
            REGISTER
          </button>
        </form>

        <p
          className="text-muted"
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-gold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;