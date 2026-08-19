"use client";

import { userService } from "@/services/userService";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

const AuthContext = createContext({
  user: null as User | null,
  isInitialized: false,
  login: (token: string) => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getUser = async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (!token) {
      setUser(null);
      setIsInitialized(true);
      return;
    }

    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("유저 정보 로드 실패", error);
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  function login(token: string) {
    localStorage.setItem("accessToken", token);
    getUser();
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
  }

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
