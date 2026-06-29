import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Social() {
  return (
    <div className="bg-[#e6f2ff] px-[23px] py-[16px] flex justify-between items-center rounded-[8px]">
      <p className="text-[16px] font-medium text-secondary-800">
        간편 로그인하기
      </p>
      <div className="flex gap-[16px]">
        <Link href="https://www.google.com/">
          <Image
            src="/icons/ic_google.svg"
            width={42}
            height={42}
            alt="구글 아이콘"
          />
        </Link>
        <Link href="https://www.kakaocorp.com/">
          <Image
            src="/icons/ic_kakao.svg"
            width={42}
            height={42}
            alt="카카오 아이콘"
          />
        </Link>
      </div>
    </div>
  );
}
