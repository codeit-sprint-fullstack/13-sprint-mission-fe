"use client";

import { authAPI } from "@/lib/services/authApi";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("에러가 발생했습니다.");
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<void> => {
    const registerData = await authAPI.register(
      name,
      email,
      password,
      passwordConfirmation,
    );
    localStorage.setItem("accessToken", registerData.accessToken);
    await getUser();
  };

  const login = async (email: string, password: string): Promise<void> => {
    const loginData = await authAPI.login(email, password);
    localStorage.setItem("accessToken", loginData.accessToken);
    await getUser();
  };

  const getUser = async (): Promise<void> => {
    try {
      const user = await authAPI.getUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
