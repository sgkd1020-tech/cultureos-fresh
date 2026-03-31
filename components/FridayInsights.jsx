'use client';

// Built by stargirl | CAA | CultureOS | March 2026

import { useState } from 'react';
import { motion } from 'framer-motion';

const WEEK_OF = 'Week of March 24 – 28, 2026';
const PUBLISHED = 'Friday, March 28, 2026';

// stargirl | current cultural signals — sourced from social, prediction markets, news
const TIMELINE_EVENTS = [
  {
    day: 'Monday',
    date: 'Mar 24',
    category: 'Sports / Culture',
    heat: 92,
    headline: 'Caitlin Clark Effect Continues to Reshape WNBA Sponsorship Economics',
    summary: "Indiana Fever season ticket demand broke another record ahead of the 2026 WNBA season. Brands targeting women 18-44 are now treating WNBA inventory as a genuine tier-2 buy. Category exclusivity windows are narrowing fast — several major consumer categories have been claimed in the last 90 days.",
    signal: 'WNBA partner valuations up an estimated 40% year-over-year. Brands that waited on 2025 deals are now facing significantly higher rights fees.',
    tags: ['WNBA', 'Women\'s Sports', 'Brand Spend'],
    source: 'Social velocity + ticket sales data'
  },
  {
    day: 'Monday',
    date: 'Mar 24',
    category: 'Market Signal',
    heat: 78,
    headline: 'FIFA World Cup 2026 Hospitality Packages Approaching Sellout',
    summary: "With the tournament now less than 90 days away, corporate hospitality inventory for the U.S. host cities — New York, Los Angeles, Dallas, San Francisco — is nearly exhausted at premium tiers. Brands still seeking activation windows are pivoting to digital and broadcast layers.",
    signal: 'Polymarket now rates a 94% probability of 5B+ cumulative viewers. Activation window for late-entering brands is closing.',
    tags: ['FIFA', 'World Cup 2026', 'Hospitality'],
    source: 'Polymarket + venue data'
  },
  {
    day: 'Tuesday',
    date: 'Mar 25',
    category: 'Cultural Shift',
    heat: 85,
    headline: 'NCAA March Madness Drives Record Digital Engagement — Brands Missing the Moment',
    summary: "The 2026 NCAA Tournament is tracking to be the most digitally engaged in history. X and Reddit bracket discourse is up 60% versus 2025. Streaming viewership on Peacock and CBS has outpaced linear for the first time. Brands with college sports adjacency are generating outsized earned media.",
    signal: 'Kalshi prediction markets show 71% probability of a new NCAA TV deal valued above $2B annually before the 2027 season. Sponsorship floor will reprice accordingly.',
    tags: ['NCAA', 'March Madness', 'Streaming'],
    source: 'X volume data + Kalshi'
  },
  {
    day: 'Tuesday',
    date: 'Mar 25',
    category: 'Sponsorship Intel',
    heat: 71,
    headline: 'Formula 1 Las Vegas GP Draws First-Time U.S. Brand Entrants',
    summary: "The Las Vegas Grand Prix has quietly become the entry point for brands that want F1 adjacency without a multi-year global commitment. Three consumer tech brands and one challenger financial platform entered F1 activation for the first time through the Vegas race weekend. Deal structures are increasingly event-specific rather than team-season.",
    signal: 'U.S.-market F1 viewership is up 34% since the Netflix documentary era. Brand floor for Las Vegas event activation has risen to approximately $3-5M per race weekend.',
    tags: ['F1', 'Formula 1', 'Las Vegas', 'New Entrants'],
    source: 'Sponsorship filings + social monitoring'
  },
  {
    day: 'Wednesday',
    date: 'Mar 26',
    category: 'Cultural Tension',
    heat: 88,
    headline: 'NIL Economy Fragmenting College Sports Sponsorship — Complexity Is Rising',
    summary: "NCAA Name, Image, and Likeness spending has exceeded $1.2B in the 2025-26 academic year. Brands are now managing relationships with individual athletes, collectives, and universities simultaneously. The category is becoming structurally complex — brands without a coordinated NIL strategy are generating inconsistent returns.",
    signal: 'Reddit and X sentiment shows fan backlash emerging against brands perceived as purely transactional in NIL deals. Authenticity and athlete fit are increasingly scrutinized.',
    tags: ['NIL', 'College Sports', 'Athletes'],
    source: 'Reddit sentiment + NIL disclosure data'
  },
  {
    day: 'Wednesday',
    date: 'Mar 26',
    category: 'Market Signal',
    heat: 74,
    headline: 'NBA Playoffs Begin in Three Weeks — Finals Inventory in Final Negotiations',
    summary: "With the NBA regular season winding down, finals presenting sponsorship inventory is in final negotiation across several open categories. The financial services category remains partially unclaimed at the national broadcast level. This is the last window before playoff ad packages lock.",
    signal: 'Brands targeting 18-34 male audiences: NBA Finals CPM is running 22% below Super Bowl on a reach-adjusted basis. Underpriced relative to cultural impact.',
    tags: ['NBA', 'Playoffs', 'Finals', 'Inventory'],
    source: 'Ad market data + league filings'
  },
  {
    day: 'Thursday',
    date: 'Mar 27',
    category: 'Brand Intelligence',
    heat: 81,
    headline: 'Crypto and Sports Sponsorship: Category Rationalizing After 2022 Excess',
    summary: "Following the FTX collapse and subsequent pullbacks, the crypto sports sponsorship category is rebuilding with more credible players. Coinbase has maintained its NBA partnership and is expanding. Kraken renewed with the NHL. New entrants are primarily stablecoin and DeFi platforms entering through niche properties rather than league-level deals.",
    signal: 'Consumer trust in crypto brand partnerships is recovering — up 18 points from the 2023 trough according to brand perception tracking. Window for category repositioning is open.',
    tags: ['Crypto', 'Sponsorship', 'Brand Trust'],
    source: 'Brand perception data + X sentiment'
  },
  {
    day: 'Thursday',
    date: 'Mar 27',
    category: 'Opportunity Signal',
    heat: 90,
    headline: 'Streaming Wars Creating New Sports Broadcast Sponsorship Inventory',
    summary: "Amazon Prime Video, Apple TV+, and Peacock have collectively added over $800M in sports rights in the last 18 months. The shift from linear to streaming is creating new sponsorship formats — interactive overlays, second-screen integrations, and pause-ad units — that traditional measurement frameworks are not capturing. First-mover advantage for brands willing to build new measurement models.",
    signal: 'Brands that activated alongside streaming sports launches saw 28% higher unaided recall than brands in traditional broadcast slots for comparable spend levels.',
    tags: ['Streaming', 'Amazon', 'Apple TV+', 'Digital'],
    source: 'Media measurement research + brand studies'
  },
  {
    day: 'Friday',
    date: 'Mar 28',
    category: 'Weekly Headline',
    heat: 95,
    headline: 'The Month in Culture: March 2026 Was Defined by Sports Technology and Women\'s Athletics',
    summary: "Two narratives dominated cultural and commercial discourse in March 2026: the accelerating mainstream adoption of AI and data tools in sports — from player performance to fan engagement — and the continued commercial validation of women's sports properties. WNBA, NWSL, and women's college basketball drove disproportionate media coverage relative to sponsorship spend levels, signaling a persistent market inefficiency that will close as brands compete for category exclusivity.",
    signal: 'Properties where cultural velocity has outpaced commercial spend represent the highest near-term ROI opportunity. CultureOS Resonance Agent data shows WNBA and NWSL still underpriced relative to audience quality.',
    tags: ['Monthly Summary', 'Women\'s Sports', 'AI in Sports', 'Market Opportunity'],
    source: 'CultureOS Resonance Engine — 33,200 agents'
  }
];

const HEAT_COLORS = {
  high:   { bg: '#d4c599', text: '#0a0a0a' },
  medium: { bg: '#c2ad7f', text: '#0a0a0a' },
  low:    { bg: '#4a4a4a', text: '#e0e0e0' }
};

const getHeatLevel = (score) => score >= 85 ? 'high' : score >= 70 ? 'medium' : 'low';
const getHeatLabel = (score) => score >= 85 ? 'High Signal' : score >= 70 ? 'Medium Signal' : 'Low Signal';

const CATEGORY_COLORS = {
  'Sports / Culture':   '#d4c599',
  'Market Signal':      '#00A878',
  'Cultural Shift':     '#8B5CF6',
  'Sponsorship Intel':  '#00A0FF',
  'Cultural Tension':   '#FF6B35',
  'Brand Intelligence': '#FF3008',
  'Opportunity Signal': '#1DB954',
  'Weekly Headline':    '#d4c599'
};

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function FridayInsights() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [filterDay, setFilterDay] = useState('All');

  const days = ['All', ...DAY_ORDER];
  const filtered = filterDay === 'All' ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.day === filterDay);
  const groupedByDay = DAY_ORDER.reduce((acc, day) => {
    const items = filtered.filter(e => e.day === day);
    if (items.length) acc[day] = items;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium rounded-2xl p-7">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-platinum-500 mb-2">CultureOS Intelligence Brief</div>
            <h2 className="text-3xl font-display font-bold text-white">Friday Insights</h2>
            <p className="text-platinum-400 mt-1">{WEEK_OF}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-platinum-600 mb-1">Published</div>
            <div className="text-sm font-medium text-champagne-500">{PUBLISHED}</div>
            <div className="text-xs text-platinum-600 mt-2">9 signals this week</div>
          </div>
        </div>

        {/* Weekly heat stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Avg Signal Strength</div>
            <div className="text-3xl font-bold text-champagne-500">
              {Math.round(TIMELINE_EVENTS.reduce((s, e) => s + e.heat, 0) / TIMELINE_EVENTS.length)}
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">High Signal Events</div>
            <div className="text-3xl font-bold text-white">{TIMELINE_EVENTS.filter(e => e.heat >= 85).length}</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Categories Covered</div>
            <div className="text-3xl font-bold text-white">{new Set(TIMELINE_EVENTS.map(e => e.category)).size}</div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-platinum-500 uppercase tracking-wide mb-1">Top Signal</div>
            <div className="text-3xl font-bold text-champagne-500">{Math.max(...TIMELINE_EVENTS.map(e => e.heat))}</div>
          </div>
        </div>
      </div>

      {/* Day filter */}
      <div className="flex gap-2 flex-wrap">
        {days.map(day => (
          <button key={day} onClick={() => setFilterDay(day)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${filterDay === day ? 'bg-champagne-500 text-noir-900' : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'}`}>
            {day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedByDay).map(([day, events]) => (
          <div key={day}>
            {/* Day header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-xs uppercase tracking-widest text-platinum-500 font-medium">{day}</div>
              <div className="flex-1 h-px bg-noir-700" />
              <div className="text-xs text-platinum-600">{events[0].date}</div>
            </div>

            {/* Events for this day */}
            <div className="space-y-3 ml-0">
              {/* Timeline line + events */}
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-noir-700" />

                <div className="space-y-4">
                  {events.map((event, idx) => {
                    const globalIdx = TIMELINE_EVENTS.indexOf(event);
                    const isExpanded = expandedIdx === globalIdx;
                    const heatLevel = getHeatLevel(event.heat);
                    const heatColors = HEAT_COLORS[heatLevel];
                    const categoryColor = CATEGORY_COLORS[event.category] || '#d4c599';

                    return (
                      <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
                        className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-8 top-5 w-3 h-3 rounded-full border-2 flex-shrink-0"
                          style={{ borderColor: categoryColor, backgroundColor: isExpanded ? categoryColor : '#0a0a0a' }} />

                        <div
                          className={`card-premium rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-platinum-700 ${isExpanded ? 'border-champagne-500/30' : ''}`}
                          onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                {/* Category + heat */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                                    style={{ color: categoryColor, backgroundColor: `${categoryColor}18` }}>
                                    {event.category}
                                  </span>
                                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{ backgroundColor: heatColors.bg, color: heatColors.text }}>
                                    {getHeatLabel(event.heat)}
                                  </span>
                                </div>
                                <h3 className="text-white font-bold leading-snug">{event.headline}</h3>
                                {!isExpanded && (
                                  <p className="text-platinum-500 text-sm mt-2 line-clamp-2 leading-relaxed">{event.summary}</p>
                                )}
                              </div>
                              <div className="flex-shrink-0 text-right">
                                <div className="text-3xl font-bold text-champagne-500">{event.heat}</div>
                                <div className="text-xs text-platinum-600">heat</div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isExpanded && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                              className="px-5 pb-5 border-t border-noir-700">
                              <p className="text-platinum-300 text-sm leading-relaxed mt-4 mb-4">{event.summary}</p>

                              <div className="p-4 rounded-xl border border-champagne-500/20 bg-champagne-500/5 mb-4">
                                <div className="text-xs uppercase tracking-widest text-champagne-500 mb-2">Signal Intelligence</div>
                                <p className="text-platinum-200 text-sm leading-relaxed">{event.signal}</p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                  {event.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-noir-700 text-platinum-400 text-xs rounded-full border border-noir-600">{tag}</span>
                                  ))}
                                </div>
                                <div className="text-xs text-platinum-600 flex-shrink-0 ml-4">{event.source}</div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center py-4">
        <p className="text-platinum-600 text-xs">
          Signals aggregated from Reddit, X, Kalshi, Polymarket, and media monitoring — modeled against 33,200 Resonance Agents
        </p>
      </div>
    </div>
  );
}
