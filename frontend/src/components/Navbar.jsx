import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? 'bg-blue-200 font-bold' : ''
    }`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50 mb-6">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-800">AgentDock</span>
        <div className="space-x-4">
          <Link to="/" className={linkClass('/')}>Dashboard</Link>
          <Link to="/agents" className={linkClass('/agents')}>Manage Agents</Link>
          <Link to="/tools" className={linkClass('/tools')}>Tools</Link>
          <Link to="/logs" className={linkClass('/logs')}>Logs</Link>
        </div>
      </div>
    </nav>
  );
}
