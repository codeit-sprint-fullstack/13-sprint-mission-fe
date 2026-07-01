"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../providers/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full pt-1 pb-1 bg-white border-b border-gray-200">
      <div className="max-w-layout mx-auto w-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-0">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image
              src="/images/logo.svg"
              alt="로고 이미지"
              width={40}
              height={40}
              style={{ width: 40, height: 40 }}
              priority
            />
            <span className="text-brand-blue font-bold text-[25px]">
              판다마켓
            </span>
          </Link>
          <nav className="flex items-center">
            <Link
              href="/boards"
              className="flex items-center justify-center px-6 py-4 h-full text-lg font-bold text-brand-blue"
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className="flex items-center justify-center px-6 py-4 h-full text-lg font-bold text-gray-600"
            >
              중고마켓
            </Link>
          </nav>
        </div>
        {user ? (
          <button
            onClick={logout}
            className="bg-brand-blue text-white text-btn px-6 h-[42px] rounded-lg flex items-center"
          >
            로그아웃
          </button>
        ) : (
          <Link
            className="bg-brand-blue text-white text-btn px-6 h-[42px] rounded-lg flex items-center"
            href="/signin"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
