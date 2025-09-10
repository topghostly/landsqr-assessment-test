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
      .then(setData) // Set the data gotten from getUsersSimple
      .catch(setError) // Catches any error and set it to the error
      .finally(() => setLoading(false));
  }, []);

  // Return users details and fetch states
  return { data, isLoading: loading, isError: !!error, error };
}
