import type { UserDetailsProp } from "../types/user";

type CacheEnvelope = { at: number; ttl: number; data: UserDetailsProp[] };

export function getCache<T>(key: string): UserDetailsProp[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { at, ttl, data } = JSON.parse(raw) as CacheEnvelope;
    if (typeof at !== "number" || typeof ttl !== "number") return null;
    if (Date.now() - at > ttl) return null;
    return data;
  } catch {
    return null;
  }
}

export function setCache<T>(
  key: string,
  data: UserDetailsProp[],
  ttlMs: number
) {
  if (typeof window === "undefined") return;
  try {
    const env: CacheEnvelope = {
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
