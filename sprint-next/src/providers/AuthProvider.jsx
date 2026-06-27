"use client";

import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  isInitialized: false,
  saveAuth: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
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

  // Server Action 성공 후 클라이언트에서 토큰/유저 저장할 때 사용
  const saveAuth = ({ user, accessToken }) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const register = async (nickname, email, password, passwordConfirm) => {
    const { user, accessToken } = await authService.register(
      nickname,
      email,
      password,
      passwordConfirm,
    );
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const login = async (email, password) => {
    const { user, accessToken } = await authService.login(email, password);
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const updateUser = async (data) => {
    const updatedUser = await userService.updateMe(data);
    setUser(updatedUser);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetch = token
      ? userService
          .getMe()
          .then((user) => setUser(user))
          .catch(() => setUser(null))
      : Promise.resolve();
    fetch.finally(() => setIsInitialized(true));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        saveAuth,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
