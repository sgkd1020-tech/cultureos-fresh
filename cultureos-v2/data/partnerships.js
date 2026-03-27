// PARTNERSHIP CONFIGURATION
// Comprehensive sponsorship types with realistic activation budgets
// Built by stargirl | CAA | January 2026

export const PARTNERSHIP_TYPES = {
  // Tier 1: Premium Rights (40-50% activation ratio)
  venueNaming: {
    name: 'Venue Naming Rights',
    category: 'Premium Rights',
    avgRightsFee: 15000000,
    activationRatio: { min: 0.4, max: 0.5, typical: 0.45 },
    duration: '10-20 years',
    examples: ['SoFi Stadium', 'Crypto.com Arena', 'Chase Center'],
    description: 'Exclusive naming rights to stadium or arena'
  },
  titleSponsor: {
    name: 'League/Event Title Sponsorship',
    category: 'Premium Rights',
    avgRightsFee: 8000000,
    activationRatio: { min: 0.35, max: 0.45, typical: 0.4 },
    duration: '3-5 years',
    examples: ['NBA Finals presented by YouTube TV', 'FedEx Cup'],
    description: 'Title sponsorship of major league or event property'
  },

  // Tier 2: High-Visibility Assets (30-40% activation ratio)
  jerseyPatch: {
    name: 'Jersey/Uniform Patch',
    category: 'High Visibility',
    avgRightsFee: 12000000,
    activationRatio: { min: 0.3, max: 0.4, typical: 0.35 },
    duration: '3-5 years',
    examples: ['Chime on Mavericks', 'Motorola on Bulls'],
    description: 'Logo placement on player uniforms'
  },
  helmetDecal: {
    name: 'Helmet Decal',
    category: 'High Visibility',
    avgRightsFee: 5000000,
    activationRatio: { min: 0.25, max: 0.35, typical: 0.3 },
    duration: '3-5 years',
    examples: ['Nike swoosh', 'Oakley visor'],
    description: 'Logo on helmets for football/hockey'
  },
  practiceJersey: {
    name: 'Practice Jersey/Apparel',
    category: 'High Visibility',
    avgRightsFee: 3000000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '2-4 years',
    examples: ['Training gear sponsors'],
    description: 'Branding on practice and training apparel'
  },

  // Tier 3: Premium Signage (25-35% activation ratio)
  courtFloorLogo: {
    name: 'Court/Field Floor Logo',
    category: 'Premium Signage',
    avgRightsFee: 4000000,
    activationRatio: { min: 0.25, max: 0.35, typical: 0.3 },
    duration: '3-5 years',
    examples: ['American Airlines center court'],
    description: 'Logo at center court or midfield'
  },
  baselineSignage: {
    name: 'Baseline/Sideline Signage',
    category: 'Premium Signage',
    avgRightsFee: 2500000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '2-4 years',
    examples: ['Michelob Ultra baseline'],
    description: 'Fixed signage along playing surface'
  },
  ledFascia: {
    name: 'LED Ribbon/Fascia',
    category: 'Premium Signage',
    avgRightsFee: 2000000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '3-5 years',
    examples: ['Rotating LED board sponsors'],
    description: 'Digital rotating signage around venue'
  },
  basketStanchion: {
    name: 'Basket Stanchion/Goal Post',
    category: 'Premium Signage',
    avgRightsFee: 3000000,
    activationRatio: { min: 0.25, max: 0.3, typical: 0.28 },
    duration: '3-5 years',
    examples: ['State Farm basket stanchion'],
    description: 'Branding on basketball stanchions or goal posts'
  },

  // Tier 4: Standard Signage (20-25% activation ratio)
  courtsideSignage: {
    name: 'Courtside Signage',
    category: 'Standard Signage',
    avgRightsFee: 1500000,
    activationRatio: { min: 0.2, max: 0.25, typical: 0.22 },
    duration: '2-3 years',
    examples: ['Multiple courtside board sponsors'],
    description: 'Fixed signage at courtside'
  },
  shotClock: {
    name: 'Shot Clock/Game Clock',
    category: 'Standard Signage',
    avgRightsFee: 1800000,
    activationRatio: { min: 0.2, max: 0.25, typical: 0.22 },
    duration: '3-5 years',
    examples: ['Tissot shot clock'],
    description: 'Sponsored game timing equipment'
  },
  jumbotron: {
    name: 'Jumbotron Integration',
    category: 'Standard Signage',
    avgRightsFee: 2500000,
    activationRatio: { min: 0.25, max: 0.3, typical: 0.27 },
    duration: '3-5 years',
    examples: ['Replay sponsor, score bug sponsor'],
    description: 'Branded features on main scoreboard'
  },

  // Tier 5: Broadcast/Media (20-30% activation ratio)
  broadcastIntegration: {
    name: 'Broadcast Integration',
    category: 'Broadcast/Media',
    avgRightsFee: 3500000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '2-4 years',
    examples: ['Starting lineups presented by X', 'Halftime report by Y'],
    description: 'Branded broadcast segments and features'
  },
  streamingIntegration: {
    name: 'Streaming Platform Integration',
    category: 'Broadcast/Media',
    avgRightsFee: 2500000,
    activationRatio: { min: 0.2, max: 0.28, typical: 0.24 },
    duration: '2-3 years',
    examples: ['Watch party sponsor', 'Multi-view sponsor'],
    description: 'Digital streaming features and integrations'
  },
  graphicPackage: {
    name: 'Broadcast Graphic Package',
    category: 'Broadcast/Media',
    avgRightsFee: 1200000,
    activationRatio: { min: 0.18, max: 0.25, typical: 0.21 },
    duration: '2-3 years',
    examples: ['Score bug, stat graphics'],
    description: 'Branded broadcast graphics and overlays'
  },

  // Tier 6: Digital/Social (15-25% activation ratio)
  socialContentSeries: {
    name: 'Social Content Series',
    category: 'Digital/Social',
    avgRightsFee: 1500000,
    activationRatio: { min: 0.15, max: 0.25, typical: 0.2 },
    duration: '1-2 years',
    examples: ['Behind-the-scenes series', 'Player features'],
    description: 'Sponsored social media content series'
  },
  digitalExperience: {
    name: 'Digital Fan Experience',
    category: 'Digital/Social',
    avgRightsFee: 2000000,
    activationRatio: { min: 0.18, max: 0.25, typical: 0.22 },
    duration: '2-3 years',
    examples: ['AR filters', 'Mobile app features'],
    description: 'Branded digital fan engagement tools'
  },
  metaverseActivation: {
    name: 'Metaverse/Gaming Activation',
    category: 'Digital/Social',
    avgRightsFee: 1800000,
    activationRatio: { min: 0.2, max: 0.28, typical: 0.24 },
    duration: '2-3 years',
    examples: ['Fortnite integrations', 'Virtual venue'],
    description: 'Gaming and virtual world integrations'
  },

  // Tier 7: Experiential (25-35% activation ratio)
  fanZone: {
    name: 'Fan Zone/Experience Area',
    category: 'Experiential',
    avgRightsFee: 2000000,
    activationRatio: { min: 0.25, max: 0.35, typical: 0.3 },
    duration: '3-5 years',
    examples: ['Pre-game plaza', 'Interactive exhibits'],
    description: 'Branded physical fan experience zones'
  },
  hospitalitySuite: {
    name: 'Hospitality Suite',
    category: 'Experiential',
    avgRightsFee: 1500000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '3-5 years',
    examples: ['Club lounges', 'VIP areas'],
    description: 'Branded premium hospitality spaces'
  },
  concourseActivation: {
    name: 'Concourse Activation',
    category: 'Experiential',
    avgRightsFee: 800000,
    activationRatio: { min: 0.25, max: 0.35, typical: 0.3 },
    duration: '1-3 years',
    examples: ['Product sampling', 'Interactive booths'],
    description: 'Event-day activations in venue concourses'
  },

  // Tier 8: Endorsement (30-50% activation ratio)
  athleteEndorsement: {
    name: 'Athlete Endorsement',
    category: 'Endorsement',
    avgRightsFee: 5000000,
    activationRatio: { min: 0.3, max: 0.5, typical: 0.4 },
    duration: '2-5 years',
    examples: ['Nike athlete deals', 'Gatorade athletes'],
    description: 'Individual athlete sponsorship and usage rights'
  },
  creatorPartnership: {
    name: 'Creator/Influencer Partnership',
    category: 'Endorsement',
    avgRightsFee: 1000000,
    activationRatio: { min: 0.25, max: 0.4, typical: 0.32 },
    duration: '1-2 years',
    examples: ['MrBeast partnerships', 'Streamer deals'],
    description: 'Creator content and brand integration'
  },

  // Tier 9: Specialized (15-25% activation ratio)
  sustainabilityProgram: {
    name: 'Sustainability Program',
    category: 'Specialized',
    avgRightsFee: 1200000,
    activationRatio: { min: 0.15, max: 0.25, typical: 0.2 },
    duration: '3-5 years',
    examples: ['Green initiatives', 'Carbon neutral programs'],
    description: 'Environmental and sustainability partnerships'
  },
  youthProgram: {
    name: 'Youth Development Program',
    category: 'Specialized',
    avgRightsFee: 800000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '3-5 years',
    examples: ['Basketball camps', 'Educational initiatives'],
    description: 'Sponsored youth sports and education programs'
  },
  diversityInitiative: {
    name: 'Diversity & Inclusion Initiative',
    category: 'Specialized',
    avgRightsFee: 1000000,
    activationRatio: { min: 0.2, max: 0.3, typical: 0.25 },
    duration: '2-4 years',
    examples: ['Community programs', 'Scholarship funds'],
    description: 'DEI-focused partnership programs'
  },

  // Tier 10: Equipment & Products (10-20% activation ratio)
  officialProduct: {
    name: 'Official Product Category',
    category: 'Equipment',
    avgRightsFee: 2000000,
    activationRatio: { min: 0.1, max: 0.2, typical: 0.15 },
    duration: '3-5 years',
    examples: ['Official beverage', 'Official insurance'],
    description: 'Exclusive category sponsorship rights'
  },
  sidelineEquipment: {
    name: 'Sideline Equipment',
    category: 'Equipment',
    avgRightsFee: 500000,
    activationRatio: { min: 0.1, max: 0.18, typical: 0.14 },
    duration: '2-4 years',
    examples: ['Gatorade coolers', 'Microsoft Surface'],
    description: 'Branded equipment used on sidelines'
  }
};

// Calculate activation budget based on rights fee and partnership type
export const calculateActivationBudget = (rightsFee, partnershipType) => {
  const config = PARTNERSHIP_TYPES[partnershipType];
  if (!config) return rightsFee * 0.25; // Default 25% if type unknown

  const ratio = config.activationRatio.typical;
  return rightsFee * ratio;
};

// Get suggested activation budget range
export const getActivationRange = (rightsFee, partnershipType) => {
  const config = PARTNERSHIP_TYPES[partnershipType];
  if (!config) {
    return {
      min: rightsFee * 0.2,
      max: rightsFee * 0.3,
      typical: rightsFee * 0.25
    };
  }

  return {
    min: rightsFee * config.activationRatio.min,
    max: rightsFee * config.activationRatio.max,
    typical: rightsFee * config.activationRatio.typical
  };
};

// Group partnerships by category for UI
export const PARTNERSHIP_CATEGORIES = [
  'Premium Rights',
  'High Visibility',
  'Premium Signage',
  'Standard Signage',
  'Broadcast/Media',
  'Digital/Social',
  'Experiential',
  'Endorsement',
  'Specialized',
  'Equipment'
];

export const getPartnershipsByCategory = (category) => {
  return Object.entries(PARTNERSHIP_TYPES)
    .filter(([_, config]) => config.category === category)
    .map(([key, config]) => ({ id: key, ...config }));
};
