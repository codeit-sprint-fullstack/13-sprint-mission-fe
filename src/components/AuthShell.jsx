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
    <main className="grid min-h-screen place-items-center bg-white px-6 py-16">
      <section
        className="flex w-full max-w-[480px] flex-col items-center"
        aria-label="인증"
      >
        <Logo large />
        {children}
      </section>
    </main>
  );
}
