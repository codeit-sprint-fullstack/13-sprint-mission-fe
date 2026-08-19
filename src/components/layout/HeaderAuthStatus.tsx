"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import Button from "../ui/Button";
import defaultImage from "@/assets/icons/ic_profile.svg";

export default function HeaderAuthStatus() {
  const { user, isInitialized, logout } = useAuth();

  //새로고침 시 토큰 유무 확인 전까지 깜빡임 방지용 스켈레톤 UI
  if (!isInitialized) {
    return (
      <div className="bg-secondary-200 h-9 w-20 animate-pulse rounded-full" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
          <Image
            src={user.image || defaultImage}
            alt={`${user.nickname}의 프로필`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-cool-gray-600 text-2lg font-normal">
          {user.nickname}
        </span>
        <Button size="small" variant="gray" rounded="square" onClick={logout}>
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Link href="/signin" className="btn">
      로그인
    </Link>
  );
}
