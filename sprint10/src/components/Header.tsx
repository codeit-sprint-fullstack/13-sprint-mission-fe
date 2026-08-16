"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../lib/api/fetchClient";
import { User } from "../types";

export default function Header() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  const { data: user, isError } = useQuery<User>({
    queryKey: ["userMe"],
    queryFn: async () => {
      const res = await fetchClient("/users/me");
      return res.json();
    },
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("accessToken");
      setToken(null);
      alert("로그인 시간이 만료되었습니다.");
    }
  }, [isError]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <header className="flex h-[70px] w-full items-center justify-center border-b border-[#E5E7EB] bg-white px-[16px] md:px-[24px]">
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        
        <div className="flex items-center gap-[24px] md:gap-[32px]">
          <Link href="/" className="flex items-center gap-[8px] md:gap-[12px]">
            <Image 
              src="/images/ic_panda.svg" 
              alt="Panda Market" 
              width={40} 
              height={40} 
              priority
            />
            <span className="hidden font-['Pretendard'] text-[20px] font-bold text-[#3692FF] sm:inline">
              판다마켓
            </span>
          </Link>
          <nav className="hidden gap-[24px] md:flex">
            <Link href="/board" className="font-['Pretendard'] text-[18px] font-bold text-[#4B5563] hover:text-[#1F2937]">
              자유게시판
            </Link>
            <Link href="/items" className="font-['Pretendard'] text-[18px] font-bold text-[#4B5563] hover:text-[#1F2937]">
              중고마켓
            </Link>
          </nav>
        </div>

        <div>
          {token ? (
            user ? (
              <div className="flex items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                  <Image 
                    src={user.image || "/images/ic_profile.svg"} 
                    alt="User Profile" 
                    width={40} 
                    height={40} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-[16px]">
                  <span className="font-['Pretendard'] text-[16px] font-medium text-[#1F2937]">
                    {user.nickname}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="font-['Pretendard'] text-[14px] text-gray-400 transition-colors hover:text-[#F74747]"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[40px] w-[40px] animate-pulse rounded-full bg-gray-200"></div>
            )
          ) : (
            <Link href="/signin">
              <button className="flex h-[48px] items-center justify-center rounded-[8px] bg-[#3692FF] px-[24px] font-['Pretendard'] text-[16px] font-bold text-white transition-colors hover:bg-blue-600">
                로그인
              </button>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}