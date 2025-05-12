import React from 'react';
import AgentForm from '../components/AgentForm';
import AgentList from '../components/AgentList';
import LogsViewer from '../components/LogsViewer';
import NaturalLanguageInterface from '../components/NaturalLanguageInterface';

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      <section className="mb-10 bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Register New Agent</h2>
        <AgentForm />
      </section>

      <section className="mb-10 bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Registered Agents</h2>
        <AgentList />
      </section>

      <section className="mb-10 bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Natural Language Interface</h2>
        <NaturalLanguageInterface />
      </section>

      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Logs</h2>
        <LogsViewer />
      </section>
    </div>
  );
}
