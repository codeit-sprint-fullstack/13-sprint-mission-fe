// 앱 전체의 인증 상태 관할

"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  signIn: () => {},
  signUp: () => {},
  user: null,
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
      const data = await userService.getMe();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    await getUser();
  };

  const signUp = async (nickname, email, password, passwordConfirmation) => {
    const data = await authService.signUp(nickname, email, password, passwordConfirmation);
    localStorage.setItem("accessToken", data.accessToken);
    await getUser();
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
