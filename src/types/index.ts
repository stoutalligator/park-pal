// Bucket List lives on `Park.isFavorite` instead — it's an independent
// wishlist flag, not a lifecycle stage, so a park can be favorited at any
// status (e.g. favorited AND planned) rather than one excluding the other.
export type ParkStatus = 'visited' | 'planned' | 'notVisited';

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
  status: ParkStatus;
  isFavorite: boolean;
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
  | 'Sunrise'
  | 'Sunset'
  | 'Other';

export interface TripTrailEntry {
  trailId?: string;
  name: string;
  miles: number;
  elevationGainFt: number;
  dayNumber?: number;
}

export type TripType = 'planned' | 'logged';

export type WeatherType = 'Sunny' | 'PartlyCloudy' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Snowy';

export interface TripDayActivity {
  activity: ActivityType;
  viewpoint?: string;
}

// One entry per calendar day of a trip — the day-by-day breakdown of what
// happened (or, for a planned trip, what's hoped for) where and when.
// `date` is always derived from `trip.startDate + (dayNumber - 1)`, never
// stored directly, so editing a trip's dates can't leave it out of sync.
export interface TripDayEntry {
  dayNumber: number;
  date: string;
  activities: TripDayActivity[];
  trailsHiked: TripTrailEntry[];
  wildlifeSightings: string[];
  weather?: WeatherType;
}

export interface Trip {
  id: string;
  parkId: string;
  tripType: TripType;
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
  /** Per-day breakdown — only present for trips saved through the day-by-day
   * flow. Absent/empty for older trips, which fall back to the flat fields
   * above for display. */
  days?: TripDayEntry[];
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

export type BadgeCategory = 'parks' | 'activity' | 'region' | 'memory' | 'special' | 'distance' | 'secret';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  goal?: number;
  /** Secret badges show as "???" in the Collection screen until earned. */
  secret?: boolean;
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
  | 'winter-activity'
  | 'channel-islands-fox';

export type Units = 'mi' | 'km';

export interface UserProfile {
  name: string;
  explorerStyle?: ExplorerStyle;
  goal?: ExplorerGoal;
  onboardingComplete: boolean;
  profileBackground: ProfileBackground;
  avatar: ProfileAvatar;
  units: Units;
}
