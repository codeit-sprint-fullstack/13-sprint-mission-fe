"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_MENU = [
  { id: 1, label: "자유게시판", path: "/board" },
  { id: 2, label: "중고마켓", path: "/items" },
];

export default function GNB() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-[68px] bg-white border-b border-[#eaeaea] flex justify-center sticky top-0 z-[1000]">
      <div className="w-full max-w-[1920px] h-full px-4 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center cursor-pointer">
            <Link href="/">
              <Image
                src="/Group 19.png"
                alt="판다마켓 홈"
                width={130}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-8">
            {NAV_MENU.map((menu) => {
              const isActive = pathname?.startsWith(menu.path);

              return (
                <Link
                  key={menu.id}
                  href={menu.path}
                  className="flex items-center text-base transition-colors group"
                >
                  <span
                    className={`transition-colors group-hover:text-blue-500 ${
                      isActive
                        ? "text-blue-500 font-bold"
                        : "text-[#333] font-medium"
                    }`}
                  >
                    {menu.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center">
          <Link
            href="/login"
            className="text-sm font-bold text-blue-500 border border-blue-500 rounded px-4 py-2 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center"
          >
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
}
