import type { UserDetailsProp } from "../types/user";
import { getCache, setCache } from "./local-cache";

const API_URL = "https://d1d329a8d46e45b99259e62beb312e3c.api.mockbin.io/";
const CACHE_KEY = "lendsqr:users:v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // Tine to live set to 10 minutes

// Fetch users with local caching, fallback to API if cache has expired
export async function getUsersSimple() {
  // Try cache first
  const cached = getCache<UserDetailsProp[]>(CACHE_KEY);
  if (cached) return cached;

  // Fetch fresh data
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Users fetch failed: ${res.status}`);
  const data = (await res.json()) as unknown;

  // Validate data
  if (!Array.isArray(data))
    throw new Error("Invalid responce data: expected array");

  // Cache responce and return
  setCache<UserDetailsProp[]>(
    CACHE_KEY,
    data as UserDetailsProp[],
    CACHE_TTL_MS
  );
  return data as UserDetailsProp[];
}
