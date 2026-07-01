"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";

const AuthContext = createContext({
  user: null,
  isInitialized: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setIsInitialized(true);
      return;
    }

    try {
      const currentUser = await userService.getMe();
      setUser(currentUser);
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  const login = async (email, password) => {
    await authService.login(email, password);
    await getUser();
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    await authService.register(nickname, email, password, passwordConfirmation);
    await getUser();
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
