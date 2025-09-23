type CacheEnvelope<T> = { at: number; ttl: number; data: T };

export function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { at, ttl, data } = JSON.parse(raw) as CacheEnvelope<T>;
    if (typeof at !== "number" || typeof ttl !== "number") return null;
    if (Date.now() - at > ttl) return null;
    return data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T, ttlMs: number) {
  if (typeof window === "undefined") return;
  try {
    const env: CacheEnvelope<T> = {
      at: Date.now(),
      ttl: ttlMs,
      data,
    };
    localStorage.setItem(key, JSON.stringify(env));
  } catch {}
}

export function clearCache(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
