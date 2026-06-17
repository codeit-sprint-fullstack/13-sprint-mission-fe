"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="fixed inset-x-0 top-0 h-17.5 bg-white border-b border-[#dfdfdf] flex items-center z-50">
      <div className="w-full max-w-390 mx-auto flex items-center justify-between px-4 bd:px-6">
        <Link
          href="/"
          className="flex items-center justify-center shrink-0 no-underline cursor-pointer gap-[8.5px] whitespace-nowrap"
        >
          <Image
            src="/logo/panda-logo.svg"
            alt="판다마켓 로고"
            width={40}
            height={40}
            className="shrink-0 max-bd:hidden"
          />
          <span
            className="text-primary text-[25.633px] font-bold whitespace-nowrap max-bd:text-lg"
            style={{ fontFamily: '"ROKAF Sans"' }}
          >
            판다마켓
          </span>
        </Link>

        <div className="flex flex-1 items-center pl-4 bd:pl-5">
          <Link
            href="/community"
            className={`text-center text-sm bd:text-lg font-bold leading-6.5 no-underline whitespace-nowrap mx-1 bd:mx-[15px] ${
              pathname === "/community" || pathname === "/new"
                ? "text-primary"
                : "text-gray-600"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`text-center text-sm bd:text-lg font-bold leading-6.5 no-underline whitespace-nowrap mx-1 bd:mx-[15px] ${
              pathname === "/market" ? "text-primary" : "text-gray-600"
            }`}
          >
            중고마켓
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-9 bd:h-10.5 justify-center items-center border-none rounded-lg text-white text-sm bd:text-base font-semibold cursor-pointer bg-primary whitespace-nowrap px-3 bd:px-[23px]"
          onClick={() => router.push("/login")}
        >
          로그인
        </button>
      </div>
    </nav>
  );
}
