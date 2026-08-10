"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
