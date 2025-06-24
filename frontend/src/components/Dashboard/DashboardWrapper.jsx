import React from 'react';
import InventoryTable from './InventoryTable';
import AdminDashboard from './AdminDashboard';
import ITDashboard from './ITDashboard'; // 👈 NEU

export default function DashboardWrapper({ role }) {
  switch (role) {
    case 'mitarbeiter':
      return <InventoryTable />;
    case 'admin':
      return <AdminDashboard />;
    case 'it':
      return <ITDashboard />; // 👈 IT Dashboard hier
    default:
      return <p>Keine Berechtigung</p>;
  }
}

