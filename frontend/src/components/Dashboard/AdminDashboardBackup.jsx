import React, { useEffect, useState } from "react";

// Helper-Komponente: User erstellen
function AddUserForm({ onUserAdded }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mitarbeiter");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });
      if (!res.ok) throw new Error("User anlegen fehlgeschlagen");
      const newUser = await res.json();
      onUserAdded(newUser);
      setUsername("");
      setPassword("");
      setRole("mitarbeiter");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        disabled={loading}
      >
        <option value="admin">Admin</option>
        <option value="it">IT</option>
        <option value="mitarbeiter">Mitarbeiter</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Speichern..." : "User anlegen"}
      </button>
    </form>
  );
}

// Helper-Komponente: User editieren (inline)
function EditUserForm({ user, onCancel, onSave }) {
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, role }),
      });
      if (!res.ok) throw new Error("Update fehlgeschlagen");
      const updatedUser = await res.json();
      onSave(updatedUser);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <td>{user.id}</td>
      <td>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </td>
      <td>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
        >
          <option value="admin">Admin</option>
          <option value="it">IT</option>
          <option value="mitarbeiter">Mitarbeiter</option>
        </select>
      </td>
      <td>
        <button onClick={handleSave} disabled={loading}>
          Speichern
        </button>
        <button onClick={onCancel} disabled={loading} style={{ marginLeft: 5 }}>
          Abbrechen
        </button>
      </td>
    </>
  );
}

// Hauptkomponente
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const pageSize = 5;

  // Fetch User Liste mit Suche, Filter & Pagination
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = new URL("http://localhost:8000/users/");
      const params = new URLSearchParams();
      params.append("skip", (page - 1) * pageSize);
      params.append("limit", pageSize);
      if (search) params.append("search", search);
      if (roleFilter) params.append("role", roleFilter);
      url.search = params.toString();

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Fehler ${res.status}`);
      const data = await res.json();
      setUsers(data.users || data); // Je nach API-Response anpassen
      setTotalPages(data.totalPages || 1); // Optional: wenn API Paginierung zurückgibt
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Nicht angemeldet");
      return;
    }
    fetchUsers();
  }, [page, search, roleFilter, token]);

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Diesen Benutzer wirklich löschen?")) return;
    try {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setUsers((u) => u.filter((user) => user.id !== id));
      } else {
        alert("Löschen fehlgeschlagen");
      }
    } catch {
      alert("Netzwerkfehler beim Löschen");
    }
  };

  // Update User nach Edit
  const handleSaveEdit = (updatedUser) => {
    setUsers((u) =>
      u.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditUserId(null);
  };

  // User hinzufügen nach AddUserForm
  const handleUserAdded = (newUser) => {
    // Neu laden oder anfügen - hier einfach neu laden
    fetchUsers();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <AddUserForm onUserAdded={handleUserAdded} />

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Suche Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Alle Rollen</option>
          <option value="admin">Admin</option>
          <option value="it">IT</option>
          <option value="mitarbeiter">Mitarbeiter</option>
        </select>
      </div>

      {loading ? (
        <p>Lade Benutzer...</p>
      ) : (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Benutzername</th>
              <th>Rolle</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4}>Keine Benutzer gefunden</td>
              </tr>
            ) : (
              users.map((user) =>
                editUserId === user.id ? (
                  <tr key={user.id}>
                    <EditUserForm
                      user={user}
                      onCancel={() => setEditUserId(null)}
                      onSave={handleSaveEdit}
                    />
                  </tr>
                ) : (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => setEditUserId(user.id)}>Bearbeiten</button>{" "}
                      <button onClick={() => handleDelete(user.id)}>Löschen</button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 15 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ marginRight: 10 }}
        >
          Vorherige
        </button>
        <span>
          Seite {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page === totalPages}
          style={{ marginLeft: 10 }}
        >
          Nächste
        </button>
      </div>
    </div>
  );
}

