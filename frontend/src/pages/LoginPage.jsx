import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { login } from "../services/authService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ HINZUGEFÜGT
  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const { access_token } = await login(username, password);
      localStorage.setItem("token", access_token);
      navigate("/dashboard"); // ✅ Weiterleitung zum Dashboard
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
	<input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{String(error)}</p>}
    </div>
  );
}

