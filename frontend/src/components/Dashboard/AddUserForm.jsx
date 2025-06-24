import React, { useState } from "react";

export default function AddUserForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "mitarbeiter",
  });

  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.role) {
      setMessage("Alle Felder müssen ausgefüllt sein.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Fehler ${res.status}: ${errText}`);
      }

      setForm({ username: "", password: "", role: "mitarbeiter" });
      setMessage("Benutzer erfolgreich erstellt ✅");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3>Benutzer hinzufügen</h3>
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="mitarbeiter">Mitarbeiter</option>
          <option value="admin">Admin</option>
          <option value="it">IT</option>
        </select>

        <button type="submit" style={styles.submit}>
          ➕ Benutzer erstellen
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submit: {
    padding: "10px",
    background: "#08f",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    color: "#d00",
    fontWeight: "bold",
  },
};

