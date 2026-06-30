"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const protectedPaths = [
  "/board/create",
  /^\/board\/[^/]+$/,
  /^\/board\/[^/]+\/edit$/,
];
const publicPaths = ["/", "/login", "/register", "/board", "/items"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    const path = pathname.split("?")[0];
    const isProtectedRoute = protectedPaths.some((route) => {
      if (typeof route === "string") return route === path;
      return route.test(path);
    });
    const isPublicRoute = publicPaths.some((route) => {
      if (typeof route === "string") return route === path;
      return route.test(path);
    });

    if (!isLogin && isProtectedRoute) {
      alert("로그인 이후 이용해 주세요.");
      router.push("/login");
    }
    if (isLogin && ["/login", "/signup"].some((i) => i === path)) {
      router.push("/items");
    }
  }, [isLogin, pathname, router]);

  return children;
}
