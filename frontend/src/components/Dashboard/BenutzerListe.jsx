import React, { useEffect, useState } from "react";

export default function BenutzerListe() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({ username: "", role: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Benutzerdaten");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, [token]);

  const startEdit = (user) => {
    setEditUserId(user.id);
    setEditData({ username: user.username, role: user.role });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditData({ username: "", role: "" });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/users/${editUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Fehler beim Aktualisieren");
      const updatedUser = await res.json();
      setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Fehler beim Speichern");
    }
  };

  return (
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
        {users.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              Keine Benutzer gefunden
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUserId === user.id ? (
                  <input
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <select
                    value={editData.role}
                    onChange={(e) =>
                      setEditData({ ...editData, role: e.target.value })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="mitarbeiter">Mitarbeiter</option>
                    <option value="it">IT</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <>
                    <button onClick={saveEdit}>Speichern</button>
                    <button onClick={cancelEdit}>Abbrechen</button>
                  </>
                ) : (
                  <button onClick={() => startEdit(user)}>Bearbeiten</button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

