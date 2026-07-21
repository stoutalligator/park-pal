import { Badge } from '@/types';

export const ALL_BADGES: Badge[] = [
  { id: 'first-park', name: 'First Steps', description: 'Log your very first national park visit.', category: 'parks', earned: false, progress: 0, goal: 1 },
  { id: 'parks-5', name: 'Park Hopper', description: 'Visit 5 national parks.', category: 'parks', earned: false, progress: 0, goal: 5 },
  { id: 'parks-10', name: 'Trail Seeker', description: 'Visit 10 national parks.', category: 'parks', earned: false, progress: 0, goal: 10 },
  { id: 'parks-25', name: 'Ranger in Training', description: 'Visit 25 national parks.', category: 'parks', earned: false, progress: 0, goal: 25 },
  { id: 'parks-50', name: 'Park Legend', description: 'Visit 50 national parks.', category: 'parks', earned: false, progress: 0, goal: 50 },
  { id: 'parks-all', name: 'Ultimate Ranger', description: 'Visit all 63 national parks.', category: 'parks', earned: false, progress: 0, goal: 63 },
  { id: 'hiker', name: 'Trail Blazer', description: 'Log a hike in 5 different parks.', category: 'activity', earned: false, progress: 0, goal: 5 },
  { id: 'camper', name: 'Night Under Stars', description: 'Camp in a national park.', category: 'activity', earned: false, progress: 0, goal: 1 },
  { id: 'wildlife', name: 'Wildlife Spotter', description: 'Spot wildlife in 3 different parks.', category: 'activity', earned: false, progress: 0, goal: 3 },
  { id: 'photographer', name: 'Nature Lens', description: 'Add photos to 5 trips.', category: 'activity', earned: false, progress: 0, goal: 5 },
  { id: 'sunrise', name: 'Sunrise Chaser', description: 'Watch sunrise in 5 parks.', category: 'activity', earned: false, progress: 0, goal: 5 },
  { id: 'road-tripper', name: 'Road Tripper', description: 'Complete a scenic drive in 3 parks.', category: 'activity', earned: false, progress: 0, goal: 3 },
  { id: 'mountain-region', name: 'Mountain Lover', description: 'Visit 5 Mountain region parks.', category: 'region', earned: false, progress: 0, goal: 5 },
  { id: 'northeast-region', name: 'New England Explorer', description: 'Visit all Northeast parks.', category: 'region', earned: false, progress: 0, goal: 3 },
  { id: 'utah-five', name: 'Mighty Five', description: 'Visit all 5 Utah national parks.', category: 'region', earned: false, progress: 0, goal: 5 },
  { id: 'coastal', name: 'Coastal Explorer', description: 'Visit 3 coastal national parks.', category: 'region', earned: false, progress: 0, goal: 3 },
  { id: 'memory-keeper', name: 'Memory Keeper', description: 'Write notes on 5 trips.', category: 'memory', earned: false, progress: 0, goal: 5 },
  { id: 'adventure-awaits', name: 'Adventure Awaits', description: 'Add 5 parks to your bucket list.', category: 'special', earned: false, progress: 0, goal: 5 },

  // Miles Tracked — incremental, total miles hiked across all trips
  { id: 'miles-25', name: 'First Steps Forward', description: 'Hike 25 total miles.', category: 'distance', earned: false, progress: 0, goal: 25 },
  { id: 'miles-100', name: 'Century Hiker', description: 'Hike 100 total miles.', category: 'distance', earned: false, progress: 0, goal: 100 },
  { id: 'miles-250', name: 'Long Hauler', description: 'Hike 250 total miles.', category: 'distance', earned: false, progress: 0, goal: 250 },
  { id: 'miles-500', name: 'Distance Master', description: 'Hike 500 total miles.', category: 'distance', earned: false, progress: 0, goal: 500 },
  { id: 'miles-1000', name: 'Thousand Mile Club', description: 'Hike 1,000 total miles.', category: 'distance', earned: false, progress: 0, goal: 1000 },

  // Elevation Gained — incremental, total elevation gain (ft) across all trips
  { id: 'elevation-1000', name: 'Uphill Climber', description: 'Gain 1,000 ft of elevation.', category: 'distance', earned: false, progress: 0, goal: 1000 },
  { id: 'elevation-5000', name: 'Peak Seeker', description: 'Gain 5,000 ft of elevation.', category: 'distance', earned: false, progress: 0, goal: 5000 },
  { id: 'elevation-15000', name: 'Summit Chaser', description: 'Gain 15,000 ft of elevation.', category: 'distance', earned: false, progress: 0, goal: 15000 },
  { id: 'elevation-30000', name: 'High Altitude Hero', description: 'Gain 30,000 ft of elevation.', category: 'distance', earned: false, progress: 0, goal: 30000 },
  { id: 'elevation-60000', name: 'Sky Conqueror', description: 'Gain 60,000 ft of elevation.', category: 'distance', earned: false, progress: 0, goal: 60000 },

  // Animal/trail specific — earned by spotting a specific animal or completing a specific trail
  { id: 'channel-islands-fox', name: 'Island Fox Friend', description: 'Spot the Island Fox at Channel Islands.', category: 'special', earned: false, progress: 0, goal: 1 },
  { id: 'near-death', name: 'Near Death', description: 'Complete the Angels Landing trail at Zion.', category: 'special', earned: false, progress: 0, goal: 1 },

  // Secret badges — placeholders to prove out the mechanic; description stays
  // hidden until earned (see CollectionScreen). Swap these out as you like.
  { id: 'night-owl', name: 'Night Owl', description: 'Camp and stargaze on the same trip.', category: 'secret', earned: false, progress: 0, goal: 1, secret: true },
  { id: 'globe-trotter', name: 'Globe Trotter', description: 'Visit a park in Alaska and a park in Hawaii.', category: 'secret', earned: false, progress: 0, goal: 1, secret: true },
  { id: 'perfect-trip', name: 'Perfect Trip', description: 'Log a 5-star trip with both notes and photos.', category: 'secret', earned: false, progress: 0, goal: 1, secret: true },
];
