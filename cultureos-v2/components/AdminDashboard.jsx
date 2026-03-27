'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard({ simulations, feedback }) {
  const [activeView, setActiveView] = useState('simulations');
  const [filterUser, setFilterUser] = useState('all');

  const uniqueUsers = ['all', ...new Set(simulations.map(s => s.user))];

  const filteredSimulations = filterUser === 'all' 
    ? simulations 
    : simulations.filter(s => s.user === filterUser);

  return (
    <div className="space-y-6">
      <div className="card-premium rounded-2xl p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-4">Admin Dashboard</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveView('simulations')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeView === 'simulations'
                ? 'bg-champagne-500 text-noir-900'
                : 'bg-noir-800 text-platinum-400 hover:bg-noir-700'
            }`}
          >
            Simulation Activity ({simulations.length})
          </button>
          <button
            onClick={() => setActiveView('feedback')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeView === 'feedback'
                ? 'bg-champagne-500 text-noir-900'
                : 'bg-noir-800 text-platinum-400 hover:bg-noir-700'
            }`}
          >
            User Feedback ({feedback.length})
          </button>
        </div>
      </div>

      {activeView === 'simulations' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="card-premium rounded-xl p-4">
            <label className="block text-sm font-medium text-platinum-400 mb-2">Filter by User</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full md:w-64 bg-noir-800 border border-platinum-700 rounded-lg px-4 py-2 text-white"
            >
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user === 'all' ? 'All Users' : user}</option>
              ))}
            </select>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-platinum-700">
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">User</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Brand</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Entity</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Type</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Budget</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Brand Lift</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Impact</th>
                    <th className="text-left py-3 px-4 text-platinum-400 text-sm">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSimulations.map((sim, index) => (
                    <tr key={index} className="border-b border-platinum-800 hover:bg-noir-800">
                      <td className="py-3 px-4 text-white font-medium">{sim.user}</td>
                      <td className="py-3 px-4 text-platinum-300">{sim.parameters.brand}</td>
                      <td className="py-3 px-4 text-platinum-300">{sim.parameters.entity}</td>
                      <td className="py-3 px-4 text-platinum-400 text-sm">{sim.parameters.partnershipType}</td>
                      <td className="py-3 px-4 text-champagne-500">${(sim.parameters.budget / 1000000).toFixed(1)}M</td>
                      <td className="py-3 px-4 text-status-success">+{sim.brandLift}%</td>
                      <td className="py-3 px-4 text-champagne-500 font-bold">{sim.partnershipImpact}/100</td>
                      <td className="py-3 px-4 text-platinum-600 text-sm">{new Date(sim.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSimulations.length === 0 && (
                <div className="text-center py-12 text-platinum-500">
                  No simulations recorded yet
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'feedback' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {feedback.length === 0 ? (
            <div className="card-premium rounded-2xl p-12 text-center">
              <p className="text-platinum-500">No feedback submitted yet</p>
            </div>
          ) : (
            feedback.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-premium rounded-xl p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-champagne-500 font-bold">{item.user}</span>
                    <span className="text-platinum-600 text-sm ml-3">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-platinum-300 leading-relaxed">{item.feedback}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
