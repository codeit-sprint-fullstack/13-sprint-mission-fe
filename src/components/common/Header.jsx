"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserRound } from "lucide-react";
import Logo from "./Logo";
import { clearTokens, getAccessToken } from "@/lib/auth";
import { userApi } from "@/lib/api";
import { queryKeys } from "@/lib/queries";

export default function Header() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getAccessToken()));
  }, []);

  const { data: me } = useQuery({
    queryKey: queryKeys.me,
    queryFn: userApi.me,
    enabled: hasToken,
  });

  const handleLogout = () => {
    clearTokens();
    setHasToken(false);
    router.refresh();
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-[72px] w-[min(100%-32px,640px)] items-center gap-6 tablet:w-[min(100%-48px,1120px)] desktop:w-[1120px]">
        <Logo />
        <nav
          className="flex gap-7 text-[16px] font-bold text-[#1f2937]"
          aria-label="주요 메뉴"
        >
          <Link href="/board">자유게시판</Link>
          <Link href="/items">중고마켓</Link>
        </nav>
        <div className="ml-auto">
          {hasToken ? (
            <button
              className="inline-flex min-h-[42px] items-center gap-2 font-bold text-gray-600"
              type="button"
              onClick={handleLogout}
              title="로그아웃"
            >
              {me?.image ? (
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src={me.image}
                  alt=""
                />
              ) : (
                <UserRound size={20} />
              )}
              <span>{me?.nickname || "내 계정"}</span>
            </button>
          ) : (
            <Link
              className="inline-flex h-[42px] min-w-[88px] items-center justify-center rounded-lg bg-[#3692ff] px-6 text-[15px] font-bold text-white"
              href="/signin"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
