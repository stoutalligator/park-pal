import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/types';

// Scoped per-user so a different account logging in on the same device never
// inherits another account's queued-but-unsynced trips.
function pendingTripsKey(userId: string): string {
  return `parkpal.pendingTrips.${userId}`;
}

export async function loadPendingTrips(userId: string): Promise<Trip[]> {
  const raw = await AsyncStorage.getItem(pendingTripsKey(userId));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Trip[];
  } catch {
    return [];
  }
}

export async function savePendingTrips(userId: string, trips: Trip[]): Promise<void> {
  await AsyncStorage.setItem(pendingTripsKey(userId), JSON.stringify(trips));
}
