"use client";

import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-[70] w-full items-center border-b border-[#DFDFDF] bg-[#FFF]">
      <div className="flex w-full items-center justify-between px-[16px] md:px-[24px] lg:px-[200px]">
        <div className="flex items-center">
          <Link className="flex gap-[8.592px]" href="/">
            <Image
              src="/panda.svg"
              alt="헤더 판다 로고"
              width={40}
              height={40}
              className="hidden md:block"
            />
            <p className="mr-[32px] text-center text-[20.202px] font-bold whitespace-nowrap text-[#3692FF] md:text-[25.633px]">
              판다마켓
            </p>
          </Link>
          <div className="flex gap-[8px] md:gap-[40px]">
            <Link
              href="/boards"
              className={`${path.startsWith("/boards") ? "text-[#3692FF]" : "text-[#4B5563]"} text-[16px] font-bold whitespace-nowrap md:text-[18px]`}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className="text-[16px] font-bold whitespace-nowrap text-[#4B5563] md:text-[18px]"
            >
              중고마켓
            </Link>
          </div>
        </div>
        <div>
          {/* TODO: 버튼 많이 쓰이니까 컴포넌트로 분리하는 것도 괜찮아보임 */}
          {user ? (
            <span className="flex items-center gap-1.5">
              <Image
                src="/ic_profile.svg"
                width={40}
                height={40}
                alt="사용자 기본 프로필"
              />
              <p className="text-secondary-600 text-[18px] font-[400]">
                {user.nickname}
              </p>
            </span>
          ) : (
            <Link
              className="bg-brand-blue cursor-pointer rounded-[8px] px-[23px] py-[12px] font-[600] whitespace-nowrap text-white"
              href="/login"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
