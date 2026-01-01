import { useState } from "react";
import { registerUser } from "../lib/api";

function Register() {
  const [email, setEmail] = useState("");
  const [displayName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { token } = await registerUser({ email, password, displayName });
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (err) {
    setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;