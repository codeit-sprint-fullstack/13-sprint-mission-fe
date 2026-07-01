"use client";
import { authService } from "@/lib/authService";

import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      if (token) {
        try {

          const userData = await authService.getUser();


          setUser({
            email: userData.email,
            nickname: userData.nickname || userData.name || "유저",
            id: userData.id,
          });
        } catch (error) {
          console.error("만료된 토큰이거나 유저 정보 로드 실패:", error);

          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }


      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);
  const signin = async (email, password) => {
    const data = await authService.signin(email, password);
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    const userData = await authService.getUser();
    setUser({ email: userData.email, nickname: userData.nickname || "유저" });
  };
  const signout = () => {
    localStorage.removeItem("accessToken");
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
    <AuthContext.Provider
      value={{ user, isSignin, signin, signout, signup, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
