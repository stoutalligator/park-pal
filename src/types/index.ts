export type ParkStatus = 'visited' | 'bucketList' | 'planned' | 'notVisited';

export type ParkRegion =
  | 'Northeast'
  | 'Southeast'
  | 'Midwest'
  | 'SouthCentral'
  | 'Mountain'
  | 'Pacific'
  | 'Alaska'
  | 'Hawaii';

export interface Park {
  id: string;
  name: string;
  state: string;
  region: ParkRegion;
  description: string;
  establishedYear: number;
  acres: number;
  image: string;
  status: ParkStatus;
  isFavorite: boolean;
  visitedDates?: string[];
  /** Approximate latitude/longitude of the park, used to place its pin on the Explore map. */
  lat: number;
  lng: number;
}

export type ActivityType =
  | 'Hiking'
  | 'Camping'
  | 'Wildlife'
  | 'Kayaking'
  | 'Scenic Drive'
  | 'Photography'
  | 'Stargazing'
  | 'Other';

export interface TripTrailEntry {
  trailId?: string;
  name: string;
  miles: number;
  elevationGainFt: number;
}

export interface Trip {
  id: string;
  parkId: string;
  startDate: string;
  endDate: string;
  activities: ActivityType[];
  notes: string;
  photos: string[];
  weather?: string;
  favoriteTrail?: string;
  wildlifeSightings?: string[];
  trailsHiked?: TripTrailEntry[];
  rating?: number;
  milesHiked?: number;
  elevationGainFt?: number;
}

export type TrailDifficulty = 'Easy' | 'Moderate' | 'Hard';

export interface Trail {
  id: string;
  parkId: string;
  name: string;
  description: string;
  miles: number;
  elevationGainFt: number;
  difficulty: TrailDifficulty;
}

export type AnimalRarity = 'Common' | 'Uncommon' | 'Rare';

export interface Animal {
  id: string;
  parkId: string;
  name: string;
  description: string;
  rarity: AnimalRarity;
}

export type BadgeCategory = 'parks' | 'activity' | 'region' | 'memory' | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  goal?: number;
}

export interface UserStats {
  totalVisited: number;
  totalRemaining: number;
  bucketListCount: number;
  completionPercentage: number;
  totalTrips: number;
  totalPhotos: number;
  totalMilesHiked: number;
  totalElevationGain: number;
  statesVisited: number;
  favoriteActivity: string;
}

export type ExplorerStyle =
  | 'Casual Explorer'
  | 'Road Tripper'
  | 'Hiker'
  | 'Photographer'
  | 'Camper'
  | 'Completionist';

export type ExplorerGoal =
  | 'Visit 5 parks this year'
  | 'Complete one region'
  | 'Track past trips'
  | 'Visit all 63 National Parks';

export type ProfileBackground = 'mountain-lake' | 'forest' | 'arches' | 'mountain-gate' | 'night-camping';

export type ProfileAvatar =
  | 'hiking'
  | 'camping'
  | 'wildlife-viewing'
  | 'kayaking'
  | 'scenic-drive'
  | 'photography'
  | 'backpacking'
  | 'stargazing'
  | 'fishing'
  | 'horseback-riding'
  | 'nature-walk'
  | 'waterfall-hike'
  | 'picnic'
  | 'rock-climbing'
  | 'winter-activity';

export interface UserProfile {
  name: string;
  explorerStyle?: ExplorerStyle;
  goal?: ExplorerGoal;
  onboardingComplete: boolean;
  profileBackground: ProfileBackground;
  avatar: ProfileAvatar;
}
