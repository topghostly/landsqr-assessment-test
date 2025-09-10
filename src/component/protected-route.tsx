import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import type { ReactNode } from "react";

/** Guards a route: if a user exists, render children; otherwise redirect to login. */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // If authenticated, show the protected content, else navigate to login page
  return user ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
