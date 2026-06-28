"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed w-full top-0 z-[100] h-[70px] px-[200px] border-b border-[#dfdfdf] bg-white">
      <div className="flex justify-between items-center h-full">
        <Link href="/">
          <Image
            src="/logo/logo-panda-market.svg"
            alt="판다마켓"
            width={153}
            height={51}
            className="cursor-pointer"
          />
        </Link>

        {pathname !== "/" && (
          <div className="flex items-center pl-[39px] gap-[30px] w-full">
            <Link
              href="/"
              className={`text-lg font-bold ${pathname === "/" ? "text-blue-500" : "text-gray-600"} cursor-pointer`}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className={`text-lg font-bold ${pathname === "/items" ? "text-blue-500" : "text-gray-600"} cursor-pointer`}
            >
              중고마켓
            </Link>
          </div>
        )}

        {user ? (
          <div className="flex items-center gap-3 shrink-0">
            <Image
              src={user.image ?? "/icon/profile.svg"}
              alt="프로필"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-gray-800 text-base font-semibold whitespace-nowrap">
              {user.nickname}
            </span>
          </div>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="flex justify-center items-center w-[128px] h-12 px-[23px] py-3 rounded-lg bg-blue-500 text-gray-100 text-base font-semibold cursor-pointer shrink-0"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
