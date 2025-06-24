import React, { useEffect, useState } from 'react';
import DashboardWrapper from '../components/Dashboard/DashboardWrapper';
import { getUserFromToken } from '../services/authService';

const Dashboard = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = getUserFromToken();
    if (user) setRole(user.role);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {role ? <DashboardWrapper role={role} /> : <p>Lade Benutzerrolle...</p>}
    </div>
  );
};

export default Dashboard;

