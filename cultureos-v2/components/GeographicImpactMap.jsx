'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Built by stargirl | CAA | January 2026

// US market coordinates and populations
const US_MARKETS = [
  { name: 'New York', x: 78, y: 35, pop: 19.7, region: 'northeast' },
  { name: 'Los Angeles', x: 12, y: 58, pop: 13.2, region: 'west' },
  { name: 'Chicago', x: 62, y: 40, pop: 9.5, region: 'midwest' },
  { name: 'Dallas', x: 48, y: 70, pop: 7.6, region: 'south' },
  { name: 'Houston', x: 50, y: 75, pop: 7.1, region: 'south' },
  { name: 'Atlanta', x: 68, y: 68, pop: 6.0, region: 'south' },
  { name: 'Miami', x: 78, y: 85, pop: 6.2, region: 'south' },
  { name: 'Philadelphia', x: 76, y: 38, pop: 6.2, region: 'northeast' },
  { name: 'Phoenix', x: 22, y: 67, pop: 4.9, region: 'west' },
  { name: 'San Francisco', x: 8, y: 48, pop: 4.7, region: 'west' },
  { name: 'Boston', x: 82, y: 28, pop: 4.9, region: 'northeast' },
  { name: 'Seattle', x: 10, y: 22, pop: 4.0, region: 'west' },
  { name: 'Denver', x: 32, y: 48, pop: 2.9, region: 'west' },
  { name: 'Minneapolis', x: 54, y: 28, pop: 3.7, region: 'midwest' },
  { name: 'Detroit', x: 66, y: 32, pop: 4.3, region: 'midwest' },
  { name: 'Portland', x: 8, y: 28, pop: 2.5, region: 'west' },
  { name: 'Las Vegas', x: 18, y: 58, pop: 2.3, region: 'west' },
  { name: 'Nashville', x: 64, y: 60, pop: 2.0, region: 'south' },
  { name: 'Charlotte', x: 72, y: 62, pop: 2.6, region: 'south' },
  { name: 'Orlando', x: 76, y: 80, pop: 2.6, region: 'south' }
];

export default function GeographicImpactMap({ impactData = null }) {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [viewMode, setViewMode] = useState('impact'); // impact, demographics, engagement
  const [hoveredMarket, setHoveredMarket] = useState(null);

  // Calculate impact score for each market (0-100)
  const getMarketImpact = (market) => {
    if (!impactData) {
      // Default visualization based on population
      return (market.pop / 19.7) * 100;
    }
    return impactData[market.name] || Math.random() * 100;
  };

  // Get heat color based on impact
  const getHeatColor = (impact) => {
    if (impact >= 80) return '#10b981'; // Elite - Green
    if (impact >= 60) return '#0ea5e9'; // High - Blue
    if (impact >= 40) return '#f59e0b'; // Medium - Orange
    if (impact >= 20) return '#d946ef'; // Low - Purple
    return '#6b7280'; // Minimal - Gray
  };

  // Calculate bubble size based on impact
  const getBubbleSize = (impact) => {
    return 1 + (impact / 100) * 3; // 1 to 4 radius
  };

  return (
    <div className="bg-noir-900 rounded-xl border border-noir-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Geographic Impact Analysis</h3>
          <p className="text-platinum-400 text-sm">Cultural penetration by market</p>
        </div>

        {/* View Mode Selector */}
        <div className="flex gap-2">
          {[
            { id: 'impact', label: 'Impact', icon: '📍' },
            { id: 'demographics', label: 'Demographics', icon: '👥' },
            { id: 'engagement', label: 'Engagement', icon: '⚡' }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                viewMode === mode.id
                  ? 'bg-gold-500 text-white'
                  : 'bg-noir-800 text-platinum-400 hover:bg-noir-700'
              }`}
            >
              <span className="mr-1">{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-carbon-950 to-noir-900 rounded-lg border border-noir-700 overflow-hidden">
        {/* SVG Map */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.1" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* US Outline (simplified) */}
          <path
            d="M 5,25 L 12,23 L 18,20 L 25,22 L 30,25 L 35,28 L 40,28 L 45,30 L 50,32 L 55,30 L 60,28 L 65,27 L 70,28 L 75,30 L 78,32 L 80,35 L 82,40 L 83,45 L 82,50 L 80,55 L 78,58 L 76,62 L 75,66 L 74,70 L 73,74 L 72,78 L 70,82 L 68,85 L 65,86 L 60,86 L 55,85 L 50,84 L 45,82 L 40,78 L 35,75 L 30,72 L 25,70 L 20,68 L 18,66 L 15,65 L 12,62 L 10,58 L 8,54 L 7,50 L 6,45 L 5,40 L 5,35 L 5,30 Z"
            fill="none"
            stroke="#4b5563"
            strokeWidth="0.3"
          />

          {/* Market Bubbles */}
          {US_MARKETS.map(market => {
            const impact = getMarketImpact(market);
            const color = getHeatColor(impact);
            const size = getBubbleSize(impact);
            const isHovered = hoveredMarket?.name === market.name;
            const isSelected = selectedMarket?.name === market.name;

            return (
              <g key={market.name}>
                {/* Glow Effect */}
                <motion.circle
                  cx={market.x}
                  cy={market.y}
                  r={size * 2}
                  fill={color}
                  opacity={0.15}
                  animate={{
                    r: isHovered || isSelected ? size * 3 : size * 2,
                    opacity: isHovered || isSelected ? 0.25 : 0.15
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main Bubble */}
                <motion.circle
                  cx={market.x}
                  cy={market.y}
                  r={size}
                  fill={color}
                  stroke={isSelected ? '#ffffff' : color}
                  strokeWidth={isSelected ? '0.4' : '0.2'}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMarket(market)}
                  onMouseLeave={() => setHoveredMarket(null)}
                  onClick={() => setSelectedMarket(selectedMarket?.name === market.name ? null : market)}
                  animate={{
                    r: isHovered ? size * 1.3 : size,
                    opacity: 1
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Pulse Animation for High Impact */}
                {impact >= 80 && (
                  <motion.circle
                    cx={market.x}
                    cy={market.y}
                    r={size}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.3"
                    animate={{
                      r: size * 2,
                      opacity: [0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}

                {/* Hover/Select Tooltip */}
                {(isHovered || isSelected) && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <rect
                      x={market.x - 12}
                      y={market.y - size - 10}
                      width="24"
                      height="8"
                      fill="#18181b"
                      stroke={color}
                      strokeWidth="0.2"
                      rx="1"
                    />
                    <text
                      x={market.x}
                      y={market.y - size - 6.5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="2"
                      fontWeight="600"
                    >
                      {market.name}
                    </text>
                    <text
                      x={market.x}
                      y={market.y - size - 3.5}
                      textAnchor="middle"
                      fill={color}
                      fontSize="1.8"
                    >
                      {impact.toFixed(0)}% impact
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* Connection Lines (for related markets) */}
          {selectedMarket && (
            <>
              {US_MARKETS
                .filter(m => m.region === selectedMarket.region && m.name !== selectedMarket.name)
                .map(market => (
                  <motion.line
                    key={`line-${market.name}`}
                    x1={selectedMarket.x}
                    y1={selectedMarket.y}
                    x2={market.x}
                    y2={market.y}
                    stroke={getHeatColor(getMarketImpact(selectedMarket))}
                    strokeWidth="0.2"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-platinum-400 text-xs font-medium">Impact Level:</span>
          {[
            { label: 'Elite', color: '#10b981', range: '80-100%' },
            { label: 'High', color: '#0ea5e9', range: '60-79%' },
            { label: 'Medium', color: '#f59e0b', range: '40-59%' },
            { label: 'Low', color: '#d946ef', range: '20-39%' }
          ].map(tier => (
            <div key={tier.label} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tier.color }}
              />
              <span className="text-platinum-300 text-xs">
                {tier.label} <span className="text-platinum-500">({tier.range})</span>
              </span>
            </div>
          ))}
        </div>

        {/* Market Count */}
        <div className="text-platinum-400 text-xs">
          Tracking {US_MARKETS.length} major markets
        </div>
      </div>

      {/* Selected Market Details */}
      {selectedMarket && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-noir-800 rounded-lg border border-noir-700"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-white font-bold">{selectedMarket.name}</h4>
              <p className="text-platinum-400 text-sm capitalize">{selectedMarket.region} Region</p>
            </div>
            <button
              onClick={() => setSelectedMarket(null)}
              className="text-platinum-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-noir-900 rounded p-2">
              <div className="text-platinum-400 text-xs">Impact Score</div>
              <div className="text-white font-bold text-lg">
                {getMarketImpact(selectedMarket).toFixed(0)}%
              </div>
            </div>
            <div className="bg-noir-900 rounded p-2">
              <div className="text-platinum-400 text-xs">Population</div>
              <div className="text-white font-bold text-lg">
                {selectedMarket.pop}M
              </div>
            </div>
            <div className="bg-noir-900 rounded p-2">
              <div className="text-platinum-400 text-xs">Reach</div>
              <div className="text-white font-bold text-lg">
                {(selectedMarket.pop * (getMarketImpact(selectedMarket) / 100)).toFixed(1)}M
              </div>
            </div>
            <div className="bg-noir-900 rounded p-2">
              <div className="text-platinum-400 text-xs">Tier</div>
              <div 
                className="font-bold text-lg"
                style={{ color: getHeatColor(getMarketImpact(selectedMarket)) }}
              >
                {getMarketImpact(selectedMarket) >= 80 ? 'Elite' : 
                 getMarketImpact(selectedMarket) >= 60 ? 'High' :
                 getMarketImpact(selectedMarket) >= 40 ? 'Medium' : 'Low'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
