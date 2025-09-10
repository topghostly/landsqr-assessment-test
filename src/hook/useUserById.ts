import { useMemo } from "react";
import { useUsers } from "./useUser";
import type { UserDetailsProp } from "../types/user";

// Custom hook to get a single user by ID
export function useUserById(id: string | undefined) {
  const { data: users, isLoading, isError, error } = useUsers();

  // find user by ID or return null and momorise it to avoid recalculating on re renders
  const user = useMemo<UserDetailsProp | null>(() => {
    if (!users || !id) return null;
    return users.find((u) => u.id === id) ?? null;
  }, [users, id]);

  // Return user details and fetch states
  return { data: user, isLoading, isError, error };
}
