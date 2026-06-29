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

  // 웬만하면 authprovider안에 useEffect넣기
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsInitialized(true); // Error
      return;
    }
    // Promise 체인잉
    userService
      .getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("accessToken"))
      .finally(() => setIsInitialized(true));
  }, []);

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken)
      localStorage.setItem("refreshToken", data.refreshToken);
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
    if (data.refreshToken)
      localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
