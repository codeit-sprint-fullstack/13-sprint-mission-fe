"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/app/lib/authService";
import { userService } from "@/app/lib/userService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      userService
        .getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem("accessToken"))
        .finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true);
    }
  }, []);

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
    return data;
  };

  const signUp = async (email, nickname, password, passwordConfirmation) => {
    const data = await authService.signUp(
      email,
      nickname,
      password,
      passwordConfirmation
    );
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
    return data;
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
