"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import type { User } from "./types";

type SaveAuthPayload = {
  user: User;
  accessToken: string;
};

type AuthContextValue = {
  user: User | null;
  isInitialized: boolean;
  saveAuth: (payload: SaveAuthPayload) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    nickname: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const saveAuth = ({ user, accessToken }: SaveAuthPayload) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const register: AuthContextValue["register"] = async (
    nickname,
    email,
    password,
    passwordConfirm,
  ) => {
    const { user, accessToken } = await authApi.register(
      nickname,
      email,
      password,
      passwordConfirm,
    );
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const login: AuthContextValue["login"] = async (email, password) => {
    const { user, accessToken } = await authApi.login(email, password);
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    const updatedUser = await userApi.updateMe(data);
    setUser(updatedUser);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const init = token
      ? userApi.getMe().then(setUser).catch(() => setUser(null))
      : Promise.resolve();
    init.finally(() => setIsInitialized(true));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isInitialized, saveAuth, login, logout, register, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
