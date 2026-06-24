"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const protectedPaths = ["/board/create"];
const publicPaths = ["/", "/login", "/register", "/board", "/items"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = pathname.split("?")[0];
    const isProtectedRoute = protectedPaths.some((i) => i === path);
    const isPublicRoute = publicPaths.some((i) => i === path);

    if (!isLogin && isProtectedRoute) {
      alert("로그인 이후 이용해 주세요.");
      router.push("/login");
    }
    if (isLogin && ["/login", "/signup"].some((i) => i === path)) {
      router.push("/items");
    } else {
      setIsLoading(false);
    }
  }, [isLogin, pathname, router]);

  if (isLoading) {
    return null;
  }

  return children;
}
