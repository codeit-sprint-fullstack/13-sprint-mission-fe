"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

const protectedPaths = ["/items/new"];
const publicOnlyPaths = ["/signin", "/signup"];

function isRouteMatch(path: string, route: string): boolean {
  if (route.endsWith("/")) return path.startsWith(route);
  return path === route || (path.startsWith(`${route}/`) && route !== "/");
}

interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hasToken = Boolean(getAccessToken());
  const path = pathname.split("?")[0];
  const isProtectedRoute = protectedPaths.some((route) =>
    isRouteMatch(path, route),
  );
  const isPublicOnlyRoute = publicOnlyPaths.some((route) =>
    isRouteMatch(path, route),
  );

  useEffect(() => {
    if (isProtectedRoute && !hasToken) {
      router.replace("/signin");
      return;
    }

    if (isPublicOnlyRoute && hasToken) {
      router.replace("/items");
      return;
    }
  }, [hasToken, isProtectedRoute, isPublicOnlyRoute, router]);

  if ((isProtectedRoute && !hasToken) || (isPublicOnlyRoute && hasToken)) {
    return null;
  }

  return children;
}
