"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    router.replace("/items");
  }, []);

  return <p className="p-10 text-center text-gray-400">로그인 처리 중...</p>;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-gray-400">로그인 처리 중...</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}