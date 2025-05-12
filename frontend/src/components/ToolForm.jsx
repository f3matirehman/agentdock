import React, { useState } from 'react';
import api from '../utils/api';

export default function ToolForm({ onRegister }) {
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState('{}');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        endpoint,
        description,
        config: JSON.parse(config)
      };
      const res = await api.post('/tools/register', payload);
      onRegister?.(res.data);
      setName('');
      setEndpoint('');
      setDescription('');
      setConfig('{}');
    } catch (err) {
      console.error('Tool registration failed:', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Tool Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Endpoint URL"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded"
        rows="2"
      />
      <textarea
        placeholder="Config (JSON)"
        value={config}
        onChange={(e) => setConfig(e.target.value)}
        className="w-full p-3 border rounded font-mono"
        rows="4"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register Tool'}
      </button>
    </form>
  );
}
