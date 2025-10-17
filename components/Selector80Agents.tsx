import React from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
}

const agents: Agent[] = [
  { id: 'agent1', name: 'Agent Diagnostic Express', description: 'Audit SEO/UX complet et rapport PDF' },
  { id: 'agent2', name: 'Agent Devis Automatique', description: 'Génère des devis et propositions commerciales' },
  { id: 'agent3', name: 'Inbox AI', description: 'Centralise et résume vos messages entrants' },
  // ... ajoutez ici plus d'agents selon vos besoins
];

const Selector80Agents: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {agents.map((agent) => (
        <div key={agent.id} className="rounded-2xl shadow p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
            <p className="text-base mb-4">{agent.description}</p>
          </div>
          <button className="border rounded-xl px-4 py-2 self-start">Lancer</button>
        </div>
      ))}
    </div>
  );
};

export default Selector80Agents;
