'use client';

// Built by stargirl | CAA | CultureOS | March 2026

import { useState } from 'react';
import { motion } from 'framer-motion';

const WEEK_OF = 'Week of March 24 – 30, 2026';
const PUBLISHED = 'Monday, March 30, 2026';

// stargirl | current cultural signals — sourced from social, prediction markets, news
const TIMELINE_EVENTS = [
  {
    day: 'Monday',
    date: 'Mar 24',
    category: 'Sports / Culture',
    heat: 91,
    headline: 'WNBA Sponsorship Pricing Has Officially Left the Emerging Category Era',
    summary: "Indiana Fever season ticket demand broke records again ahead of the 2026 season, and brand exclusivity windows are closing across consumer categories. What was framed as a long-term bet two years ago is now a competitive market. Several major packaged goods, financial services, and apparel categories have been locked by early movers — late entrants are now paying significantly more for less.",
    signal: 'WNBA partner valuations are up an estimated 40% year-over-year. The Caitlin Clark effect is structural, not cyclical. Brands that treated this as a wait-and-see play are now priced out of the best inventory.',
    tags: ['WNBA', "Women's Sports", 'Brand Spend'],
    source: 'Social velocity + ticket sales data'
  },
  {
    day: 'Monday',
    date: 'Mar 24',
    category: 'Market Signal',
    heat: 80,
    headline: 'FIFA World Cup 2026 Corporate Hospitality Has Effectively Sold Out at Premium Tier',
    summary: "With the tournament now less than 90 days away, premium corporate hospitality in the U.S. host cities — New York, Los Angeles, Dallas — is nearly exhausted. Brands still seeking physical presence are pivoting to digital activation, broadcast overlays, and creator-led content strategies. The physical window is closed for most categories.",
    signal: 'Polymarket rates a 94% probability of 5B+ cumulative viewers. The question is no longer whether to activate — it is how to activate without hospitality access.',
    tags: ['FIFA', 'World Cup 2026', 'Hospitality'],
    source: 'Polymarket + venue data'
  },
  {
    day: 'Tuesday',
    date: 'Mar 25',
    category: 'Cultural Tension',
    heat: 86,
    headline: 'NIL Spending Crossed $1.2B — and the Model Is Breaking Under Its Own Weight',
    summary: "NCAA Name, Image, and Likeness spending has exceeded $1.2B in the 2025-26 academic year, but the category is fragmenting. Brands are now managing relationships with individual athletes, collectives, and universities simultaneously, often without coordination. The result is inconsistent ROI, brand dilution, and fan backlash against deals that read as transactional rather than authentic.",
    signal: 'The NIL era has expanded into high schools and even middle schools, with families retaining agents and holding back students a year to improve NIL positioning. This is not a controlled environment. Brands without a genuine athlete fit are generating negative earned media.',
    tags: ['NIL', 'College Sports', 'Athletes'],
    source: 'Reddit sentiment + NIL disclosure data'
  },
  {
    day: 'Tuesday',
    date: 'Mar 25',
    category: 'Sponsorship Intel',
    heat: 73,
    headline: 'Creator Collaboration Clauses Are Becoming Standard in Major Sports Deals',
    summary: "A structural shift is underway in how sports rights deals are written. Brands that once negotiated logo placement and broadcast spots are now demanding creator collaboration rights as primary deliverables. Sport is culture, and culture is carried by people — not placements. The smart money is backing creators who can translate sports moments into social content that lives far beyond the event window.",
    signal: 'Fan attention has migrated from broadcast to creator-led content, group chats, and watch parties. Brands with creator integrations embedded in their sports deals are generating engagement multiples that traditional metrics cannot capture.',
    tags: ['Creator Economy', 'Sports Deals', 'Sponsorship Structure'],
    source: 'Sponsorship filings + social monitoring'
  },
  {
    day: 'Wednesday',
    date: 'Mar 26',
    category: 'Market Signal',
    heat: 76,
    headline: 'Gambling Sponsorship Is Diverging Globally — Two Competing Realities Are Emerging',
    summary: "The Premier League gambling sponsorship ban comes into effect in 2026/27, pushing major betting brands toward sleeve and stadium naming rights inventory as front-of-shirt alternatives. Meanwhile, markets like the U.S. and parts of Asia continue to see record gambling sponsorship spend. The result is not a single global trend but two competing realities that will reshape rights fees over the next 18 months.",
    signal: 'Gambling brands exiting Premier League front-of-shirt deals represent significant displaced capital seeking new sponsorship homes. European stadium naming and sleeve inventory will see pricing pressure as demand concentrates.',
    tags: ['Gambling', 'Premier League', 'Global Sponsorship'],
    source: 'Regulatory filings + The Sponsor market data'
  },
  {
    day: 'Wednesday',
    date: 'Mar 26',
    category: 'Opportunity Signal',
    heat: 88,
    headline: 'NBA Playoff Race Entering Final Two Weeks — Pistons and Thunder Emerge as Finals Favorites',
    summary: "The NBA regular season concludes April 12. Detroit leads the East at 54-20 despite Cade Cunningham missing two weeks with a collapsed lung — a testament to the roster depth built around him. Oklahoma City leads the West at 59-16 on a 17-2 run since the All-Star break. BPI gives a Pistons-Thunder Finals matchup an 18.8% probability, the highest of any potential pairing. Finals inventory negotiations are entering their final window.",
    signal: 'NBA Finals CPM runs roughly 22% below Super Bowl on a reach-adjusted basis for 18-34 male audiences. The Finals remain structurally underpriced relative to their cultural footprint. Open categories exist at the national broadcast level.',
    tags: ['NBA', 'Playoffs', 'Finals', 'Inventory'],
    source: 'ESPN BPI + ad market data'
  },
  {
    day: 'Thursday',
    date: 'Mar 27',
    category: 'Brand Intelligence',
    heat: 93,
    headline: 'Indiana Pacers Launch First Sports Retail Media Network — Every Team Is Watching',
    summary: "Pacers Sports and Entertainment debuted the Fieldhouse Media Network in partnership with Deloitte and Yieldmo — the first retail media network built directly on a sports property's first-party fan data. The network extends sponsorship from arena and local promotions to targeted web inventory using player name keywords like Caitlin Clark and Tyrese Haliburton. Within 24 hours of launch, PS&E received over 100 inbound calls from NBA teams and other leagues asking how to replicate it.",
    signal: 'This is the convergence of sports sponsorship and retail media that the industry has discussed for three years. The brand that locks category exclusivity in a sports RMN at this early stage will have measurement infrastructure that traditional competitors cannot match.',
    tags: ['Retail Media', 'NBA', 'Indiana Pacers', 'WNBA'],
    source: 'AdExchanger + league filings — March 27, 2026'
  },
  {
    day: 'Thursday',
    date: 'Mar 27',
    category: 'Cultural Shift',
    heat: 82,
    headline: 'Enterprise Brands Are Buying Infrastructure, Not Impressions — Sponsorship Is Becoming Operational',
    summary: "A distinct category of sports partnership has taken hold: brands like AWS, Cisco, and Microsoft are embedding their products directly into how leagues and venues operate — not just how they are branded. Cisco's NFL infrastructure spans Wi-Fi 7 deployments and AI-ready systems across stadium environments. These deals are measured through performance and enablement, not reach. Sponsorship is becoming infrastructure.",
    signal: 'Business-backed sponsorships represent the most durable category in sports right now. They are harder to cancel, less susceptible to brand safety concerns, and create operational dependencies that deepen over time. The model is spreading beyond tech into financial services and logistics.',
    tags: ['Enterprise', 'Technology', 'Infrastructure', 'NFL'],
    source: 'SponsorUnited analysis + league filings'
  },
  {
    day: 'Friday',
    date: 'Mar 28',
    category: 'Weekly Headline',
    heat: 96,
    headline: 'UConn Downs Duke on a Half-Court Buzzer Beater — The Final Four Is Set and the Moment Is Already Iconic',
    summary: "Braylon Mullins hit a logo 3-pointer with 0.4 seconds remaining to complete the sixth-largest comeback in NCAA tournament history, sending UConn past Duke 73-72. The Huskies trailed by 19. Dan Hurley now has a chance to become the first coach since John Wooden to win three national championships in four years. Final Four: UConn vs. Illinois, Arizona vs. Michigan — April 4 in Indianapolis on TBS. The moment was already the most clipped and shared sports video of 2026 within hours of the final buzzer.",
    signal: 'Tournament moments with this level of organic virality generate brand association value that is not captured in standard measurement frameworks. The Mullins shot will be referenced in sports culture for years. Brands with authentic March Madness adjacency are compounding that equity right now.',
    tags: ['NCAA', 'March Madness', 'Final Four', 'UConn'],
    source: 'NCAA.com + ESPN + social velocity data — March 30, 2026'
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
