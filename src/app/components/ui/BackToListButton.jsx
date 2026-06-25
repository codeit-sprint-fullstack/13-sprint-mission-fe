import React from "react";
import Image from "next/image";
import Link from "next/link";

const ARROW_BACK_ICON = "/icons/ic_back.svg";

export default function BackToListButton({ href, ...props }) {
  return (
    <>
      <div className="flex justify-center">
        <Link
          href={href}
          className="flex w-60 h-12 px-16 py-3 items-center justify-center gap-2 shrink-0 rounded-[40px] bg-primary text-white font-medium transition-colors whitespace-nowrap"
        >
          목록으로 돌아가기
          <Image
            src={ARROW_BACK_ICON}
            alt="목록으로 돌아가기"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </>
  );
}
