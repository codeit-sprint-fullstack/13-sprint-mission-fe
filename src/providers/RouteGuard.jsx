"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicPaths = ["/signup", "/login"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicRoute = publicPaths.some(
      (route) =>
        pathname === route ||
        (pathname.startsWith(route + "/") && route !== "/"),
    );
    const token = localStorage.getItem("accessToken");
    if (isPublicRoute && token) {
      router.push("/items");
    }
  }, [pathname, router]);

  return children;
}
