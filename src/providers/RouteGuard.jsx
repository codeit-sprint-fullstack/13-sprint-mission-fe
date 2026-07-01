"use client";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { usePathname, useRouter } from "next/navigation";

const protectedPaths = ["/items", "/articles"];
const publicPaths = ["/signin", "/signup"];

export default function RouteGuard({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;
    const path = pathname.split("?")[0];
    const isProtectedParent = protectedPaths.some((route) =>
      path.startsWith(route),
    );
    const isCommonPage = path === "/items" || path === "/articles";
    const isProtectedRoute = isProtectedParent && !isCommonPage;
    const isPublicRoute = publicPaths.some((route) => path === route);

    if (isProtectedRoute && !user) {
      router.push("/signin");
    } else if (isPublicRoute && user) {
      router.push("/items");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [user, pathname, router, isAuthLoading]);
  if (isAuthLoading || isLoading) {
    return null;
  }
  return children;
}
