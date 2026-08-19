"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

export function useRequireAuth() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/signin");
    }
  }, [loading, isLoggedIn]);
}
