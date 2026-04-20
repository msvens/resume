'use client';

let storageAvailableCache: boolean | null = null;

export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  if (storageAvailableCache != null) return storageAvailableCache;

  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    storageAvailableCache = true;
  } catch {
    storageAvailableCache = false;
  }
  return storageAvailableCache;
}

export function safeGetItem(key: string): string | null {
  if (!isStorageAvailable()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Quota exceeded or blocked
  }
}
