// STADIUM ASSET LIBRARY
// Real performance data from Bills & Mavericks venues
// Built by stargirl | CAA | January 2026

export const PLACEMENT_COORDINATES = {
  // Court/Field Assets
  'Floor Court Logo': { x: 50, y: 50, type: 'court', icon: '◉' },
  'Baseline Apron Signage': { x: 50, y: 85, type: 'court', icon: '▬' },
  'Courtside Signage': { x: 20, y: 50, type: 'court', icon: '▮' },
  'Apron Signage': { x: 50, y: 80, type: 'court', icon: '▬' },
  
  // Structural Assets
  'Basket Stanchion': { x: 50, y: 15, type: 'structure', icon: '⬢' },
  'Pole Pad - Front': { x: 50, y: 20, type: 'structure', icon: '▭' },
  'Pole Pad - Side': { x: 35, y: 20, type: 'structure', icon: '▭' },
  'Shot Clock': { x: 50, y: 10, type: 'structure', icon: '⏱' },
  'Basket LED': { x: 50, y: 12, type: 'structure', icon: '◈' },
  'Vomitories': { x: 10, y: 30, type: 'structure', icon: '▣' },
  
  // Signage Assets
  'LED/Fascia': { x: 50, y: 5, type: 'signage', icon: '▂' },
  'Billboards': { x: 5, y: 50, type: 'signage', icon: '▯' },
  'Exterior Stadium Signage': { x: 2, y: 50, type: 'signage', icon: '▯' },
  'Jumbotron': { x: 50, y: 3, type: 'signage', icon: '▢' },
  'Tunnel Signage': { x: 90, y: 50, type: 'signage', icon: '▯' },
  
  // Apparel & Equipment
  'Uniform': { x: 70, y: 50, type: 'apparel', icon: '👕' },
  'Helmet': { x: 72, y: 45, type: 'apparel', icon: '⬡' },
  'Sideline Personnel': { x: 80, y: 60, type: 'apparel', icon: '👤' },
  'Sideline Equipment': { x: 85, y: 55, type: 'equipment', icon: '▦' },
  
  // Branded Items
  'Coolers': { x: 88, y: 70, type: 'branded', icon: '▢' },
  'Towels': { x: 86, y: 68, type: 'branded', icon: '▭' },
  'Bottles/Cups': { x: 87, y: 72, type: 'branded', icon: '▢' },
  
  // Media & Digital
  'Broadcast Graphic': { x: 15, y: 8, type: 'media', icon: '📺' },
  'Social Branded Content': { x: 12, y: 12, type: 'media', icon: '📱' },
  'Activation': { x: 25, y: 90, type: 'media', icon: '⚡' },
  'Press Mic': { x: 20, y: 15, type: 'media', icon: '🎤' },
  'Press Backdrop': { x: 18, y: 18, type: 'media', icon: '▮' },
  'Press Desk': { x: 22, y: 15, type: 'media', icon: '▬' }
};

export const ASSET_CATEGORIES = {
  court: {
    name: 'Court/Field Assets',
    color: '#0ea5e9',
    description: 'Primary playing surface integrations'
  },
  structure: {
    name: 'Structural Elements',
    color: '#d946ef',
    description: 'Stadium infrastructure and equipment'
  },
  signage: {
    name: 'Signage & Displays',
    color: '#10b981',
    description: 'Fixed and digital signage placements'
  },
  apparel: {
    name: 'Apparel & Uniforms',
    color: '#f59e0b',
    description: 'Player and personnel branding'
  },
  equipment: {
    name: 'Equipment',
    color: '#8b5cf6',
    description: 'Sideline and support equipment'
  },
  branded: {
    name: 'Branded Items',
    color: '#ec4899',
    description: 'Consumer touchpoint products'
  },
  media: {
    name: 'Media & Digital',
    color: '#06b6d4',
    description: 'Broadcast and social integrations'
  }
};

export const getAssetPerformanceTier = (mvpPercent) => {
  if (mvpPercent >= 30) return { tier: 'elite', color: '#10b981', label: 'Elite' };
  if (mvpPercent >= 20) return { tier: 'high', color: '#0ea5e9', label: 'High Performing' };
  if (mvpPercent >= 10) return { tier: 'standard', color: '#f59e0b', label: 'Standard' };
  return { tier: 'emerging', color: '#6b7280', label: 'Emerging' };
};

export const formatCurrency = (value) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

export const formatNumber = (num) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

// Calculate ROI efficiency score
export const calculateROI = (asset) => {
  const impressionValue = asset.impressions / 1000;
  const engagementValue = asset.engagements * 5;
  const durationValue = asset.duration / 60;
  
  const totalValue = impressionValue + engagementValue + durationValue;
  return totalValue > 0 ? (asset.mediaValue / totalValue) : 0;
};

// Aggregate placement type performance
export const aggregatePlacementMetrics = (assets, placementType) => {
  const filtered = assets.filter(a => a.placement === placementType);
  
  if (filtered.length === 0) return null;
  
  return {
    count: filtered.length,
    totalValue: filtered.reduce((sum, a) => sum + a.mediaValue, 0),
    avgValue: filtered.reduce((sum, a) => sum + a.mediaValue, 0) / filtered.length,
    avgMVP: filtered.reduce((sum, a) => sum + a.mvpPercent, 0) / filtered.length,
    totalImpressions: filtered.reduce((sum, a) => sum + a.impressions, 0),
    totalEngagements: filtered.reduce((sum, a) => sum + a.engagements, 0),
    topSponsors: filtered
      .sort((a, b) => b.mediaValue - a.mediaValue)
      .slice(0, 3)
      .map(a => ({ sponsor: a.sponsor, value: a.mediaValue }))
  };
};
