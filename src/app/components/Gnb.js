"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function Gnb() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: fetchUser,
    enabled: isMounted && !!localStorage.getItem("accessToken"),
    retry: false,
  });

  if (!isMounted) return null;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-8">
        {/* 로고 영역 */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image
            src="/Group 19.png"
            width={153}
            height={51}
            alt="판다마켓 로고"
            priority
          />
        </Link>

        {/* 메뉴 링크 */}
        <div className="flex gap-6 text-lg font-semibold">
          <Link
            href="/articles"
            className={
              pathname === "/articles"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={
              pathname === "/items"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }
          >
            중고마켓
          </Link>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="text-sm font-medium text-gray-500">로딩 중...</div>
        ) : isError ? (
          <Link
            href="/login"
            className="rounded-lg bg-blue-500 px-7 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            로그인
          </Link>
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
              {user.image ? (
                <img
                  src={user.image}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src="/Frame 2609463.png"
                  width={40}
                  height={40}
                  alt="프로필 이미지"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="font-medium text-gray-800">{user.nickname}</span>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-blue-500 px-7 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
