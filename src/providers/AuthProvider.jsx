"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "@/app/api/config";

const AuthContext = createContext({
  login: () => {},
  // logout: () => {},
  user: null,
  // updateUser: () => {},
  register: () => {},
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
      const res = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error(`에러 발생 HTTP: ${res.status}`);
      const data = await res.json();
      setUser(data);
      setIsInitialized(true);
    } catch (err) {
      console.error(err.message);
      setIsInitialized(true);
    }
  };

  const register = async (nickname, email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: nickname,
          password,
        }),
      });
      if (!res.ok) throw new Error(`오류 발생 HTTP: ${res.status}`);
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      await getUser();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(`오류 발생 HTTP: ${res.status}`);
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      await getUser();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 0);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
