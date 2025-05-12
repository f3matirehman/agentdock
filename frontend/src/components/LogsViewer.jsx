import React, { useEffect, useState } from 'react';
import api from '../utils/api';


export default function LogsViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/logs/')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-2">
      {logs.map((log, index) => (
        <div key={index} className="bg-gray-50 p-2 border-l-4 border-blue-500">
          <code className="text-sm">{log.message}</code>
        </div>
      ))}
    </div>
  );
}
