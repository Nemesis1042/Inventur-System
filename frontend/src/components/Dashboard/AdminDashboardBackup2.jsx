import React, { useEffect, useState } from 'react';
import AddUserForm from "./AddUserForm"; // ✅ du hast das bereits
// ↑ Stelle sicher, dass du das File unter `Dashboard/AddUserForm.jsx` speicherst

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list"); // "list" oder "add"

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Kein Token gefunden. Bitte anmelden.");
      return;
    }

    fetch("http://localhost:8000/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Fehler ${res.status}: ${await res.text()}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Fehler beim Laden der Benutzer"));
  }, [token]);

  const handleDelete = (id) => {
    if (!token) {
      alert("Nicht angemeldet");
      return;
    }

    if (!window.confirm("Diesen Benutzer wirklich löschen?")) return;

    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 204) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        } else {
          alert("Löschen fehlgeschlagen");
        }
      })
      .catch(() => alert("Netzwerkfehler beim Löschen"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // ggf. Route anpassen
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.navbar}>
        <button onClick={() => setView("list")}>👥 Benutzer verwalten</button>
        <button onClick={() => setView("add")}>➕ Benutzer hinzufügen</button>
        <button onClick={handleLogout} style={styles.logout}>🚪 Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {view === "list" && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Benutzername</th>
              <th>Rolle</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username || "?"}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>🗑 Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "add" && <AddUserForm />}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  navbar: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  logout: {
    marginLeft: "auto",
    background: "#f44",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

