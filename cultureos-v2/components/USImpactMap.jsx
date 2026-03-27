'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const US_STATES = {
  'California': { cx: 80, cy: 320, pop: 39.5 },
  'Texas': { cx: 380, cy: 450, pop: 29.1 },
  'Florida': { cx: 600, cy: 480, pop: 21.5 },
  'New York': { cx: 680, cy: 180, pop: 19.8 },
  'Pennsylvania': { cx: 640, cy: 220, pop: 13.0 },
  'Illinois': { cx: 480, cy: 250, pop: 12.7 },
  'Ohio': { cx: 560, cy: 240, pop: 11.7 },
  'Georgia': { cx: 580, cy: 420, pop: 10.7 },
  'North Carolina': { cx: 630, cy: 360, pop: 10.4 },
  'Michigan': { cx: 540, cy: 200, pop: 10.0 },
  'New Jersey': { cx: 680, cy: 210, pop: 9.3 },
  'Virginia': { cx: 640, cy: 320, pop: 8.5 },
  'Washington': { cx: 60, cy: 120, pop: 7.7 },
  'Arizona': { cx: 160, cy: 420, pop: 7.2 },
  'Massachusetts': { cx: 720, cy: 170, pop: 7.0 },
  'Tennessee': { cx: 540, cy: 360, pop: 6.9 },
  'Indiana': { cx: 520, cy: 260, pop: 6.8 },
  'Missouri': { cx: 440, cy: 310, pop: 6.2 },
  'Maryland': { cx: 660, cy: 280, pop: 6.2 },
  'Wisconsin': { cx: 480, cy: 200, pop: 5.9 },
  'Colorado': { cx: 280, cy: 290, pop: 5.8 },
  'Minnesota': { cx: 420, cy: 180, pop: 5.7 },
  'South Carolina': { cx: 610, cy: 400, pop: 5.1 },
  'Alabama': { cx: 540, cy: 420, pop: 5.0 },
  'Louisiana': { cx: 440, cy: 460, pop: 4.6 },
  'Kentucky': { cx: 540, cy: 320, pop: 4.5 },
  'Oregon': { cx: 60, cy: 200, pop: 4.2 },
  'Oklahoma': { cx: 370, cy: 390, pop: 4.0 },
  'Connecticut': { cx: 700, cy: 190, pop: 3.6 },
  'Utah': { cx: 210, cy: 280, pop: 3.3 }
};

export default function USImpactMap({ impactData = {} }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const getStateImpact = (stateName) => {
    return impactData[stateName]?.impactScore || 0;
  };

  const getStateReach = (stateName) => {
    return impactData[stateName]?.reach || 0;
  };

  const getColor = (impact) => {
    if (impact >= 80) return '#d4c599';
    if (impact >= 70) return '#c2ad7f';
    if (impact >= 60) return '#d4e8d4';
    if (impact >= 50) return '#8b5cf6';
    return '#525252';
  };

  const getSize = (impact) => {
    if (impact === 0) return 4;
    return 6 + (impact / 100) * 16;
  };

  return (
    <div className="card-premium rounded-2xl p-6">
      <h3 className="text-xl font-display font-bold text-white mb-4">Geographic Impact Distribution</h3>
      
      <div className="relative w-full h-[500px] bg-noir-950 rounded-xl overflow-hidden border border-platinum-700">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <rect width="800" height="600" fill="#0a0a0a" />
          
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#grid)" />
          
          {Object.entries(US_STATES).map(([state, coords]) => {
            const impact = getStateImpact(state);
            const reach = getStateReach(state);
            const size = getSize(impact);
            const color = getColor(impact);
            const isHovered = hoveredState === state;
            const isSelected = selectedState === state;

            return (
              <g key={state}>
                {impact > 0 && (
                  <circle
                    cx={coords.cx}
                    cy={coords.cy}
                    r={size * 2.5}
                    fill={color}
                    opacity={0.1}
                  />
                )}
                
                <motion.circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={size}
                  fill={impact > 0 ? color : '#404040'}
                  stroke={isSelected ? '#fff' : 'none'}
                  strokeWidth={isSelected ? 2 : 0}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.3 }}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(state === selectedState ? null : state)}
                />

                {(isHovered || isSelected) && (
                  <g>
                    <rect
                      x={coords.cx - 70}
                      y={coords.cy - size - 45}
                      width="140"
                      height="38"
                      fill="#171717"
                      stroke={color}
                      strokeWidth="1"
                      rx="6"
                    />
                    <text
                      x={coords.cx}
                      y={coords.cy - size - 28}
                      textAnchor="middle"
                      fill="#fafafa"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {state}
                    </text>
                    <text
                      x={coords.cx}
                      y={coords.cy - size - 14}
                      textAnchor="middle"
                      fill={color}
                      fontSize="11"
                    >
                      {impact > 0 ? `${impact}% impact` : 'No data'}
                    </text>
                  </g>
                )}

                {impact >= 80 && (
                  <motion.circle
                    cx={coords.cx}
                    cy={coords.cy}
                    r={size}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {[
            { label: 'Elite', color: '#d4c599', range: '80-100%' },
            { label: 'High', color: '#c2ad7f', range: '70-79%' },
            { label: 'Medium', color: '#d4e8d4', range: '60-69%' },
            { label: 'Low', color: '#8b5cf6', range: '50-59%' }
          ].map(tier => (
            <div key={tier.label} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }} />
              <span className="text-platinum-300 text-sm">
                {tier.label} <span className="text-platinum-600">({tier.range})</span>
              </span>
            </div>
          ))}
        </div>
        <div className="text-platinum-500 text-sm">
          {Object.keys(US_STATES).length} states tracked
        </div>
      </div>

      {selectedState && impactData[selectedState] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 glass-strong rounded-xl p-5 border border-champagne-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-bold text-lg">{selectedState}</h4>
            <button
              onClick={() => setSelectedState(null)}
              className="text-platinum-500 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-platinum-500 text-sm">Impact Score</div>
              <div className="text-2xl font-bold text-champagne-500">{impactData[selectedState].impactScore}%</div>
            </div>
            <div>
              <div className="text-platinum-500 text-sm">Reach</div>
              <div className="text-2xl font-bold text-white">{(impactData[selectedState].reach / 1000000).toFixed(2)}M</div>
            </div>
            <div>
              <div className="text-platinum-500 text-sm">Population</div>
              <div className="text-2xl font-bold text-pearl-400">{US_STATES[selectedState].pop}M</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
