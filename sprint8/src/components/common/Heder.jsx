"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/pandalogo.svg"
              alt="판다마켓 로고"
              width={40}
              height={40}
              className="w-auto h-auto"
            />
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-blue-400">
              자유게시판
            </Link>
            <Link href="#" className="text-gray-800">
              중고마켓
            </Link>
          </nav>
        </div>

        <div className="flex gap-4">
          <Link href="/login" className="text-blue-400">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}
