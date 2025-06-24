import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import BenutzerListe from "./BenutzerListe"; // <- hier importieren
import AddUserForm from "./AddUserForm";

export default function AdminDashboard() {
  const [tab, setTab] = useState("list");
  const role = "admin"; // später aus JWT holen

  return (
    <>
      <Navbar currentTab={tab} setTab={setTab} role={role} />
      <div style={{ padding: "1rem" }}>
        {tab === "list" && <BenutzerListe />}
        {tab === "add" && <AddUserForm />}
      </div>
    </>
  );
}

