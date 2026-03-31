'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LivePulse from '../components/LivePulse';
import HomePage from '../components/HomePage';
import SimulateTab from '../components/SimulateTab';
import PredictionResults from '../components/PredictionResults';
import FridayInsights from '../components/FridayInsights';
import AdminDashboard from '../components/AdminDashboard';
import FeedbackTab from '../components/FeedbackTab';
import { SIMULATION_RESULTS } from '../data/predictionModel';

// Built by stargirl | CAA | January 2026

const AUTH_CONFIG = {
  stargirl: { password: 'cultureos2026', role: 'admin', name: 'Stargirl', title: 'Product Lead' },
  dharnajadeja: { password: 'cultureos2026', role: 'admin', name: 'Dharna Jadeja', title: 'Admin' },
  mikej: { password: 'cultureos2026', role: 'user', name: 'Mike J', title: 'Executive' },
  ryannem: { password: 'cultureos2026', role: 'user', name: 'Ryan Nem', title: 'Executive' },
  prandall: { password: 'cultureos2026', role: 'user', name: 'P Randall', title: 'Executive' },
  pauld: { password: 'cultureos2026', role: 'user', name: 'Paul D', title: 'Executive' },
  acurtis: { password: 'cultureos2026', role: 'user', name: 'A Curtis', title: 'Executive' },
  jeffe: { password: 'cultureos2026', role: 'user', name: 'Jeff E', title: 'Executive' },
  jeccleston: { password: 'cultureos2026', role: 'user', name: 'J Eccleston', title: 'Executive' },
  jshulman: { password: 'cultureos2026', role: 'user', name: 'J Shulman', title: 'Executive' },
  lgray: { password: 'cultureos2026', role: 'user', name: 'L Gray', title: 'Executive' },
  lizgray: { password: 'cultureos2026', role: 'user', name: 'Liz Gray', title: 'Executive' },
  lianem: { password: 'cultureos2026', role: 'user', name: 'Liane M', title: 'Executive' },
  drewm: { password: 'cultureos2026', role: 'user', name: 'Drew M', title: 'Executive' },
  dmorris: { password: 'cultureos2026', role: 'user', name: 'D Morris', title: 'Executive' },
  rmiller: { password: 'cultureos2026', role: 'user', name: 'R Miller', title: 'Executive' }
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('livepulse');
  const [selectedPrediction, setSelectedPrediction] = useState(SIMULATION_RESULTS[0]);
  const [simulations, setSimulations] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = AUTH_CONFIG[username.toLowerCase()];
    if (user && user.password === password) {
      setCurrentUser({ username, ...user });
      setIsAuthenticated(true);
      setLoginError('');
      setActiveTab('livepulse');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setActiveTab('livepulse');
  };

  const handleSimulationComplete = (simulationResults) => {
    const newSimulation = { user: currentUser.name, ...simulationResults };
    setSimulations(prev => [newSimulation, ...prev]);
  };

  const handleSubmitFeedback = (feedbackText) => {
    const newFeedback = {
      user: currentUser.name,
      feedback: feedbackText,
      timestamp: new Date().toISOString()
    };
    setFeedback(prev => [newFeedback, ...prev]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-premium flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="card-premium rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-display font-bold text-premium mb-3">CultureOS</h1>
              <p className="text-platinum-400">Cultural Impact Simulation Engine</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-platinum-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-noir-800 border border-platinum-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/20"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-platinum-400 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-noir-800 border border-platinum-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/20"
                  placeholder="Enter password"
                  required
                />
              </div>
              {loginError && (
                <div className="text-status-danger text-sm text-center bg-status-danger/10 py-2 rounded-lg">
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-champagne text-noir-900 font-bold py-4 rounded-xl hover:glow-subtle transition-all"
              >
                Sign In
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'livepulse', label: 'Live Pulse' },
    { id: 'home',      label: 'Home' },
    { id: 'simulate',  label: 'Simulate' },
    { id: 'predict',   label: 'Predict' },
    { id: 'friday',    label: 'Friday Insights' },
    { id: 'feedback',  label: 'Feedback' }
  ];

  if (currentUser.role === 'admin') {
    tabs.push({ id: 'admin', label: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-gradient-premium relative">

      {/* Nav — z-50 keeps it above Live Pulse canvas at z-30 */}
      <div className="border-b border-platinum-800 bg-noir-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-display font-bold text-premium">CultureOS</h1>
              <span className="text-platinum-600 text-sm">|</span>
              <span className="text-platinum-400 text-sm">{currentUser.name}</span>
              <span className={`px-2 py-1 text-xs rounded ${
                currentUser.role === 'admin'
                  ? 'bg-champagne-500/10 text-champagne-500'
                  : 'bg-platinum-500/10 text-platinum-400'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-noir-800 hover:bg-noir-700 text-platinum-300 text-sm rounded-lg transition-all border border-platinum-700"
            >
              Sign Out
            </button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-champagne-500 text-noir-900 glow-subtle'
                    : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Pulse — fullscreen canvas sits behind nav */}
      {activeTab === 'livepulse' && (
        <LivePulse
          currentUser={currentUser}
          onEnter={() => setActiveTab('home')}
        />
      )}

      {/* All other tabs */}
      {activeTab !== 'livepulse' && (
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <HomePage onNavigate={setActiveTab} />
              </motion.div>
            )}

            {activeTab === 'simulate' && (
              <motion.div
                key="simulate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SimulateTab onSimulationComplete={handleSimulationComplete} />
              </motion.div>
            )}

            {activeTab === 'predict' && (
              <motion.div
                key="predict"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="card-premium rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">CultureOS Resonance Engine</div>
                      <h2 className="text-3xl font-display font-bold text-white">Partnership Intelligence</h2>
                      <p className="text-platinum-400 mt-2 max-w-xl leading-relaxed">
                        Agent-based simulations across {SIMULATION_RESULTS.length} prospective deals modeled against {SIMULATION_RESULTS[0].resonanceAgents.toLocaleString()} Resonance Agents spanning demographics, spending behavior, and cultural affinity signals.
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs uppercase tracking-widest text-platinum-500 mb-1">Total Pipeline Value</div>
                      <div className="text-4xl font-display font-bold text-premium">
                        ${(SIMULATION_RESULTS.reduce((s, r) => s + r.partnership.totalCommitment, 0) / 1000000000).toFixed(2)}B
                      </div>
                      <div className="text-xs text-platinum-600 mt-1">rights + activation across all deals</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="glass rounded-xl p-4">
                      <div className="text-xs uppercase tracking-wide text-platinum-500 mb-1">Deals Modeled</div>
                      <div className="text-3xl font-bold text-white">{SIMULATION_RESULTS.length}</div>
                      <div className="text-xs text-platinum-600 mt-1">across leagues and events</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-xs uppercase tracking-wide text-platinum-500 mb-1">Avg Brand Lift</div>
                      <div className="text-3xl font-bold text-champagne-500">
                        +{(SIMULATION_RESULTS.reduce((s, r) => s + r.brandLift, 0) / SIMULATION_RESULTS.length).toFixed(1)}%
                      </div>
                      <div className="text-xs text-platinum-600 mt-1">projected peak across cohort</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-xs uppercase tracking-wide text-platinum-500 mb-1">Avg Impact Score</div>
                      <div className="text-3xl font-bold text-champagne-500">
                        {Math.round(SIMULATION_RESULTS.reduce((s, r) => s + r.partnershipImpact, 0) / SIMULATION_RESULTS.length)}/100
                      </div>
                      <div className="text-xs text-platinum-600 mt-1">partnership resonance composite</div>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-xs uppercase tracking-wide text-platinum-500 mb-1">Total Reach</div>
                      <div className="text-3xl font-bold text-champagne-500">
                        {(SIMULATION_RESULTS.reduce((s, r) => s + r.totalReach, 0) / 1000000).toFixed(0)}M
                      </div>
                      <div className="text-xs text-platinum-600 mt-1">Resonance Agents reached</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {SIMULATION_RESULTS.map((sim) => {
                    const isSelected = selectedPrediction?.id === sim.id;
                    const isEventDeal = sim.partnership.years === null;
                    const formatM = (v) => `$${(v / 1000000).toFixed(0)}M`;

                    return (
                      <motion.div
                        key={sim.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setSelectedPrediction(sim)}
                        className={`relative rounded-2xl p-5 cursor-pointer transition-all overflow-hidden ${
                          isSelected
                            ? 'border-2 border-champagne-500 glow-subtle bg-noir-800'
                            : 'border border-noir-700 hover:border-noir-500 bg-noir-800/60'
                        }`}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                          style={{ backgroundColor: isSelected ? sim.brand.color : `${sim.brand.color}55` }}
                        />
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-champagne-500" />
                        )}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                              style={{ backgroundColor: `${sim.brand.color}22`, color: sim.brand.color }}
                            >
                              {sim.brand.name.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-white font-bold">{sim.brand.name}</span>
                            <span className="text-platinum-600 text-sm">x</span>
                            <span className="text-platinum-400 text-sm">{sim.entity.name}</span>
                          </div>
                          <div className="text-xs text-platinum-600 pl-8">{sim.partnership.type}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="glass rounded-lg p-2.5">
                            <div className="text-xs text-platinum-600 mb-0.5">Rights Fees</div>
                            <div className="text-white font-bold text-sm">{formatM(sim.partnership.totalRightsFees)}</div>
                          </div>
                          <div className="glass rounded-lg p-2.5">
                            <div className="text-xs text-platinum-600 mb-0.5">Activation</div>
                            <div className="font-bold text-sm" style={{ color: sim.brand.color }}>{formatM(sim.partnership.totalActivationAndMedia)}</div>
                          </div>
                        </div>
                        <div className="text-xs text-platinum-600 mb-4">
                          {isEventDeal
                            ? `${sim.partnership.events}-event deal`
                            : `${sim.partnership.years}-year deal`}
                          {' · '}
                          <span className="text-platinum-400">Total commitment {formatM(sim.partnership.totalCommitment)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="text-xs text-platinum-600 mb-1">Brand Lift</div>
                            <div className="h-1 bg-noir-900 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${(sim.brandLift / 8) * 100}%`, backgroundColor: sim.brand.color }}
                              />
                            </div>
                            <div className="text-xs font-bold mt-1" style={{ color: sim.brand.color }}>+{sim.brandLift}%</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-platinum-600 mb-0.5">Impact</div>
                            <div className="text-lg font-bold text-champagne-500">{sim.partnershipImpact}</div>
                            <div className="text-xs text-platinum-600">/100</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <PredictionResults selectedSimulation={selectedPrediction} />
              </motion.div>
            )}

            {activeTab === 'friday' && (
              <motion.div
                key="friday"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FridayInsights />
              </motion.div>
            )}

            {activeTab === 'feedback' && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FeedbackTab currentUser={currentUser.name} onSubmitFeedback={handleSubmitFeedback} />
              </motion.div>
            )}

            {activeTab === 'admin' && currentUser.role === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AdminDashboard simulations={simulations} feedback={feedback} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
