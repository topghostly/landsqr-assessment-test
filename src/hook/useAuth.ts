import { useContext } from "react";
import { AuthContext } from "../context/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuth not inside an AuthProvider, check your placement chief."
    );

  return context;
};
