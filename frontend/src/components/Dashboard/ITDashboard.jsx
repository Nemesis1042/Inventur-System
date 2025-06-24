import React, { useEffect, useState } from 'react';

export default function ITDashboard() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('OK');

  useEffect(() => {
    // TODO: Backend-API call ersetzen
    setLogs([
      { timestamp: '2025-06-24 12:00', message: 'Server gestartet' },
      { timestamp: '2025-06-24 12:05', message: 'User-Login erfolgreich: admin' },
    ]);
  }, []);

  return (
    <div>
      <h2>IT Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <strong>Systemstatus:</strong> <span style={{ color: status === 'OK' ? 'green' : 'red' }}>{status}</span>
      </div>

      <h3>Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Zeitpunkt</th>
            <th>Meldung</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

