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
];
