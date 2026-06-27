"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const protectedPaths = ["/me", "/me/edit"];
const guestOnlyPaths = ["/auth", "/auth/signup"];

export default function RouteGuard({ children }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized) return;

    const path = pathname.split("?")[0];

    const isProtectedRoute = protectedPaths.some(
      (route) => path === route || path.startsWith(route + "/")
    );

    const isGuestOnlyRoute = guestOnlyPaths.some(
      (route) => path === route || path.startsWith(route + "/")
    );

    if (isProtectedRoute && !user) {
      router.replace("/auth");
    } else if (isGuestOnlyRoute && user) {
      router.replace("/");
    }
  }, [user, isInitialized, pathname, router]);

  if (!isInitialized) return null;

  return children;
}
