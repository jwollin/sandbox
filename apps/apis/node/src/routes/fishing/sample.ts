type LakeData = {
  id: string;

  name: string;

  location: {
    lat: number;
    lon: number;
    state?: string;
  };

  depth?: {
    max: number;
    avg?: number;
  };

  water: {
    clarity?: number; // secchi depth or similar
    temperature?: number;
    qualityRating?: number;
  };

  fish: {
    species: string[];
  };

  habitat?: {
    weedCoverage?: 'low' | 'medium' | 'high';
    structure?: string[]; // rocks, dropoffs, sandbars, etc
  };

  access?: {
    publicLaunch: boolean;
    docks?: number;
    notes?: string;
  };

  seasonal?: {
    iceCoveredMonths?: string[];
    bestSeasons?: string[];
  };
};

export const SAMPLE_LAKE = {
  id: 'mn-00123',
  name: 'Lake Minnetonka',
  location: {
    lat: 44.9417,
    long: -93.4767,
    state: 'MN',
  },
  depth: {
    max: 113,
    avg: 30,
  },
  water: {
    clarity: 8.5,
    temperature: 68,
    qualityRating: 4,
  },
  fish: {
    species: ['largemouth bass', 'walleye', 'northern pike', 'crappie'],
  },
  habitat: {
    weedCoverage: 'medium',
    structure: ['rocky points', 'weed beds', 'dropoffs'],
  },
  access: {
    publicLaunch: true,
    docks: 15,
    notes: 'Busy lake, multiple access points',
  },
  seasonal: {
    iceCoveredMonths: ['Dec', 'Jan', 'Feb', 'Mar'],
    bestSeasons: ['spring', 'fall'],
  },
};
