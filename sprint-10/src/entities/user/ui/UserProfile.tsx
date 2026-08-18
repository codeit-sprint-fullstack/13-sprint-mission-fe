"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../model/useAuth";
import DefaultProfile from "@/assets/png/img_default_profile.png";

export default function UserProfile() {
  const { user, isInitialized } = useAuth();
  const [imgError, setImgError] = useState(false);

  if (!isInitialized) {
    return <div className="h-10 w-24" />;
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="bg-primary-100 hover:bg-primary-200 text-nowrap text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        로그인
      </Link>
    );
  }

  const imgSrc = !imgError && user.image ? user.image : DefaultProfile;

  return (
    <div className="flex items-center gap-2">
      <Image
        src={imgSrc}
        alt={user.nickname}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover"
        onError={() => setImgError(true)}
        unoptimized={!imgError && !!user.image}
      />
      <span className="text-sm font-medium text-gray-800">{user.nickname}</span>
    </div>
  );
}
