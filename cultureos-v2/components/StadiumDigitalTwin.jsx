'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const MAVERICKS_ASSETS = [
  { id: 'mav-center', name: 'Center Court Logo', x: 300, y: 250, type: 'floor', size: 70, price: 6000000, visibility: 'Very High', objective: 'Brand Awareness', fitBrands: ['Tech', 'Finance', 'Automotive'] },
  { id: 'mav-baseline-home', name: 'Home Baseline Logo', x: 300, y: 100, type: 'floor', size: 55, price: 3500000, visibility: 'High', objective: 'Brand Recognition', fitBrands: ['Consumer Goods', 'Tech'] },
  { id: 'mav-baseline-away', name: 'Away Baseline Logo', x: 300, y: 400, type: 'floor', size: 55, price: 3500000, visibility: 'High', objective: 'Brand Recognition', fitBrands: ['Consumer Goods', 'Tech'] },
  { id: 'mav-sideline-led', name: 'Courtside LED Board', x: 100, y: 250, type: 'led', size: 180, price: 5000000, visibility: 'Very High', objective: 'Dynamic Messaging', fitBrands: ['All Categories'] },
  { id: 'mav-backboard-home', name: 'Home Backboard', x: 300, y: 120, type: 'backboard', size: 60, price: 3000000, visibility: 'Very High', objective: 'Game Action Association', fitBrands: ['Beverages', 'Auto', 'Insurance'] },
  { id: 'mav-backboard-away', name: 'Away Backboard', x: 300, y: 380, type: 'backboard', size: 60, price: 3000000, visibility: 'Very High', objective: 'Game Action Association', fitBrands: ['Beverages', 'Auto', 'Insurance'] },
  { id: 'mav-scorers', name: 'Scorer\'s Table', x: 150, y: 250, type: 'table', size: 100, price: 2000000, visibility: 'High', objective: 'Broadcast Visibility', fitBrands: ['Financial Services', 'Tech'] },
  { id: 'mav-tunnel', name: 'Player Tunnel', x: 80, y: 100, type: 'tunnel', size: 40, price: 1500000, visibility: 'Medium', objective: 'Player Association', fitBrands: ['Apparel', 'Footwear'] }
];

const BILLS_ASSETS = [
  { id: 'bills-midfield', name: 'Midfield Logo', x: 400, y: 300, type: 'field', size: 90, price: 8000000, visibility: 'Very High', objective: 'Brand Awareness', fitBrands: ['Beer', 'Automotive', 'Insurance'] },
  { id: 'bills-endzone-home', name: 'Home Endzone', x: 400, y: 100, type: 'endzone', size: 200, price: 5000000, visibility: 'Very High', objective: 'Touchdown Association', fitBrands: ['Beverages', 'Automotive'] },
  { id: 'bills-endzone-away', name: 'Away Endzone', x: 400, y: 500, type: 'endzone', size: 200, price: 5000000, visibility: 'Very High', objective: 'Touchdown Association', fitBrands: ['Beverages', 'Automotive'] },
  { id: 'bills-sideline-led', name: 'Sideline LED Ribbon', x: 150, y: 300, type: 'led', size: 250, price: 6000000, visibility: 'Very High', objective: 'Dynamic Messaging', fitBrands: ['All Categories'] },
  { id: 'bills-goalpost', name: 'Goal Post Padding', x: 400, y: 80, type: 'goalpost', size: 50, price: 2500000, visibility: 'High', objective: 'Field Goal Moments', fitBrands: ['Financial Services', 'Insurance'] },
  { id: 'bills-tunnel', name: 'Player Tunnel', x: 100, y: 150, type: 'tunnel', size: 60, price: 2000000, visibility: 'Medium', objective: 'Player Entrance', fitBrands: ['Apparel', 'Energy Drinks'] },
  { id: 'bills-club-level', name: 'Club Level Branding', x: 650, y: 300, type: 'club', size: 120, price: 4000000, visibility: 'Medium', objective: 'Premium Audience', fitBrands: ['Luxury Brands', 'Financial Services'] }
];

const STADIUM_INFO = {
  mavericks: {
    name: 'Dallas Mavericks Arena',
    location: 'Dallas, TX',
    capacity: '19,200',
    opening: '2028',
    market: 'Dallas-Fort Worth Metro (7.6M population)',
    demographics: 'Affluent, tech-forward, diverse, median income $68K',
    fandomStrength: '92/100 - One of NBA\'s most passionate fanbases',
    sponsorOpportunity: 'Premium market with strong corporate presence and tech industry growth'
  },
  bills: {
    name: 'Buffalo Bills Stadium',
    location: 'Orchard Park, NY',
    capacity: '62,000',
    opening: '2026',
    market: 'Buffalo Metro (1.1M population, regional draw 3M+)',
    demographics: 'Working class, loyal, family-oriented, median income $52K',
    fandomStrength: '98/100 - NFL\'s most passionate fanbase (Bills Mafia)',
    sponsorOpportunity: 'Intense fan loyalty creates authentic brand connections, strong regional presence'
  }
};

export default function StadiumDigitalTwin() {
  const [selectedStadium, setSelectedStadium] = useState('mavericks');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [hoveredAsset, setHoveredAsset] = useState(null);

  const currentAssets = selectedStadium === 'mavericks' ? MAVERICKS_ASSETS : BILLS_ASSETS;
  const stadiumInfo = STADIUM_INFO[selectedStadium];

  const getAssetColor = (type) => {
    const colors = {
      floor: '#d4c599',
      field: '#d4c599',
      led: '#c2ad7f',
      backboard: '#d4e8d4',
      endzone: '#d4e8d4',
      table: '#8b5cf6',
      tunnel: '#a8a8a8',
      goalpost: '#c2ad7f',
      club: '#e0d4e8'
    };
    return colors[type] || '#d4c599';
  };

  return (
    <div className="space-y-6">
      <div className="card-premium rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Next-Gen Stadium Digital Twins</h1>
            <p className="text-platinum-400">Forecasted sponsorship impact analysis for future venues</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedStadium('mavericks')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedStadium === 'mavericks'
                  ? 'bg-champagne-500 text-noir-900 glow-subtle'
                  : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'
              }`}
            >
              🏀 Dallas Mavericks
            </button>
            <button
              onClick={() => setSelectedStadium('bills')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedStadium === 'bills'
                  ? 'bg-champagne-500 text-noir-900 glow-subtle'
                  : 'bg-noir-800 text-platinum-400 hover:bg-noir-700 border border-noir-700'
              }`}
            >
              🏈 Buffalo Bills
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 glass-strong rounded-xl">
          <div>
            <div className="text-platinum-500 text-sm">Location</div>
            <div className="text-white font-medium">{stadiumInfo.location}</div>
          </div>
          <div>
            <div className="text-platinum-500 text-sm">Capacity</div>
            <div className="text-white font-medium">{stadiumInfo.capacity}</div>
          </div>
          <div>
            <div className="text-platinum-500 text-sm">Opening</div>
            <div className="text-white font-medium">{stadiumInfo.opening}</div>
          </div>
          <div className="col-span-3">
            <div className="text-platinum-500 text-sm mb-1">Fandom Strength</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-noir-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-champagne"
                  initial={{ width: 0 }}
                  animate={{ width: stadiumInfo.fandomStrength.split('/')[0] + '%' }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className="text-champagne-500 font-bold">{stadiumInfo.fandomStrength}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 card-premium rounded-2xl p-6">
          <h3 className="text-xl font-display font-bold text-white mb-4">
            {selectedStadium === 'mavericks' ? 'Arena Layout' : 'Stadium Layout'}
          </h3>
          
          <div className="relative w-full h-[600px] bg-noir-950 rounded-xl overflow-hidden border border-champagne-500/20">
            <svg viewBox="0 0 ${selectedStadium === 'mavericks' ? '600' : '800'} 600" className="w-full h-full">
              <rect width={selectedStadium === 'mavericks' ? '600' : '800'} height="600" fill="#0a0a0a" />
              
              {selectedStadium === 'mavericks' ? (
                <>
                  <rect x="50" y="50" width="500" height="500" fill="none" stroke="#8B4513" strokeWidth="3" opacity="0.3" />
                  <line x1="300" y1="50" x2="300" y2="550" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <circle cx="300" cy="300" r="60" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <path d="M 50,150 Q 150,150 150,300 Q 150,450 50,450" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <path d="M 550,150 Q 450,150 450,300 Q 450,450 550,450" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <rect x="200" y="50" width="200" height="180" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <rect x="200" y="370" width="200" height="180" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
                </>
              ) : (
                <>
                  <rect x="100" y="50" width="600" height="500" fill="none" stroke="#228B22" strokeWidth="4" opacity="0.3" />
                  <line x1="400" y1="50" x2="400" y2="550" stroke="#fff" strokeWidth="3" opacity="0.3" />
                  <line x1="100" y1="100" x2="700" y2="100" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  <line x1="100" y1="500" x2="700" y2="500" stroke="#fff" strokeWidth="2" opacity="0.3" />
                  {[150, 200, 250, 350, 400, 450].map(y => (
                    <line key={y} x1="100" y1={y} x2="700" y2={y} stroke="#fff" strokeWidth="1" opacity="0.2" />
                  ))}
                </>
              )}
              
              {currentAssets.map(asset => {
                const isHovered = hoveredAsset?.id === asset.id;
                const isSelected = selectedAsset?.id === asset.id;
                const color = getAssetColor(asset.type);
                
                return (
                  <g key={asset.id}>
                    {(isHovered || isSelected) && (
                      <circle
                        cx={asset.x}
                        cy={asset.y}
                        r={asset.size / 2 + 15}
                        fill={color}
                        opacity="0.15"
                      />
                    )}
                    
                    {(asset.type === 'floor' || asset.type === 'field') && (
                      <circle
                        cx={asset.x}
                        cy={asset.y}
                        r={asset.size / 2}
                        fill={color}
                        opacity="0.4"
                        stroke={color}
                        strokeWidth="3"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredAsset(asset)}
                        onMouseLeave={() => setHoveredAsset(null)}
                        onClick={() => setSelectedAsset(asset)}
                      />
                    )}
                    
                    {asset.type === 'led' && (
                      <rect
                        x={asset.x - (selectedStadium === 'bills' ? 10 : 15)}
                        y={asset.y - asset.size / 2}
                        width={selectedStadium === 'bills' ? 20 : 30}
                        height={asset.size}
                        fill={color}
                        opacity="0.5"
                        stroke={color}
                        strokeWidth="2"
                        rx="4"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredAsset(asset)}
                        onMouseLeave={() => setHoveredAsset(null)}
                        onClick={() => setSelectedAsset(asset)}
                      />
                    )}
                    
                    {(asset.type === 'backboard' || asset.type === 'goalpost' || asset.type === 'endzone') && (
                      <rect
                        x={asset.x - asset.size / 2}
                        y={asset.y - 15}
                        width={asset.size}
                        height={30}
                        fill={color}
                        opacity="0.5"
                        stroke={color}
                        strokeWidth="2"
                        rx="4"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredAsset(asset)}
                        onMouseLeave={() => setHoveredAsset(null)}
                        onClick={() => setSelectedAsset(asset)}
                      />
                    )}
                    
                    {(asset.type === 'table' || asset.type === 'tunnel' || asset.type === 'club') && (
                      <rect
                        x={asset.x - 25}
                        y={asset.y - 25}
                        width="50"
                        height="50"
                        fill={color}
                        opacity="0.5"
                        stroke={color}
                        strokeWidth="2"
                        rx="6"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredAsset(asset)}
                        onMouseLeave={() => setHoveredAsset(null)}
                        onClick={() => setSelectedAsset(asset)}
                      />
                    )}
                    
                    {(isHovered || isSelected) && (
                      <g>
                        <rect
                          x={asset.x - 90}
                          y={asset.y - 60}
                          width="180"
                          height="40"
                          fill="#171717"
                          stroke={color}
                          strokeWidth="2"
                          rx="6"
                        />
                        <text
                          x={asset.x}
                          y={asset.y - 42}
                          textAnchor="middle"
                          fill="#fafafa"
                          fontSize="13"
                          fontWeight="600"
                        >
                          {asset.name}
                        </text>
                        <text
                          x={asset.x}
                          y={asset.y - 26}
                          textAnchor="middle"
                          fill={color}
                          fontSize="12"
                        >
                          ${(asset.price / 1000000).toFixed(1)}M · {asset.visibility}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {selectedAsset ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-premium rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{selectedAsset.name}</h3>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-platinum-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-platinum-500 text-sm mb-1">Annual Value</div>
                  <div className="text-2xl font-bold text-champagne-500">
                    ${(selectedAsset.price / 1000000).toFixed(1)}M
                  </div>
                </div>
                
                <div>
                  <div className="text-platinum-500 text-sm mb-1">Visibility</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedAsset.visibility === 'Very High' ? 'bg-champagne-500/10 text-champagne-500' :
                    selectedAsset.visibility === 'High' ? 'bg-pearl-500/10 text-pearl-400' :
                    'bg-platinum-500/10 text-platinum-400'
                  }`}>
                    {selectedAsset.visibility}
                  </div>
                </div>

                <div>
                  <div className="text-platinum-500 text-sm mb-1">Primary Objective</div>
                  <div className="text-white">{selectedAsset.objective}</div>
                </div>

                <div>
                  <div className="text-platinum-500 text-sm mb-2">Best Fit Brands</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedAsset.fitBrands.map(brand => (
                      <span key={brand} className="px-2 py-1 bg-noir-900 text-platinum-300 text-xs rounded">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-champagne-500/20">
                  <div className="text-platinum-500 text-sm mb-2">Market Context</div>
                  <p className="text-sm text-platinum-300 leading-relaxed">
                    {stadiumInfo.market}. {stadiumInfo.demographics}.
                  </p>
                </div>

                <button className="w-full bg-gradient-champagne text-noir-900 font-bold py-3 rounded-lg hover:glow-subtle transition-all">
                  Request Detailed Forecast
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="card-premium rounded-xl p-5 text-center">
              <div className="text-4xl mb-3">{selectedStadium === 'mavericks' ? '🏀' : '🏈'}</div>
              <p className="text-platinum-400 text-sm">Click on any asset to view forecasted impact</p>
            </div>
          )}
          
          <div className="card-premium rounded-xl p-5 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Available Assets</h3>
            <div className="space-y-2">
              {currentAssets.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedAsset?.id === asset.id
                      ? 'bg-champagne-500/10 border border-champagne-500/30'
                      : 'bg-noir-900 hover:bg-noir-800 border border-noir-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{asset.name}</div>
                      <div className="text-platinum-600 text-xs">{asset.visibility}</div>
                    </div>
                    <div className="text-champagne-500 font-bold text-sm">
                      ${(asset.price / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-premium rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold text-white mb-4">Partnership Opportunity Analysis</h3>
        <p className="text-platinum-300 leading-relaxed">{stadiumInfo.sponsorOpportunity}</p>
      </div>
    </div>
  );
}
