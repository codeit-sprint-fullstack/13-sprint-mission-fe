"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "@/app/api/config";
import { User } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
  register: (
    nickname: string,
    email: string,
    password: string,
  ) => Promise<void>;
  isInitialized: boolean;
};

type LoginData = {
  userData: User;
  accessToken: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isInitialized, setIsInitialized] =
    useState<AuthContextType["isInitialized"]>(false);

  const getUser = async (): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error(`에러 발생 HTTP: ${res.status}`);
      const data: User = await res.json();
      setUser(data);
      setIsInitialized(true);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      setIsInitialized(true);
    }
  };

  const register = async (
    nickname: string,
    email: User["email"],
    password: string,
  ): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: nickname,
          password,
        }),
      });
      if (!res.ok) throw new Error(`오류 발생 HTTP: ${res.status}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      throw err;
    }
  };

  const login = async (
    email: User["email"],
    password: string,
  ): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(`오류 발생 HTTP: ${res.status}`);
      const data: LoginData = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      await getUser();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      throw err;
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
