"use client";
import { authService } from "@/lib/authService";

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  signin: () => {},
  user: null,
  signout: () => {},
  signup: () => {},
});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isSignin = !!user;

  const signin = async (email, password) => {
    const data = await authService.signin(email, password);
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    setUser({ email, nickname: data.nickname || "유저" });
  };
  const signout = () => {
    setUser(null);
  };
  const signup = async ({
    nickname,
    email,
    password,
    passwordConfirmation,
  }) => {
    await authService.signup({
      nickname,
      email,
      password,
      passwordConfirmation,
    });
  };
  return (
    <AuthContext.Provider value={{ user, isSignin, signin, signout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
