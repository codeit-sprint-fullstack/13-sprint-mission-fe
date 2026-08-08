"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { UserType } from "@/types/user";

interface IAuthContextType {
  user: UserType | null;
  isLogin: boolean;
  isAuthLoading: boolean;
  signup: (
    data: Partial<UserType> & { passwordConfirmation: string },
  ) => Promise<void>;
  login: (data: Pick<UserType, "email" | "password">) => Promise<void>;
  logout: () => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const isLogin = !!Object.values(user ?? {}).length;

  async function signup(
    data: Partial<UserType> & { passwordConfirmation: string },
  ) {
    const result = await authService.signUp(data);
    setUser(result.user);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  async function login(data: Pick<UserType, "email" | "password">) {
    const { email, password } = data;
    const result = await authService.login({ id: email, password });
    setUser(result.user);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  async function logout() {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  async function getUser() {
    try {
      setIsAuthLoading(true);
      const result = await userService.getMe();
      setUser(result);
    } catch (e) {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLogin, isAuthLoading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
