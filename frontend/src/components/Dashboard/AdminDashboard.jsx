import React, { useState } from "react";
import Navbar from "./Navbar";
import BenutzerListe from "./BenutzerListe";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm"; // Neuer Import
import InventoryTable from "./InventoryTable";
 

  const token = localStorage.getItem("token");
export default function AdminDashboard() {
  const [tab, setTab] = useState("list");
  const [editingUser, setEditingUser] = useState(null); // Zum Speichern des aktuellen Users, der bearbeitet wird
  const role = "admin"; // später aus JWT

  // Callback für Benutzer zum Bearbeiten
  const handleEditClick = (user) => {
    setEditingUser(user);
    setTab("edit");
  };

  // Callback nach Bearbeitung zurück zur Liste
  const handleEditComplete = () => {
    setEditingUser(null);
    setTab("list");
  };

  return (
    <>
      <Navbar currentTab={tab} setTab={setTab} role={role} />
      <div style={{ padding: "1rem" }}>
        {tab === "list" && <BenutzerListe onEditClick={handleEditClick} />}
        {tab === "add" && <AddUserForm />}
        {tab === "edit" && (
          <EditUserForm user={editingUser} onComplete={handleEditComplete} />
        )}
	{tab === "produkte" && <InventoryTable token={token} />}
      </div>
    </>
  );
}

