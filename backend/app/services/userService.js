// services/userService.js
const API = "http://localhost:8000/users";
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function fetchUsers() {
  const res = await fetch(API, { headers });
  if (!res.ok) throw new Error("Fehler beim Laden der Benutzer");
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Fehler beim Löschen des Benutzers");
}

