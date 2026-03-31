'use client';

// Built by stargirl | CAA | CultureOS | March 2026

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DATA_SOURCES = [
  { name: 'Reddit',      category: 'Social',      description: 'Subreddit sentiment, post velocity, comment analysis across sports and brand communities' },
  { name: 'X / Twitter', category: 'Social',      description: 'Real-time brand mentions, trending topics, athlete and league conversation volume' },
  { name: 'Instagram',   category: 'Social',      description: 'Visual brand association, influencer reach, athlete content performance' },
  { name: 'Facebook',    category: 'Social',      description: 'Demographic engagement patterns, community brand affinity signals' },
  { name: 'Pinterest',   category: 'Social',      description: 'Aspirational brand association, lifestyle and consumer interest mapping' },
  { name: 'Kalshi',      category: 'Prediction',  description: 'Event probability markets — viewership, sponsorship outcomes, cultural moments' },
  { name: 'Polymarket',  category: 'Prediction',  description: 'Decentralized prediction markets on sports events, brand deals, and cultural milestones' },
  { name: 'Spotify',     category: 'Culture',     description: 'Artist popularity, playlist culture, music-brand affinity patterns' },
  { name: 'Netflix',     category: 'Culture',     description: 'Sports documentary engagement, athlete brand lift from content (Drive to Survive model)' },
  { name: 'Apple',       category: 'Culture',     description: 'App Store trends, Apple TV+ sports engagement, device-level consumption signals' },
  { name: 'Amazon',      category: 'Commerce',    description: 'Purchase intent signals, sports product affinity, Prime Video sports viewership' },
  { name: 'News Feeds',  category: 'Media',       description: 'Brand mention velocity in sports media, sentiment tracking across 400+ outlets' },
  { name: 'Demographics',category: 'Data',        description: 'U.S. Census-level demographic modeling, HHI distribution, geographic concentration' },
  { name: 'Ticket Data', category: 'Commerce',    description: 'Live event demand signals, secondary market velocity, market-by-market engagement' }
];

const CATEGORY_COLORS = {
  Social:     '#1DB954',
  Prediction: '#d4c599',
  Culture:    '#8B5CF6',
  Commerce:   '#FF3008',
  Media:      '#00A0FF',
  Data:       '#c2ad7f'
};

const TABS = [
  {
    id: 'simulate',
    label: 'Simulate',
    description: 'Model any brand-property combination against 33,200 Resonance Agents. Input a deal structure and get projected brand lift, consideration lift, reach, and strategic insights — scored against real market benchmarks.',
    stats: ['33,200 agents', 'Tiered property model', 'Live Claude AI insights']
  },
  {
    id: 'predict',
    label: 'Predict',
    description: 'Explore pre-modeled prospective deals across six high-signal partnerships — Chime x NFL, Spotify x NBA, Rivian x FIFA World Cup, and more. Drill into deal structure, impact projections, competitive intelligence, and talent recommendations.',
    stats: ['6 pre-modeled deals', '$838M+ pipeline value', 'Summary / Impact / Competitive / Talent']
  },
  {
    id: 'friday',
    label: 'Friday Insights',
    description: 'Weekly cultural intelligence brief — a timeline of the highest-signal sponsorship and cultural moments from the current week. Sourced from prediction markets, social velocity, and media monitoring.',
    stats: ['Updated weekly', 'Timeline format', 'Signal heat scoring']
  }
];

// Animated counter for the persona count
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString()}</span>;
}

// Sample persona archetypes for the showcase
const PERSONA_ARCHETYPES = [
  { label: 'Gen Z Sports Fan',       demo: '18-24 M', markets: 'NY / LA / ATL', signals: 'High X engagement, NBA primary, Spotify-native, DraftKings user' },
  { label: 'Millennial Parent',       demo: '35-44 F', markets: 'Suburbs nationwide', signals: 'Facebook primary, NFL secondary viewer, brand trust-driven, HHI $90K+' },
  { label: 'Affluent Golf Enthusiast',demo: '45-54 M', markets: 'FL / CA / NC', signals: 'PGA Tour viewer, premium brand affinity, HHI $150K+, low social velocity' },
  { label: 'Multicultural Soccer Fan',demo: '25-34 M/F',markets: 'TX / FL / CA', signals: 'High FIFA engagement, MLS and Liga MX dual-follower, Spanish-language media' },
  { label: 'Emerging Crypto Native',  demo: '22-32 M', markets: 'Urban, coastal', signals: 'Coinbase and Robinhood user, NBA and UFC fan, Reddit-primary, prediction market active' },
  { label: 'Women\'s Sports Advocate',demo: '18-35 F', markets: 'National', signals: 'WNBA and NWSL primary, brand activism sensitivity, high earned media potential' },
  { label: 'Premium Experience Seeker',demo:'40-55 M/F',markets: 'Metro areas', signals: 'F1 and PGA viewer, concert/event attendance high, HHI $200K+, Amex and Chase user' },
  { label: 'Casual Sports Omnivore',  demo: '30-44 M/F',markets: 'National', signals: 'All major sports casual viewer, Super Bowl engaged, streaming-first, DoorDash and delivery-native' }
];

const ENGINE_STEPS = [
  { step: '01', label: 'Signal Ingestion',     description: '14 live data sources feeding real-time cultural, social, and market signals into the model' },
  { step: '02', label: 'Agent Modeling',       description: '33,200 Resonance Agents — each a demographically grounded persona with defined cultural affinities and spending behaviors' },
  { step: '03', label: 'Simulation Engine',    description: 'Agent-based simulation projects how each persona segment responds to a brand-property pairing' },
  { step: '04', label: 'Cultural Scoring',     description: 'Culture Heat Index aggregates buzz, word-of-mouth, impression quality, value, and reputation signals' },
  { step: '05', label: 'Prediction Output',    description: 'Brand lift, consideration lift, geographic reach, and partnership impact score — grounded in real sponsorship economics' }
];

export default function HomePage({ onNavigate }) {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="card-premium rounded-2xl p-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-display font-bold text-premium leading-tight mb-4">
            CultureOS
          </h1>
          <p className="text-xl text-platinum-300 leading-relaxed mb-6">
            An agent-based sponsorship intelligence platform that simulates how brand-property partnerships move through real consumer populations — and forecasts the cultural and commercial return before any deal is signed.
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 glass rounded-full text-sm text-platinum-300 border border-noir-600">Preliminary Demonstration</div>
            <div className="px-4 py-2 glass rounded-full text-sm text-platinum-300 border border-noir-600">March 2026</div>
          </div>
        </div>
      </div>

      {/* Resonance Agent Showcase */}
      <div className="card-premium rounded-2xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">The Engine</div>
            <h2 className="text-3xl font-display font-bold text-white">Resonance Agents</h2>
            <p className="text-platinum-400 mt-2 max-w-xl leading-relaxed">
              Every simulation runs against a population of synthetic consumer personas — each one demographically grounded, culturally situated, and behaviorally modeled from real-world signal data.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs uppercase tracking-widest text-platinum-500 mb-1">Current Population</div>
            <div className="text-5xl font-display font-bold text-premium">
              <AnimatedCounter target={33200} />
            </div>
            <div className="text-platinum-500 text-sm mt-1">Resonance Agents</div>
            <div className="text-platinum-600 text-xs mt-1">Scaling to 320,000+</div>
          </div>
        </div>

        {/* Persona archetypes */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {PERSONA_ARCHETYPES.map((persona, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4 border border-noir-700 hover:border-champagne-500/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-champagne flex items-center justify-center text-noir-900 font-bold text-xs flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-xs text-platinum-600">{persona.demo}</div>
              </div>
              <div className="text-white text-sm font-medium mb-1 leading-tight">{persona.label}</div>
              <div className="text-platinum-600 text-xs mb-2">{persona.markets}</div>
              <div className="text-platinum-500 text-xs leading-relaxed">{persona.signals}</div>
            </motion.div>
          ))}
        </div>

        {/* Agent population breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-2">Demographics Modeled</div>
            <div className="text-2xl font-bold text-white">7 Age Cohorts</div>
            <div className="text-xs text-platinum-600 mt-1">13-17 through 65+ with HHI distribution</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-2">Geographic Coverage</div>
            <div className="text-2xl font-bold text-white">50 States</div>
            <div className="text-xs text-platinum-600 mt-1">Metro, suburban, and rural market weighting</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-2">Cultural Affinity Axes</div>
            <div className="text-2xl font-bold text-white">14 Signals</div>
            <div className="text-xs text-platinum-600 mt-1">Social, prediction, culture, commerce, media</div>
          </div>
        </div>
      </div>

      {/* How the engine works */}
      <div className="card-premium rounded-2xl p-8">
        <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">Methodology</div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">How It Works</h2>
        <p className="text-platinum-400 mb-8 leading-relaxed">
          CultureOS combines real-time signal aggregation with agent-based consumer simulation. The model translates raw cultural data into projected commercial outcomes — brand lift, consideration shift, geographic reach — grounded in actual sponsorship economics.
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-champagne-500/40 via-champagne-500/20 to-transparent hidden md:block" />

          <div className="space-y-4">
            {ENGINE_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 items-start">
                <div className="w-16 h-16 rounded-xl bg-gradient-champagne flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-noir-900 font-bold font-display">{step.step}</span>
                </div>
                <div className="flex-1 glass rounded-xl p-5 border border-noir-700">
                  <div className="text-white font-bold mb-1">{step.label}</div>
                  <p className="text-platinum-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data sources */}
      <div className="card-premium rounded-2xl p-8">
        <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">Signal Infrastructure</div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Data Sources</h2>
        <p className="text-platinum-400 mb-6 leading-relaxed">
          Resonance Agents are continuously updated by signals from 14 integrated data sources spanning social listening, prediction markets, cultural platforms, and commercial behavior.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {DATA_SOURCES.map((source, i) => {
            const color = CATEGORY_COLORS[source.category] || '#d4c599';
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="glass rounded-xl p-4 border border-noir-700 hover:border-platinum-700 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-white font-bold">{source.name}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                    style={{ color, backgroundColor: `${color}18` }}>
                    {source.category}
                  </span>
                </div>
                <p className="text-platinum-500 text-xs leading-relaxed">{source.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tab navigation cards */}
      <div className="card-premium rounded-2xl p-8">
        <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">Platform</div>
        <h2 className="text-3xl font-display font-bold text-white mb-6">Navigate CultureOS</h2>
        <div className="grid grid-cols-3 gap-4">
          {TABS.map((tab, i) => (
            <motion.div key={tab.id} whileHover={{ y: -2 }} onClick={() => onNavigate(tab.id)}
              className="glass rounded-2xl p-6 border border-noir-700 hover:border-champagne-500/30 cursor-pointer transition-all group">
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-champagne-500 mb-1">0{i + 1}</div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-champagne-400 transition-colors">{tab.label}</h3>
              </div>
              <p className="text-platinum-400 text-sm leading-relaxed mb-4">{tab.description}</p>
              <div className="space-y-1.5">
                {tab.stats.map(stat => (
                  <div key={stat} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-champagne-500 flex-shrink-0" />
                    <span className="text-xs text-platinum-500">{stat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-xs text-champagne-500 font-medium group-hover:underline">Open {tab.label} →</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vision note */}
      <div className="glass rounded-2xl p-6 border border-champagne-500/20 text-center">
        <p className="text-platinum-400 text-sm leading-relaxed max-w-2xl mx-auto">
          CultureOS is a preliminary demonstration. The current Resonance Agent population of 33,200 is designed to scale to 320,000+ as proprietary data, granular demographic segmentation, and self-improving model architecture are integrated in subsequent phases.
        </p>
      </div>

    </div>
  );
}
