import React, { useEffect, useState } from 'react';

// Mockdaten, bis du echte API-Integration willst
const mockUsers = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'maria', role: 'mitarbeiter' },
  { id: 3, username: 'max', role: 'it' },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: API-Call für echte Daten
    setUsers(mockUsers);
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Diesen Benutzer wirklich löschen?');
    if (!confirmed) return;

    // TODO: API-Aufruf zum Löschen
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

