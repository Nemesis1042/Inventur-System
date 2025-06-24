import React, { useEffect, useState } from "react";

export default function BenutzerListe() {
  const [users, setUsers] = useState([]);
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

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Benutzername</th>
          <th>Rolle</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              Keine Benutzer gefunden
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

