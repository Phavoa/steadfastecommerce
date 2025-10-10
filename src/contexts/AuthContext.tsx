"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  city?: string;
  state?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Mock auth
  const user = null;
  const isAuthenticated = false;
  const getToken = () => null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
