"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { getAccessToken } from "@/lib/auth";

export default function AuthShell({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.replace("/items");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-start justify-center bg-white px-6 pt-[110px]">
      <section
        className="flex w-full max-w-[440px] flex-col items-center"
        aria-label="인증"
      >
        <Logo large />
        {children}
      </section>
    </main>
  );
}
