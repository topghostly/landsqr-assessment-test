import { useMemo } from "react";
import { useUsers } from "./useUser";
import type { UserDetailsProp } from "../types/user";

export function useUserById(id: string | undefined) {
  const { data: users, isLoading, isError, error } = useUsers();

  const user = useMemo<UserDetailsProp | null>(() => {
    if (!users || !id) return null;
    return users.find((u) => u.id === id) ?? null;
  }, [users, id]);

  return { data: user, isLoading, isError, error };
}
