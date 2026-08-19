"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { SIGNIN_ENDPOINT, SIGNUP_ENDPOINT } from "@/constants/endpoint";
import { ROUTES } from "@/constants/navigation";

const publicPaths = [
  `${ROUTES.HOME}`,
  `${SIGNIN_ENDPOINT}`,
  `${SIGNUP_ENDPOINT}`,
  `${ROUTES.ITEM.BASE}`,
  `${ROUTES.COMMUNITY.BASE}`,
];

export default function RouteGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGuard = () => {
      const path = pathname.split("?")[0];
      const isItemDetail = /^\/items\/[^/]+$/.test(path);
      const isItemEdit = /^\/items\/[^/]+\/edit$/.test(path);
      const isCommunityDetail = /^\/community\/[^/]+$/.test(path);
      const isCommunityEdit = /^\/community\/[^/]+$/.test(path);

      const isProtectedRoute =
        isItemDetail || isItemEdit || isCommunityDetail || isCommunityEdit;

      const isPublicRoute = publicPaths.includes(path);

      if (isProtectedRoute && !user) {
        router.replace(`${SIGNIN_ENDPOINT}`);
      } else if (
        isPublicRoute &&
        user &&
        (path === `${SIGNIN_ENDPOINT}` || path === `${SIGNUP_ENDPOINT}`)
      ) {
        router.replace(`${ROUTES.ITEM.BASE}`);
      } else {
        setIsLoading(false);
      }
    };

    handleGuard();
  }, [user, pathname, router]);

  if (isLoading) {
    return null;
  }

  return children;
}
