"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicPaths = ["/signup", "/login"];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect(() => {
    const isPublicRoute: boolean = publicPaths.some(
      (route) =>
        pathname === route ||
        (pathname.startsWith(route + "/") && route !== "/"),
    );
    const token: string | null = localStorage.getItem("accessToken");
    if (isPublicRoute && token) {
      router.push("/items");
    }
  }, [pathname, router]);

  return children;
}
