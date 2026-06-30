"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
      const user = await fetch("https://panda-market-api.vercel.app/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!user.ok) throw new Error(`에러 발생 HTTP: ${user.status}`);
      const data = await user.json();
      setUser(data);
      setIsInitialized(true);
    } catch (err) {
      console.error(err.message);
      setIsInitialized(true);
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    // await authService.register(name, email, password);
    try {
      const res = await fetch(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            nickname,
            password,
            passwordConfirmation,
          }),
        },
      );
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
    // await authService.login(email, password);
    // await getUser();
    try {
      const res = await fetch(
        "https://panda-market-api.vercel.app/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
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

  // const updateUser = async (user) => {
  //   const updatedUser = await userService.updateMe(user);
  //   setUser(updatedUser);
  // };

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
