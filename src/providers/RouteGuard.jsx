"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

const protectedPaths = ["/items/"];
const publicOnlyPaths = ["/signin", "/signup"];

function isRouteMatch(path, route) {
  if (route.endsWith("/")) return path.startsWith(route);
  return path === route || (path.startsWith(`${route}/`) && route !== "/");
}

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(false);

    const hasToken = Boolean(getAccessToken());
    const path = pathname.split("?")[0];
    const isProtectedRoute = protectedPaths.some((route) =>
      isRouteMatch(path, route),
    );
    const isPublicOnlyRoute = publicOnlyPaths.some((route) =>
      isRouteMatch(path, route),
    );

    if (isProtectedRoute && !hasToken) {
      router.replace("/signin");
      return;
    }

    if (isPublicOnlyRoute && hasToken) {
      router.replace("/items");
      return;
    }

    setCanRender(true);
  }, [pathname, router]);

  if (!canRender) return null;

  return children;
}
