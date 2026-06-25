"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/app/lib/authService";
import { userService } from "@/app/lib/userService";

const AuthContext = createContext(null);
// const AuthContext = createContext({
//   login: () => {},
//   logout: () => {},
//   user: null,
//   updateUser: () => {},
//   register: () => {},
// });

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // @todo:
    //     useEffect(() => {
    //   const getUser = async () => {
    //     try {
    //       const user = await userService.getMe();
    //       setUser(user);
    //     } catch {
    //       localStorage.removeItem("accessToken");
    //     } finally {
    //       setIsInitialized(true);
    //     }
    //   };

    //   getUser();
    // }, []);
    // 이렇게도 할수는 있는데 token 없으면 실패하고 다시 api 호출해야한대서 낭비?

    if (token) {
      userService
        .getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem("accessToken"))
        .finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true); // @todo: 굳이 if else?
    }
  }, []);

  const signIn = async (email, password) => {
    const data = await authService.signIn(email, password);
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  };

  const signUp = async (email, nickname, password, passwordConfirmation) => {
    const data = await authService.signUp(
      email,
      nickname,
      password,
      passwordConfirmation
    );
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
