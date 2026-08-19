"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getMe } from "../api/userApi";
import type { User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "accessToken";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await getMe(token);
      setUser(data);
      setLoading(false);
    }
    loadUser();
  }, []);

  function login(token: string, userData: User) {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, login, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider 안에서 사용해야 합니다.");
  return ctx;
}
