import { useEffect, useState } from "react";
import type { UserDetailsProp } from "../types/user";
import { getUsersSimple } from "../lib/get-user-data";

export function useUsers() {
  const [data, setData] = useState<UserDetailsProp[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    setLoading(true);
    getUsersSimple()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, isLoading: loading, isError: !!error, error };
}
