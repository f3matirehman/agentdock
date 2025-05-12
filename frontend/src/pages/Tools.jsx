import React, { useState } from 'react';
import ToolForm from '../components/ToolForm';
import ToolList from '../components/ToolList';

export default function Tools() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRegister = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="container mx-auto px-6 py-8">
      <section className="mb-10 bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Register a New Tool</h2>
        <ToolForm onRegister={handleRegister} />
      </section>

      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Registered Tools</h2>
        {/* Force ToolList to re-render after tool is registered */}
        <ToolList key={refreshKey} />
      </section>
    </div>
  );
}
