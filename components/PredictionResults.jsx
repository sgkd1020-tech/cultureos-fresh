'use client';

// Built by stargirl | CAA | CultureOS | March 2026

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'summary',     label: 'Summary' },
  { id: 'impact',      label: 'Impact' },
  { id: 'competitive', label: 'Competitive' },
  { id: 'talent',      label: 'Talent' }
];

export default function PredictionResults({ selectedSimulation }) {
  const [activeTab, setActiveTab] = useState('summary');
  if (!selectedSimulation) return null;

  const sim = selectedSimulation;
  const isEvent = !sim.partnership.years;
  const fmtM  = v => `$${(v / 1000000).toFixed(0)}M`;
  const fmtM1 = v => `$${(v / 1000000).toFixed(1)}M`;

  const annualLabel = isEvent
    ? `${sim.partnership.events} events total`
    : `${sim.partnership.years}-year deal`;

  // stargirl | year-by-year bar chart
  const YearChart = ({ data }) => {
    const max = Math.max(...data.map(d => d.brandLift));
    return (
      <div className="space-y-3">
        {data.map((period, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-white text-sm font-medium">{period.label}</div>
                <div className="text-platinum-600 text-xs mt-0.5 leading-relaxed">{period.note}</div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-champagne-500 font-bold">+{period.brandLift}%</div>
                <div className="text-platinum-600 text-xs">{fmtM1(period.estimatedMediaValue)} EMV</div>
              </div>
            </div>
            <div className="h-1.5 bg-noir-900 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-champagne" initial={{ width: 0 }}
                animate={{ width: `${(period.brandLift / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

      {/* Hero */}
      <div className="card-premium rounded-2xl p-7">
        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl border border-champagne-500/20 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${sim.brand.color}14` }}>
              <span className="text-xl font-display font-bold" style={{ color: sim.brand.color }}>
                {sim.brand.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-platinum-600 text-xs uppercase tracking-widest mb-1">{sim.entity.dealCategory}</div>
              <h2 className="text-3xl font-display font-bold text-white">
                {sim.brand.name} <span className="text-platinum-600">x</span> {sim.entity.name}
              </h2>
              <p className="text-platinum-400 text-sm mt-1">{sim.partnership.type}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="px-2.5 py-1 bg-champagne-500/10 text-champagne-500 text-xs rounded-full border border-champagne-500/20">{annualLabel}</span>
                <span className="px-2.5 py-1 bg-noir-700/80 text-platinum-400 text-xs rounded-full border border-noir-600">{sim.resonanceAgents.toLocaleString()} Resonance Agents</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-platinum-600 text-xs uppercase tracking-widest mb-1">Total Commitment</div>
            <div className="text-4xl font-display font-bold text-premium">{fmtM(sim.partnership.totalCommitment)}</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-platinum-600">Rights fees</span>
                <span className="text-sm font-medium text-platinum-300">{fmtM(sim.partnership.totalRightsFees)}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-platinum-600">Activation + media</span>
                <span className="text-sm font-medium text-champagne-400">{fmtM(sim.partnership.totalActivationAndMedia)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Brand Lift', value: `+${sim.brandLift}%`, sub: 'projected peak', border: 'border-champagne-500', color: 'text-champagne-500' },
            { label: 'Consideration Lift', value: `+${sim.considerationLift}%`, sub: 'purchase intent', border: 'border-pearl-500', color: 'text-pearl-400' },
            { label: 'Total Reach', value: `${(sim.totalReach / 1000000).toFixed(1)}M`, sub: `${(sim.directReach/1e6).toFixed(1)}M direct / ${(sim.viralReach/1e6).toFixed(1)}M viral`, border: 'border-accent-sage', color: 'text-accent-sage' },
            { label: 'Partnership Impact', value: `${sim.partnershipImpact}/100`, sub: 'composite score', border: 'border-champagne-500', color: 'text-champagne-500' }
          ].map((m, i) => (
            <div key={i} className={`glass rounded-xl p-4 border-l-4 ${m.border}`}>
              <div className="text-platinum-500 text-xs uppercase tracking-wide mb-1">{m.label}</div>
              <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
              <div className="text-xs text-platinum-600 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-champagne-500 text-noir-900 glow-subtle' : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* SUMMARY */}
        {activeTab === 'summary' && (
          <motion.div key="summary" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
            <div className="grid grid-cols-3 gap-5">
              <div className="card-premium rounded-2xl p-5">
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-4">Annual Spend</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {isEvent ? fmtM(sim.partnership.totalRightsFees / sim.partnership.events) : fmtM(sim.partnership.annualRightsFee)}
                </div>
                <div className="text-platinum-500 text-sm">{isEvent ? 'per event, rights fee' : 'per year, rights fee'}</div>
                <div className="mt-3 pt-3 border-t border-noir-700">
                  <div className="text-xs text-platinum-600 mb-1">Activation + media</div>
                  <div className="text-champagne-400 font-bold">
                    {isEvent ? fmtM(sim.partnership.totalActivationAndMedia / sim.partnership.events) : fmtM(sim.partnership.annualActivationAndMedia)} / {isEvent ? 'event' : 'yr'}
                  </div>
                </div>
              </div>

              <div className="card-premium rounded-2xl p-5 border border-champagne-500/20">
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-4">Total Commitment</div>
                <div className="text-3xl font-bold text-pearl-400 mb-1">{fmtM(sim.partnership.totalCommitment)}</div>
                <div className="text-platinum-500 text-sm">{annualLabel}</div>
                <div className="mt-3 pt-3 border-t border-noir-700">
                  <div className="text-xs text-platinum-600">Activation ratio</div>
                  <div className="text-champagne-500 font-bold mt-1">
                    {((sim.partnership.totalActivationAndMedia / sim.partnership.totalRightsFees) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="card-premium rounded-2xl p-5">
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-4">Deal Structure</div>
                <div className="text-lg font-bold text-white mb-2">{sim.partnership.structure}</div>
                <div className="text-platinum-400 text-sm">{sim.entity.dealCategory}</div>
                <div className="mt-3 pt-3 border-t border-noir-700">
                  <div className="text-xs text-platinum-600">Feasibility</div>
                  <div className="text-status-success text-sm font-medium mt-1">{sim.partnership.feasibility.split(' — ')[0]}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="card-premium rounded-2xl p-5">
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-3">Market Context</div>
                <p className="text-platinum-300 text-sm leading-relaxed mb-4">{sim.partnership.minimumContext}</p>
                <div className="border-t border-noir-700 pt-4">
                  <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">Feasibility</div>
                  <p className="text-platinum-300 text-sm leading-relaxed">{sim.partnership.feasibility}</p>
                </div>
              </div>
              <div className="card-premium rounded-2xl p-5">
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-3">Cultural Timing Signal</div>
                <div className="p-4 rounded-xl border border-champagne-500/20 bg-champagne-500/5 mb-4">
                  <p className="text-platinum-200 text-sm leading-relaxed">{sim.partnership.culturalTiming}</p>
                </div>
                <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">Property Audience</div>
                <p className="text-platinum-400 text-sm leading-relaxed">{sim.entity.audienceProfile}</p>
              </div>
            </div>

            <div className="card-premium rounded-2xl p-5 border border-champagne-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-gradient-champagne flex items-center justify-center flex-shrink-0">
                  <span className="text-noir-900 font-bold text-xs">AI</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">Model Assessment</h3>
                <span className="text-xs text-platinum-600">CultureOS Resonance Engine</span>
              </div>
              <p className="text-platinum-200 leading-relaxed text-sm">{sim.impactExplanation}</p>
            </div>
          </motion.div>
        )}

        {/* IMPACT */}
        {activeTab === 'impact' && (
          <motion.div key="impact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-2">Culture Heat Index Impact</h3>
              <p className="text-platinum-400 text-sm mb-5">Projected shift across key brand health dimensions</p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(sim.chiMetricsImpact).map(([metric, impact]) => {
                  const val = String(impact).replace('+', '');
                  return (
                    <div key={metric} className="glass rounded-xl p-4">
                      <div className="text-platinum-500 text-xs uppercase tracking-wide mb-2">{metric}</div>
                      <div className="text-3xl font-bold text-champagne-500">+{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-5">Before / After</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { title: 'Baseline', titleColor: 'text-platinum-500', data: [
                    ['Perception', (sim.baselineMetrics.avgPerception * 100).toFixed(1) + '%'],
                    ['Awareness',  (sim.baselineMetrics.avgAwareness * 100).toFixed(1) + '%'],
                    ['Consideration', (sim.baselineMetrics.avgConsideration * 100).toFixed(1) + '%'],
                    ['Culture Heat', sim.baselineMetrics.cultureHeat],
                    ['Word of Mouth', sim.baselineMetrics.wordOfMouth]
                  ]},
                  { title: 'Projected', titleColor: 'text-champagne-500', data: [
                    ['Perception', (sim.finalMetrics.avgPerception * 100).toFixed(1) + '%', ((sim.finalMetrics.avgPerception - sim.baselineMetrics.avgPerception) * 100).toFixed(1)],
                    ['Awareness',  (sim.finalMetrics.avgAwareness * 100).toFixed(1) + '%', ((sim.finalMetrics.avgAwareness - sim.baselineMetrics.avgAwareness) * 100).toFixed(1)],
                    ['Consideration', (sim.finalMetrics.avgConsideration * 100).toFixed(1) + '%', ((sim.finalMetrics.avgConsideration - sim.baselineMetrics.avgConsideration) * 100).toFixed(1)],
                    ['Culture Heat', sim.finalMetrics.cultureHeat, sim.finalMetrics.cultureHeat - sim.baselineMetrics.cultureHeat],
                    ['Word of Mouth', sim.finalMetrics.wordOfMouth, sim.finalMetrics.wordOfMouth - sim.baselineMetrics.wordOfMouth]
                  ]}
                ].map((col, ci) => (
                  <div key={ci}>
                    <h4 className={`text-xs font-medium uppercase tracking-widest mb-4 ${col.titleColor}`}>{col.title}</h4>
                    {col.data.map(([label, val, delta]) => (
                      <div key={label} className="flex justify-between py-3 border-b border-noir-800">
                        <span className="text-platinum-400 text-sm">{label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono text-sm">{val}</span>
                          {delta !== undefined && <span className="text-status-success text-xs font-medium">+{delta}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-5">
                {isEvent ? 'Event-by-Event Projection' : 'Year-by-Year Projection'}
              </h3>
              <YearChart data={sim.yearByYearProjection} />
            </div>

            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-4">Top Markets by Impact</h3>
              <div className="space-y-3">
                {Object.entries(sim.geographicDistribution)
                  .sort((a, b) => b[1].impactScore - a[1].impactScore)
                  .map(([state, data], idx) => (
                    <div key={state} className="glass rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-champagne-500 font-bold text-lg w-8">#{idx + 1}</span>
                          <div>
                            <div className="text-white font-medium">{state}</div>
                            <div className="text-platinum-600 text-xs">{(data.reach / 1000000).toFixed(2)}M agents reached</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-champagne-500">{data.impactScore}</div>
                      </div>
                      <div className="h-1.5 bg-noir-900 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-champagne" initial={{ width: 0 }}
                          animate={{ width: `${data.impactScore}%` }} transition={{ duration: 0.7, delay: idx * 0.08 }} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* COMPETITIVE */}
        {activeTab === 'competitive' && (
          <motion.div key="competitive" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-2">Competitive Landscape</h3>
              <p className="text-platinum-400 text-sm mb-5 leading-relaxed">{sim.partnership.competitiveContext}</p>
              <div className="space-y-4">
                {sim.competitors.map((c, i) => (
                  <div key={i} className="glass rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white">{c.name}</h4>
                        <div className="text-champagne-500 text-sm mt-0.5">{c.investment}</div>
                      </div>
                      <span className="px-3 py-1 bg-noir-700 text-platinum-500 text-xs rounded-full border border-noir-600 flex-shrink-0">Competitor {i + 1}</span>
                    </div>
                    <p className="text-platinum-300 text-sm leading-relaxed">{c.strengths}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-4">Strategic Intelligence</h3>
              <div className="space-y-3">
                {sim.keyInsights.map((insight, i) => (
                  <div key={i} className="flex gap-4 items-start glass rounded-xl p-4">
                    <div className="w-6 h-6 rounded-full bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-champagne-500 font-bold text-xs">{i + 1}</span>
                    </div>
                    <p className="text-platinum-300 leading-relaxed text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TALENT */}
        {activeTab === 'talent' && (
          <motion.div key="talent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-5">
            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-2">Recommended Talent</h3>
              <p className="text-platinum-400 text-sm mb-5">Strategic talent selection for activation — matched to deal context and demographic targets</p>
              <div className="grid grid-cols-3 gap-4">
                {sim.talentRecommendations.map((talent, i) => {
                  const initials = talent.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <div key={i} className="glass rounded-xl p-5 border border-noir-700 hover:border-champagne-500/30 transition-all">
                      <div className="w-12 h-12 rounded-full bg-gradient-champagne flex items-center justify-center text-noir-900 font-bold text-base mb-3">
                        {initials}
                      </div>
                      <h4 className="text-white font-bold mb-0.5">{talent.name}</h4>
                      <div className="text-champagne-500 text-xs mb-2">{talent.role}</div>
                      <p className="text-platinum-400 text-xs leading-relaxed">{talent.rationale}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-premium rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-white mb-4">Media Mix Allocation</h3>
              <div className="space-y-3">
                {Object.entries(sim.mediaMix).map(([channel, pct], i) => {
                  const colors = ['#d4c599', '#c2ad7f', '#d4e8d4', '#e0d4e8'];
                  return (
                    <div key={channel}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                          <span className="text-platinum-300 text-sm">{channel}</span>
                        </div>
                        <span className="text-champagne-500 font-mono text-sm">{(pct * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 bg-noir-800 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: colors[i % colors.length] }}
                          initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-noir-700 grid grid-cols-3 gap-4">
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Annual Total Spend</div>
                  <div className="text-white font-bold">
                    {isEvent
                      ? `$${((sim.partnership.totalRightsFees + sim.partnership.totalActivationAndMedia) / sim.partnership.events / 1000000).toFixed(1)}M / event`
                      : `$${(sim.partnership.annualTotalSpend / 1000000).toFixed(1)}M / yr`}
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Activation Ratio</div>
                  <div className="text-white font-bold">
                    {((sim.partnership.totalActivationAndMedia / sim.partnership.totalRightsFees) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Resonance Reach</div>
                  <div className="text-white font-bold">{(sim.totalReach / 1000000).toFixed(1)}M agents</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
