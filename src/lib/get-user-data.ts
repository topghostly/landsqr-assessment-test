import type { UserDetailsProp } from "../types/user";
import { getCache, setCache } from "./local-cache";

const API_URL = "https://0627d7d3768d4419bdb070a30becdd05.api.mockbin.io/";
const CACHE_KEY = "lendsqr:users:v1";
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function getUsersSimple() {
  //     opts?: {
  //   signal?: AbortSignal;
  //   force?: boolean;
  // }
  // if (!opts?.force) {
  //   const cached = getCache<UserDetailsProp[]>(CACHE_KEY);
  //   if (cached) return cached;
  // }
  const cached = getCache<UserDetailsProp[]>(CACHE_KEY);
  if (cached) return cached;

  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Users fetch failed: ${res.status}`);
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("Invalid payload: expected array");

  setCache<UserDetailsProp[]>(
    CACHE_KEY,
    data as UserDetailsProp[],
    CACHE_TTL_MS
  );
  return data as UserDetailsProp[];
}

// export function forceRefreshUsers() {
//   return getUsersSimple({ force: true });
// }
