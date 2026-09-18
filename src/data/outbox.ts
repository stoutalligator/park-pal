import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OutboxOp } from '@/data/outboxCore';

// Changes made while offline (or that the server hasn't accepted yet), kept
// on the device until they've been sent. Scoped per user, and — like the
// queue of unsynced new trips — deliberately NOT cleared on sign-out, so a
// change isn't lost just because the session ended before it synced.

function outboxKey(userId: string): string {
  return `parkpal.outbox.${userId}`;
}

export async function loadOutbox(userId: string): Promise<OutboxOp[]> {
  try {
    const raw = await AsyncStorage.getItem(outboxKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OutboxOp[]) : [];
  } catch {
    return [];
  }
}

export async function saveOutbox(userId: string, ops: OutboxOp[]): Promise<void> {
  try {
    await AsyncStorage.setItem(outboxKey(userId), JSON.stringify(ops));
  } catch (error) {
    console.error('Failed to save the offline outbox:', error);
  }
}

export async function clearOutbox(userId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(outboxKey(userId));
  } catch (error) {
    console.error('Failed to clear the offline outbox:', error);
  }
}
