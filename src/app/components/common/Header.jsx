"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="fixed inset-x-0 top-0 h-17.5 bg-white border-b border-[#dfdfdf] flex justify-center items-center z-50 ">
      <div
        className="w-full flex items-center justify-between"
        style={{ padding: "0 clamp(8px, calc(21.8vw - 135.8px), 200px)" }}
      >
        <Link
          href="/"
          className="flex items-center justify-center shrink-0 no-underline cursor-pointer gap-[8.5px] whitespace-nowrap"
        >
          <Image
            src="/logo/panda-logo.svg"
            alt="판다마켓 로고"
            width={40}
            height={40}
            className="shrink-0 max-[465px]:hidden"
          />
          <span
            className="text-[#3692FF] text-[25.633px] font-bold whitespace-nowrap max-[465px]:text-lg"
            style={{ fontFamily: '"ROKAF Sans"' }}
          >
            판다마켓
          </span>
        </Link>

        <div className="flex flex-1 items-center pl-5 max-[465px]:pl-4">
          
          <Link
            href="/community"
            className={`text-center text-lg font-bold leading-6.5 no-underline whitespace-nowrap max-[465px]:text-sm ${
              pathname === "/community" || pathname === "/new"
                ? "text-[#3692FF]"
                : "text-[#4b5563]"
            }`}
            style={{ margin: "0 clamp(4px, calc(1.13vw + 0.1px), 15px)" }}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`text-center text-lg font-bold leading-6.5 no-underline whitespace-nowrap max-[465px]:text-sm ${
              pathname === "/market" ? "text-[#3692FF]" : "text-[#4b5563]"
            }`}
            style={{ margin: "0 clamp(4px, calc(1.13vw + 0.1px), 15px)" }}
          >
            중고마켓
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10.5 max-[465px]:h-9 justify-center items-center border-none rounded-lg text-white text-base font-semibold cursor-pointer bg-[#3692FF] whitespace-nowrap max-[465px]:text-sm"
          style={{ padding: "0 clamp(12px, calc(1.13vw + 7.7px), 23px)" }}
          onClick={() => router.push("/login")} // TODO: 로그인 페이지 마이그레이션 미완
        >
          로그인
        </button>
      </div>
    </nav>
  );
}
