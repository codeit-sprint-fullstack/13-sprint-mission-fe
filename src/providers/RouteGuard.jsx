"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

// 로그인된 사용자만 접근 가능한 경로
const protectedPaths = ["/boards/new", "/items/new"];

// 미인증 사용자만 접근 가능한 경로
const publicPaths = ["/signin", "/signup"];

export default function RouteGuard({ children }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) return;
    setTimeout(() => {
      const path = pathname.split("?")[0];

      const isProtectedRoute = protectedPaths.some(
        (route) =>
          path === route || (path.startsWith(route + "/") && route !== "/"),
      );

      const isPublicRoute = publicPaths.some(
        (route) =>
          path === route || (path.startsWith(route + "/") && route !== "/"),
      );

      if (isProtectedRoute && !user) {
        router.push("/signin");
      } else if (isPublicRoute && user) {
        router.push("/items");
      } else {
        setIsLoading(false);
      }
    }, 0);
  }, [user, pathname, router, isInitialized]);

  if (isLoading) {
    return null;
  }

  return children;
}
