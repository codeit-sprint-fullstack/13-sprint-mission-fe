"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import type { User } from "./types";

type AuthContextValue = {
  user: User | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (
    nickname: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<User>;
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

  const login: AuthContextValue["login"] = async (email, password) => {
    const { accessToken } = await authApi.login(email, password);
    localStorage.setItem("accessToken", accessToken);
    const me = await userApi.getMe();
    setUser(me);
    return me;
  };

  const register: AuthContextValue["register"] = async (
    nickname,
    email,
    password,
    passwordConfirm,
  ) => {
    // 회원가입 응답에는 accessToken이 내려오지 않으므로, 가입 직후 로그인을 이어서 호출한다.
    await authApi.register(nickname, email, password, passwordConfirm);
    return login(email, password);
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
    <AuthContext.Provider value={{ user, isInitialized, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
