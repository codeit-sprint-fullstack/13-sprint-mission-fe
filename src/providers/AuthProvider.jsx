"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";

const AuthContext = createContext({
  user: null,
  isLogin: false,
  signup: () => {},
  login: () => {},
  logout: () => {},
});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const isLogin = !!Object.values(user).length;

  async function signup(data) {
    const result = await authService.signUp(data);
    setUser(result.user);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  async function login(data) {
    const result = await authService.login(data);
    setUser(result.user);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  async function logout() {
    setUser({});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  async function getUser() {
    try {
      const result = await userService.getMe();
      setUser(result);
    } catch (e) {
      setUser({});
      throw new Error(e);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogin, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
