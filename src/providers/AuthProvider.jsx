"use client";

import { authAPI } from "@/lib/services/authApi";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  login: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("에러가 발생했습니다.");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const register = async (name, email, password, passwordConfirmation) => {
    await authAPI.register(name, email, password, passwordConfirmation);
  };

  const login = async (email, password) => {
    await authAPI.login(email, password);
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
