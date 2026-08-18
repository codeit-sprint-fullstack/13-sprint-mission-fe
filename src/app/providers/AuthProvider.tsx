"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "@/app/lib/authService";
import { userService } from "@/app/lib/userService";
import type { AuthResult, User } from "@/app/lib/types";

interface AuthContextValue {
  user: User | null;
  isInitialized: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // accessToken은 httpOnly 쿠키라 JS에서 존재 여부를 알 수 없으므로,
  // 항상 /users/me를 시도해서 응답 성공 여부로 로그인 상태를 판단함
  useEffect(() => {
    userService
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsInitialized(true));
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await authService.signIn(email, password);
    setUser(data.user);
    return data;
  };

  const signUp = async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const data = await authService.signUp(
      email,
      nickname,
      password,
      passwordConfirmation
    );
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
