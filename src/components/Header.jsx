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
    <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white/95">
      <div className="mx-auto flex min-h-[68px] w-[min(100%-32px,640px)] flex-wrap items-center gap-3 py-3 tablet:w-[min(100%-48px,900px)] desktop:h-[74px] desktop:w-[min(100%-48px,1120px)] desktop:flex-nowrap desktop:gap-8 desktop:py-0">
        <Logo />
        <nav
          className="oredr-3 flex w-full gap-[18px] text-sm font-bold desktop:order-none desktop:w-auto desktop:gap-7 dsektop:text-base"
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
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#3692ff] px-[18px] font-bold text-white"
              href="/signin"
            >
              <LogIn size={16} />
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
