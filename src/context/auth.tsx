// import type{ AuthContextType } from "../types/auth";
// import { useNavigate } from "react-router-dom";
// import React, { createContext, useState, useEffect } from "react";

// // https://0627d7d3768d4419bdb070a30becdd05.api.mockbin.io/
// const AUTH_KEY = "auth_data"; // Key for localStorage
// const EXPIRATION_TIME = 10 * 60 * 1000; // Expires in 10 mins

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

// const navigate = useNavigate();

//   // Check login status on load
//   useEffect(() => {
//     const storedAuth = localStorage.getItem(AUTH_KEY);
//     if (storedAuth) {
//       const { isLoggedIn, expiresAt } = JSON.parse(storedAuth);
//       console.log("Context log" + isLoggedIn);
//       if (new Date().getTime() < expiresAt) {
//         setIsLoggedIn(isLoggedIn);
//       } else {
//         localStorage.removeItem(AUTH_KEY);
//       }
//     }
//   }, []);

//   // Login function
//   const login = () => {
//     const expiresAt = new Date().getTime() + EXPIRATION_TIME;
//     localStorage.setItem(
//       AUTH_KEY,
//       JSON.stringify({ isLoggedIn: true, expiresAt })
//     );
//     setIsLoggedIn(true);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem(AUTH_KEY);
//     navigate("/auth/");
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, AuthContextType, AuthProviderProps } from "../types/auth";

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
