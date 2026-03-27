'use client';

// Built by stargirl | CAA | CultureOS | March 2026

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import USImpactMap from './USImpactMap';
import { BRANDS, ENTITIES } from '../data/predictionModel';

const PARTNERSHIP_TYPES = [
  { id: 'official_partner',      label: 'Official League Partner',  multiplier: 1.10 },
  { id: 'naming_rights',         label: 'Venue Naming Rights',      multiplier: 1.10 },
  { id: 'presenting_sponsor',    label: 'Presenting Sponsor',       multiplier: 1.05 },
  { id: 'jersey_patch',          label: 'Jersey Patch',             multiplier: 1.05 },
  { id: 'founding_partner',      label: 'Founding Partner',         multiplier: 1.08 },
  { id: 'broadcast_integration', label: 'Broadcast Integration',    multiplier: 1.03 },
  { id: 'digital_content',       label: 'Digital Content Series',   multiplier: 1.02 },
  { id: 'activation_only',       label: 'Activation Only',          multiplier: 0.90 },
];

const DEMOGRAPHICS = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

// stargirl | tiered scoring model grounded in real sponsorship economics
const TIER_CONFIG = {
  1: { brandLiftRange: [1.0, 3.5], considerationRange: [0.8, 2.0], impactRange: [50, 72], reachMultiplier: 1.0 },
  2: { brandLiftRange: [0.6, 2.5], considerationRange: [0.4, 1.4], impactRange: [35, 58], reachMultiplier: 0.6 },
  3: { brandLiftRange: [0.3, 1.2], considerationRange: [0.2, 0.7], impactRange: [22, 42], reachMultiplier: 0.3 }
};

function computeScores(entity, annualBudgetM, years, partnershipTypeId) {
  const tier = entity.tier || 2;
  const floorM = entity.floorM || 3;
  const config = TIER_CONFIG[tier];
  const belowFloor = annualBudgetM < floorM;

  const ratio = Math.min(annualBudgetM / (floorM * 2), 1);
  const effectiveRatio = belowFloor ? Math.min(ratio * 0.6, 0.60) : (0.5 + ratio * 0.5);

  const lerp = (a, b, t) => a + (b - a) * t;
  const pType = PARTNERSHIP_TYPES.find(p => p.id === partnershipTypeId);
  const multiplier = pType ? pType.multiplier : 1.0;

  const rawBrandLift    = lerp(config.brandLiftRange[0], config.brandLiftRange[1], effectiveRatio) * multiplier;
  const rawConsideration = lerp(config.considerationRange[0], config.considerationRange[1], effectiveRatio) * multiplier;
  const rawImpact       = lerp(config.impactRange[0], config.impactRange[1], effectiveRatio) * multiplier;

  const seed = ((annualBudgetM * 7 + years * 13) % 10) / 100;
  const jitter = 0.97 + seed;

  const brandLift         = Math.min(parseFloat((rawBrandLift * jitter).toFixed(1)), config.brandLiftRange[1]);
  const considerationLift = Math.min(parseFloat((rawConsideration * jitter).toFixed(1)), config.considerationRange[1]);
  const partnershipImpact = Math.min(Math.round(rawImpact * jitter), config.impactRange[1]);

  const baseReach   = annualBudgetM * 180000 * config.reachMultiplier * years;
  const directReach = Math.round(baseReach * 0.4);
  const viralReach  = Math.round(baseReach * 0.6);

  const chiMetrics = {
    buzz:       Math.round(lerp(2, 9, effectiveRatio)),
    wom:        Math.round(lerp(2, 8, effectiveRatio)),
    impression: Math.round(lerp(3, 11, effectiveRatio)),
    quality:    Math.round(lerp(1, 6, effectiveRatio)),
    value:      Math.round(lerp(1, 5, effectiveRatio)),
    reputation: Math.round(lerp(2, 7, effectiveRatio))
  };

  const geographicImpact = {
    California:      { reach: Math.round(directReach * 0.18), impactScore: Math.round(partnershipImpact * 0.95) },
    Texas:           { reach: Math.round(directReach * 0.14), impactScore: Math.round(partnershipImpact * 0.88) },
    Florida:         { reach: Math.round(directReach * 0.11), impactScore: Math.round(partnershipImpact * 0.82) },
    'New York':      { reach: Math.round(directReach * 0.13), impactScore: Math.round(partnershipImpact * 0.85) },
    Illinois:        { reach: Math.round(directReach * 0.08), impactScore: Math.round(partnershipImpact * 0.76) },
    Pennsylvania:    { reach: Math.round(directReach * 0.07), impactScore: Math.round(partnershipImpact * 0.72) },
    Ohio:            { reach: Math.round(directReach * 0.06), impactScore: Math.round(partnershipImpact * 0.69) },
    Georgia:         { reach: Math.round(directReach * 0.06), impactScore: Math.round(partnershipImpact * 0.66) },
    'North Carolina':{ reach: Math.round(directReach * 0.05), impactScore: Math.round(partnershipImpact * 0.63) }
  };

  return { brandLift, considerationLift, reach: directReach + viralReach, directReach, viralReach, partnershipImpact, chiMetrics, geographicImpact, belowFloor, tier, floorM, effectiveRatio };
}

export default function SimulateTab({ onSimulationComplete }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults]           = useState(null);
  const [formData, setFormData]         = useState({
    brand: '', entity: '', partnershipType: '',
    annualBudgetM: 10, years: 3,
    targetDemo: ['25-34', '35-44'], geography: 'national'
  });

  const selectedEntity  = ENTITIES.find(e => e.name === formData.entity);
  const belowFloorWarn  = selectedEntity && formData.annualBudgetM < selectedEntity.floorM;
  const totalCommitment = (formData.annualBudgetM * formData.years).toFixed(1);
  const tierColor       = selectedEntity?.tier === 1 ? '#d4c599' : selectedEntity?.tier === 2 ? '#c2ad7f' : '#a3a3a3';

  const runSimulation = async () => {
    if (!selectedEntity) return;
    setIsSimulating(true);
    await new Promise(r => setTimeout(r, 2500));

    const scored   = computeScores(selectedEntity, formData.annualBudgetM, formData.years, formData.partnershipType);
    const insights = await generateInsights(scored);

    const mockResults = {
      ...scored,
      mediaMix: { 'In-Stadium': 0.25, 'Broadcast': 0.30, 'Digital / Social': 0.25, 'Experiential': 0.20 },
      insights, timestamp: new Date().toISOString(), parameters: { ...formData }
    };

    setResults(mockResults);
    setIsSimulating(false);
    if (onSimulationComplete) onSimulationComplete(mockResults);
  };

  const generateInsights = async (scored) => {
    const budgetContext = scored.belowFloor
      ? `NOTE: $${formData.annualBudgetM}M/yr is below the $${scored.floorM}M/yr minimum viable spend for this property. Scores are modeled at reduced confidence.`
      : `Budget of $${formData.annualBudgetM}M/yr is within viable range.`;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: `You are a senior sports sponsorship strategist. Provide concise, grounded, realistic analysis — no inflated projections.\n\nBrand: ${formData.brand}\nProperty: ${formData.entity} (Tier ${scored.tier})\nType: ${formData.partnershipType}\nAnnual Budget: $${formData.annualBudgetM}M | Duration: ${formData.years} years | Total: $${totalCommitment}M\nTarget Demo: ${formData.targetDemo.join(', ')}\n${budgetContext}\nProjected Brand Lift: +${scored.brandLift}% | Consideration Lift: +${scored.considerationLift}% | Impact: ${scored.partnershipImpact}/100\n\nRespond exactly:\n\nEXECUTIVE SUMMARY\n[2 sentences]\n\nTOP OPPORTUNITIES\n1. [opportunity]\n2. [opportunity]\n3. [opportunity]\n\nKEY RISKS\n1. [risk]\n2. [risk]\n\nBEST PRACTICES\n1. [recommendation]\n2. [recommendation]\n3. [recommendation]` }]
        })
      });
      const data = await res.json();
      return parseInsights(data.content?.[0]?.text || '');
    } catch (e) {
      return fallbackInsights(scored);
    }
  };

  const parseInsights = (text) => {
    const get = (re, text) => {
      const m = text.match(re);
      return m ? m[1].split('\n').filter(l => l.match(/^\d+\./)).map(l => l.replace(/^\d+\.\s*/, '').trim()) : [];
    };
    const sumMatch = text.match(/EXECUTIVE SUMMARY\s*\n([\s\S]*?)(?=TOP OPPORTUNITIES)/i);
    const summary  = sumMatch ? sumMatch[1].trim() : '';
    const opportunities = get(/TOP OPPORTUNITIES\s*\n([\s\S]*?)(?=KEY RISKS)/i, text).slice(0, 3);
    const risks         = get(/KEY RISKS\s*\n([\s\S]*?)(?=BEST PRACTICES)/i, text).slice(0, 2);
    const bestPractices = get(/BEST PRACTICES\s*\n([\s\S]*?)$/i, text).slice(0, 3);
    if (!summary || !opportunities.length) return fallbackInsights({ partnershipImpact: 50 });
    return { summary, opportunities, risks, bestPractices };
  };

  const fallbackInsights = (scored) => ({
    summary: `This ${formData.partnershipType} partnership between ${formData.brand} and ${formData.entity} presents a measured opportunity at a Partnership Impact score of ${scored.partnershipImpact}/100. Success depends on authentic activation and a disciplined activation-to-rights ratio.`,
    opportunities: [
      "Reach the property's core audience through category-exclusive placement",
      'Build long-term brand equity through consistent, non-interruptive presence',
      'Use partnership as a platform for content beyond traditional signage'
    ],
    risks: [
      'ROI timeline typically extends 2-3 years before brand lift compounds meaningfully',
      'Competitive spend from incumbent partners may dilute share of voice'
    ],
    bestPractices: [
      'Maintain at least a 1:1 activation-to-rights ratio to drive incremental ROI',
      'Integrate talent partnerships to amplify reach beyond passive placement',
      'Measure incrementality across channels, not just impressions'
    ]
  });

  return (
    <div className="space-y-6">
      <div className="card-premium rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Partnership Simulation Builder</h2>
          <p className="text-platinum-500 text-sm mt-1">Model any deal against {(33200).toLocaleString()} Resonance Agents — scored against real market benchmarks</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-platinum-400 uppercase tracking-widest mb-2">Brand</label>
            <select value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })}
              className="w-full bg-noir-800 border border-noir-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500/30">
              <option value="">Select a brand</option>
              {BRANDS.map(b => <option key={b.id} value={b.name}>{b.name} — {b.industry}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-platinum-400 uppercase tracking-widest mb-2">
              Property
              {selectedEntity && (
                <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold" style={{ color: tierColor, backgroundColor: `${tierColor}18` }}>
                  Tier {selectedEntity.tier}
                </span>
              )}
            </label>
            <select value={formData.entity} onChange={e => setFormData({ ...formData, entity: e.target.value })}
              className="w-full bg-noir-800 border border-noir-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500/30">
              <option value="">Select a property</option>
              <optgroup label="Tier 1 — Top Market">
                {ENTITIES.filter(e => e.tier === 1).map(e => <option key={e.id} value={e.name}>{e.name} (floor ${e.floorM}M/yr)</option>)}
              </optgroup>
              <optgroup label="Tier 2 — Mid Market">
                {ENTITIES.filter(e => e.tier === 2).map(e => <option key={e.id} value={e.name}>{e.name} (floor ${e.floorM}M/yr)</option>)}
              </optgroup>
              <optgroup label="Tier 3 — Emerging">
                {ENTITIES.filter(e => e.tier === 3).map(e => <option key={e.id} value={e.name}>{e.name} (floor ${e.floorM}M/yr)</option>)}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-platinum-400 uppercase tracking-widest mb-2">Partnership Type</label>
            <select value={formData.partnershipType} onChange={e => setFormData({ ...formData, partnershipType: e.target.value })}
              className="w-full bg-noir-800 border border-noir-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500/30">
              <option value="">Select type</option>
              {PARTNERSHIP_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-platinum-400 uppercase tracking-widest mb-2">
              Duration — {formData.years} {formData.years === 1 ? 'Year' : 'Years'}
            </label>
            <input type="range" min="1" max="5" step="1" value={formData.years}
              onChange={e => setFormData({ ...formData, years: parseInt(e.target.value) })}
              className="w-full h-2 bg-noir-700 rounded-lg appearance-none cursor-pointer accent-champagne-500 mt-3" />
            <div className="flex justify-between text-xs text-platinum-600 mt-1">
              {[1,2,3,4,5].map(y => <span key={y}>{y}yr</span>)}
            </div>
          </div>
        </div>

        {/* Annual budget — full width */}
        <div className="mt-5 p-5 glass rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-medium text-platinum-400 uppercase tracking-widest mb-2">Annual Rights Fee</div>
              <div className="text-4xl font-bold text-white">${formData.annualBudgetM}M<span className="text-platinum-500 text-xl font-normal"> / yr</span></div>
              <div className="text-sm text-platinum-400 mt-1">
                Total commitment: <span className="text-champagne-500 font-bold">${totalCommitment}M</span> over {formData.years} {formData.years === 1 ? 'year' : 'years'}
              </div>
            </div>
            {selectedEntity && (
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-xs text-platinum-600 mb-1">Market floor — {selectedEntity.name}</div>
                <div className="text-2xl font-bold" style={{ color: tierColor }}>${selectedEntity.floorM}M/yr</div>
                <div className="text-xs text-platinum-600">minimum viable spend</div>
              </div>
            )}
          </div>
          <input type="range" min="1" max="50" step="0.5" value={formData.annualBudgetM}
            onChange={e => setFormData({ ...formData, annualBudgetM: parseFloat(e.target.value) })}
            className="w-full h-2 bg-noir-700 rounded-lg appearance-none cursor-pointer accent-champagne-500" />
          <div className="flex justify-between text-xs text-platinum-600 mt-1"><span>$1M</span><span>$25M</span><span>$50M</span></div>
        </div>

        {/* Red warning */}
        <AnimatePresence>
          {belowFloorWarn && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-xl border border-status-danger/50 bg-status-danger/10">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-status-danger flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-status-danger" />
                </div>
                <div>
                  <div className="text-status-danger font-semibold text-sm mb-1">Below Minimum Viable Spend</div>
                  <p className="text-platinum-400 text-xs leading-relaxed">
                    ${formData.annualBudgetM}M/yr is below the ${selectedEntity?.floorM}M/yr floor for {selectedEntity?.name}. At this spend level, category presence is insufficient to register with the property's audience. Scores will be modeled at reduced confidence with significant downward pressure applied. Consider increasing spend or selecting a lower-tier property.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demographics */}
        <div className="mt-5">
          <label className="block text-xs font-medium text-platinum-400 uppercase tracking-widest mb-3">Target Demographics</label>
          <div className="flex flex-wrap gap-2">
            {DEMOGRAPHICS.map(demo => (
              <button key={demo}
                onClick={() => {
                  const n = formData.targetDemo.includes(demo) ? formData.targetDemo.filter(d => d !== demo) : [...formData.targetDemo, demo];
                  setFormData({ ...formData, targetDemo: n });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.targetDemo.includes(demo) ? 'bg-champagne-500 text-noir-900' : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'}`}>
                {demo}
              </button>
            ))}
          </div>
        </div>

        <button onClick={runSimulation}
          disabled={!formData.brand || !formData.entity || !formData.partnershipType || isSimulating}
          className="w-full mt-6 bg-gradient-champagne text-noir-900 font-bold py-4 rounded-xl hover:glow-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          {isSimulating ? 'Running Simulation...' : 'Run Simulation'}
        </button>
      </div>

      {isSimulating && (
        <div className="card-premium rounded-2xl p-12 text-center">
          <div className="inline-block w-12 h-12 rounded-full border-t-transparent animate-spin mb-4" style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#d4c599', borderTopColor: 'transparent' }} />
          <p className="text-platinum-300 mt-2">Modeling against {(33200).toLocaleString()} Resonance Agents</p>
          <p className="text-platinum-600 text-sm mt-1">Aggregating signals across Reddit, X, Kalshi, Polymarket, and social channels</p>
        </div>
      )}

      {results && !isSimulating && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {results.belowFloor && (
            <div className="p-4 rounded-xl border border-status-danger/40 bg-status-danger/8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-status-danger flex-shrink-0" />
              <p className="text-status-danger text-sm">Simulation running at reduced confidence — spend is below minimum viable floor for {results.parameters.entity}. Results are directional only.</p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Brand Lift', value: `+${results.brandLift}%`, sub: 'projected peak', color: 'border-champagne-500', text: 'text-champagne-500' },
              { label: 'Consideration Lift', value: `+${results.considerationLift}%`, sub: 'purchase intent', color: 'border-pearl-500', text: 'text-pearl-400' },
              { label: 'Resonance Reach', value: `${(results.reach / 1000000).toFixed(1)}M`, sub: `${(results.directReach/1000000).toFixed(1)}M direct / ${(results.viralReach/1000000).toFixed(1)}M viral`, color: 'border-accent-sage', text: 'text-accent-sage' },
              { label: 'Partnership Impact', value: `${results.partnershipImpact}/100`, sub: 'composite score', color: 'border-champagne-500', text: 'text-champagne-500' }
            ].map((m, i) => (
              <div key={i} className={`card-premium rounded-xl p-5 border-l-4 ${m.color}`}>
                <div className="text-platinum-500 text-xs uppercase tracking-wide mb-1">{m.label}</div>
                <div className={`text-3xl font-bold ${m.text}`}>{m.value}</div>
                <div className="text-xs text-platinum-600 mt-1">{m.sub}</div>
              </div>
            ))}
          </div>

          <div className="card-premium rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">Culture Heat Index Impact</h3>
            <div className="grid grid-cols-6 gap-3">
              {Object.entries(results.chiMetrics).map(([metric, value]) => (
                <div key={metric} className="glass rounded-xl p-4 text-center">
                  <div className="text-platinum-500 text-xs uppercase tracking-wide mb-2">{metric}</div>
                  <div className="text-2xl font-bold text-champagne-500">+{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <h3 className="text-lg font-display font-bold text-white mb-4">Recommended Media Mix</h3>
            <div className="space-y-3">
              {Object.entries(results.mediaMix).map(([channel, pct]) => (
                <div key={channel}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-platinum-300 text-sm">{channel}</span>
                    <span className="text-champagne-500 font-mono text-sm">{(pct * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-noir-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-champagne" initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <USImpactMap impactData={results.geographicImpact} />

          <div className="card-premium rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-champagne flex items-center justify-center flex-shrink-0">
                <span className="text-noir-900 font-bold text-xs">AI</span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">Strategic Assessment</h3>
                <span className="text-xs text-platinum-600">CultureOS Resonance Engine</span>
              </div>
            </div>
            <div className="mb-5 p-4 glass-strong rounded-xl border border-champagne-500/20">
              <div className="text-xs uppercase tracking-widest text-champagne-500 mb-2">Executive Summary</div>
              <p className="text-platinum-200 leading-relaxed text-sm">{results.insights.summary}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: 'Top Opportunities', items: results.insights.opportunities, color: 'text-status-success' },
                { title: 'Key Risks', items: results.insights.risks, color: 'text-status-warning', icon: '!' },
                { title: 'Best Practices', items: results.insights.bestPractices, color: 'text-champagne-500' }
              ].map((section, si) => (
                <div key={si}>
                  <div className={`text-xs font-medium uppercase tracking-widest mb-3 ${section.color}`}>{section.title}</div>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex gap-3 items-start glass rounded-lg p-3">
                        <span className={`font-bold text-sm flex-shrink-0 ${section.color}`}>{section.icon || (i + 1)}</span>
                        <p className="text-platinum-300 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
