// 보호 라우트(로그인 필요) 리다이렉트는 src/middleware.js가 서버 사이드에서 처리함
// (쿠키 유무를 렌더링 전에 확인 -> 서버 컴포넌트가 비로그인 사용자에게 데이터를 내려주는 걸 막음).
// 여기서는 "이미 로그인된 사용자가 로그인/회원가입 페이지에 접근"하는 경우만 처리.
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const publicOnlyPaths = ["/login", "/signup"];

export default function RouteGuard({ children }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicOnlyRoute = publicOnlyPaths.includes(pathname);

  useEffect(() => {
    if (!isInitialized) return;
    if (isPublicOnlyRoute && user) {
      router.replace("/");
    }
  }, [isInitialized, user, isPublicOnlyRoute, router]);

  if (isPublicOnlyRoute && isInitialized && user) return null;

  return children;
}