"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <AuthContext.Provider value={{ isOpen, setIsOpen, authMode, setAuthMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
