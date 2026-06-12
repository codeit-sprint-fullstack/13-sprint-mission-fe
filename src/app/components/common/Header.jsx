"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="fixed inset-x-0 top-0 h-17.5 bg-white border-b border-[#dfdfdf] flex justify-center z-50">
      <div
        className="w-full max-w-480 flex items-center justify-between"
        style={{ padding: "0 clamp(16px, 26vw, 200px)" }}
      >
        <Link
          href="/"
          className="flex items-center justify-center w-38.25 h-12.75 shrink-0 no-underline cursor-pointer gap-[8.5px]"
        >
          <Image
            src="/logo/panda-logo.svg"
            alt="판다마켓 로고"
            width={40}
            height={40}
            className="shrink-0"
          />
          <span
            className="text-[#3692FF] text-[25.633px] font-bold"
            style={{ fontFamily: '"ROKAF Sans"' }}
          >
            판다마켓
          </span>
        </Link>

        <div className="flex flex-1">
          <Link
            href="/community"
            className={`mx-3.75 text-center text-lg font-bold leading-6.5 no-underline whitespace-nowrap max-[375px]:text-base ${
              pathname === "/community" || pathname === "/new"
                ? "text-[#3692FF]"
                : "text-[#4b5563]"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`mx-3.75 text-center text-lg font-bold leading-6.5 no-underline whitespace-nowrap max-[375px]:text-base ${
              pathname === "/market" ? "text-[#3692FF]" : "text-[#4b5563]"
            }`}
          >
            중고마켓
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex w-32 h-10.5 py-3 px-5.75 justify-center items-center border-none rounded-lg text-white text-base font-semibold cursor-pointer bg-[#3692FF]"
          onClick={() => router.push("/login")} // TODO: 로그인 페이지 마이그레이션 미완
        >
          로그인
        </button>
      </div>
    </nav>
  );
}
