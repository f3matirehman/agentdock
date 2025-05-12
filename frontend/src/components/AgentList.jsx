import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get('/agents/')
      .then(res => setAgents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.id} className="p-4 border rounded shadow-sm bg-white">
          <h3 className="font-bold">{agent.name}</h3>
          <p>{agent.description}</p>
          <pre className="bg-gray-100 text-sm p-2 mt-2 rounded overflow-x-auto">
            {JSON.stringify(agent.config, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
