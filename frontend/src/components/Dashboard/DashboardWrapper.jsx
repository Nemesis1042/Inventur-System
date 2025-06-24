// components/Dashboard/DashboardWrapper.jsx
import React from "react";
import AdminDashboard from "./AdminDashboard";
import ITDashboard from "./ITDashboard";
import MitarbeiterDashboard from "./MitarbeiterDashboard";

export default function DashboardWrapper({ role }) {
  switch (role?.toLowerCase()) {
    case "admin":
      return <AdminDashboard />;
    case "it":
      return <ITDashboard />;
    case "mitarbeiter":
      return <MitarbeiterDashboard />;
    default:
      return <p>Unbekannte Rolle: {role}</p>;
  }
}

