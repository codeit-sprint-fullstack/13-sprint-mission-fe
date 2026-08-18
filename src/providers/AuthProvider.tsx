"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import {
  clearServerSideTokens,
  signinAction,
  signupAction,
} from "@/lib/actions/auth";
import { WIDTH_HEADER_LIST } from "@/lib/constants/constants";
import { apiFetch } from "@/lib/services/fetchClient";
import type {
  AuthContextValue,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";
import type { User } from "@/types/user";

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(initialUser);

  const getUser = async () => {
    try {
      const userData = await apiFetch("/api/users/me");

      setUser(userData.data);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const signup = async (data: SignupPayload) => {
    // 회원가입 성공 시 유저데이터를 API 에서 응답해주는 경우, 즉시 로그인 처리 가능
    const { userData, success } = await signupAction(data);

    if (!success) {
      throw new Error("회원가입 실패");
    }
    setUser(userData);
  };

  const signin = async (data: SigninPayload) => {
    // 로그인 성공 시 유저데이터를 API 에서 응답해주는 경우, 유저 상태 변경
    const { userData, success } = await signinAction(data);

    if (!success) {
      throw new Error("로그인 실패");
    }
    setUser(userData);
  };

  const signout = async () => {
    try {
      await clearServerSideTokens();
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    // signin/signup 페이지는 로그인 여부를 확인 예외 처리
    if (WIDTH_HEADER_LIST.includes(pathname)) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUser(); // 웹페이지 랜딩 또는 새로고침 시 마다 서버에서 유저 데이터 동기화
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
