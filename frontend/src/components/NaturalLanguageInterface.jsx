import React, { useState } from 'react';
import api from '../utils/api';

export default function NaturalLanguageInterface() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    try {
      const res = await api.post('/query/', { prompt: query });
      setResponse(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded mb-3"
        rows="3"
        placeholder="Ask an agent (e.g., 'Summarize latest PR')"
      />
      <button
        onClick={handleAsk}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ask
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
