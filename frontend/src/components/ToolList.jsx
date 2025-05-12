import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ToolList() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api.get('/tools/list')
      .then(res => setTools(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <div key={tool.id} className="p-4 border rounded bg-white shadow-sm">
          <h3 className="font-bold text-lg">{tool.name}</h3>
          <p className="text-sm">{tool.description}</p>
          <p className="text-xs text-gray-600 mt-1"><strong>Endpoint:</strong> {tool.endpoint}</p>
          <pre className="bg-gray-100 text-sm p-2 mt-2 rounded overflow-x-auto">
            {JSON.stringify(tool.config, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
