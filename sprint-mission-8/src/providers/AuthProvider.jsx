"use client";
import { authService } from "@/lib/api/auth";
import { userService } from "@/lib/api/user";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  signin: () => {},
  signup: () => {},
  logout: () => {},
  getUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  const signup = async (nickname, email, password, passwordConfirmation) => {
    const { accessToken, refreshToken } = await authService.signup(
      nickname,
      email,
      password,
      passwordConfirmation,
    );
    localStorage.setItem("accessToken", accessToken); // ← 추가
    localStorage.setItem("refreshToken", refreshToken); // ← 추가
  };

  const signin = async (email, password) => {
    const { accessToken, refreshToken } = await authService.signin(
      email,
      password,
    );
    localStorage.setItem("accessToken", accessToken); // ← 추가
    localStorage.setItem("refreshToken", refreshToken); // ← 추가
    await getUser();
  };

  const logout = async () => {
    localStorage.removeItem("accessToken"); // ← 추가
    localStorage.removeItem("refreshToken"); // ← 추가
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signin, signup, logout, getUser, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
