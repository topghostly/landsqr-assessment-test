import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
