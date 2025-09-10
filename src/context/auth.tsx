import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, AuthContextType, AuthProviderProps } from "../types/auth";

// Auth context for managing user state across the app
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("irater-user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Log in user, save to session and update state
  const login = (userData: User) => {
    sessionStorage.setItem("irater-user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("irater-user");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
