"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "@/lib/services/authService";
import { userService } from "@/lib/services/userService";
import { AuthError } from "@/lib/error";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsInitialized(true);
      return; // 비로그인 상태 (정상)
    }

    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      if (error instanceof AuthError && error.code === "TOKEN_EXPIRED") {
        // 토큰 만료는 예상된 상황이므로 경고 레벨로만
        console.warn("토큰이 만료되었습니다. 갱신을 시도합니다.");
      } else if (
        error instanceof AuthError &&
        error.code === "REFRESH_FAILED"
      ) {
        console.warn("토큰 갱신 실패 : 로그인 페이지로 이동합니다.");
        localStorage.removeItem("accessToken");
        router.push("/signin");
      } else {
        // 진짜 예상 못한 에러만 error 레벨
        console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      }
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  const signup = async (data) => {
    await authService.signUp(data);
  };

  const signin = async (data) => {
    await authService.signIn(data);
    await getUser();
  };

  const signout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/signin");
  };

  const updateUser = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const getToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
        updateUser,
        getToken,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
