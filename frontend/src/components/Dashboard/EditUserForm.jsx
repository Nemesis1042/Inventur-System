import React, { useState } from "react";

export default function EditUserForm({ user, onComplete }) {
  const [username, setUsername] = useState(user?.username || "");
  const [role, setRole] = useState(user?.role || "mitarbeiter");
  const [password, setPassword] = useState(""); // Optional zum Ändern

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role, ...(password && { password }) }),
      });
      if (!res.ok) throw new Error("Update fehlgeschlagen");
      onComplete();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Benutzer bearbeiten</h3>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Rolle:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="mitarbeiter">Mitarbeiter</option>
          <option value="it">IT</option>
        </select>
      </label>
      <label>
        Neues Passwort (optional):
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leerlassen wenn unverändert"
        />
      </label>
      <button type="submit">Speichern</button>
      <button type="button" onClick={onComplete} style={{ marginLeft: "1rem" }}>
        Abbrechen
      </button>
    </form>
  );
}

