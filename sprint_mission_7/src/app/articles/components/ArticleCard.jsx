import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ArticleCard({ title, createdAt }) {
  return (
    <Link
      href="/articles"
      className="w-[340px] flex flex-col gap-4 bg-[#fcfcfc] pb-6 border-b border-b-gray-200"
    >
      <div className="flex justify-between">
        <p className="max-w-[263px] text-2lg font-semibold text-gray-800">
          {title}
        </p>
        <div className="flex justify-center items-center w-[72px] h-[72px] border-[0.75px] border-gray-200 rounded-lg">
          <Image src="/mac.png" alt="상품 사진" width={48} height={48} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src="/ic_profile.svg"
            alt="프로필 사진"
            width={24}
            height={24}
            className="max-w-none"
          />
          <p className="text-md text-gray-600">user</p>
          <p className="text-md text-gray-400">{createdAt}</p>
        </div>
        <div className="flex gap-2">
          <Image
            src="/ic_heart.svg"
            alt="좋아요 수"
            width={24}
            height={24}
            className="max-w-none"
          />
          <p className="text-lg text-gray-500">9999+</p>
        </div>
      </div>
    </Link>
  );
}
