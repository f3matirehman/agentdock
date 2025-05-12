import React, { useState } from 'react';
import api from '../utils/api'

export default function AgentForm({ onRegister }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState('{}');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        description,
        config: JSON.parse(config)
      };
      const res = await api.post('/agents/', payload);
      onRegister?.(res.data);
      setName('');
      setDescription('');
      setConfig('{}');
    } catch (err) {
      console.error('Failed to register agent:', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Agent Name" value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded"
        required />
      
      <textarea placeholder="Description" value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded"
        rows="2"
        required />
      
      <textarea placeholder='Config (JSON)' value={config}
        onChange={(e) => setConfig(e.target.value)}
        className="w-full p-3 border rounded font-mono"
        rows="4"
        required />
      
      <button type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}>
        {loading ? 'Registering...' : 'Register Agent'}
      </button>
    </form>
  );
}
