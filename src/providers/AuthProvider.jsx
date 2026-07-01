"use client";

import { authAPI } from "@/lib/services/authApi";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
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
  const [user, setUser] = useState(null);

  const register = async (name, email, password, passwordConfirmation) => {
    const registerData = await authAPI.register(
      name,
      email,
      password,
      passwordConfirmation,
    );
    localStorage.setItem("accessToken", registerData.accessToken);
    await getUser();
  };

  const login = async (email, password) => {
    const loginData = await authAPI.login(email, password);
    localStorage.setItem("accessToken", loginData.accessToken);
    await getUser();
  };

  const getUser = async () => {
    try {
      const user = await authAPI.getUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
