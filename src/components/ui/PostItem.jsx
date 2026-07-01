"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import UserIcon from "./UserIcon";

import { getDate } from "@/utils/getDate";

export default function PostItem({ data }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      onClick={() => router.push(`/board/${data.id}`)}
      className="bg-[#fcfcfc] border-b border-secondary-200 cursor-pointer"
    >
      <div className="flex justify-between">
        <h1 className="text-[20px]/[32px] font-semibold">{data.title}</h1>
        <div className="flex justify-center items-center bg-white border border-secondary-100 rounded-lg w-[72px] h-[72px]">
          <Image
            src="/images/item.png"
            alt="제품 이미지"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <UserIcon width={24} height={24} />
          <p className="text-secondary-600 text-[14px]/[24px]">
            {data.writer.nickname}
          </p>
          <p className="text-secondary-400 text-[14px]/[24px]">
            {getDate(data.createdAt)}
          </p>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsClicked((prev) => !prev);
          }}
          className=" flex gap-2 mt-[16px] mb-[24px]"
        >
          <Image
            src={
              isClicked
                ? "/icons/ic_heart_full.svg"
                : "/icons/ic_heart_empty.svg"
            }
            alt="좋아요 아이콘"
            width={24}
            height={24}
          />
          <p className="w-[50px] text-[16px]/[26px] text-secondary-500 font-normal">
            {data.likeCount > 9999 ? "9999+" : data.likeCount}
          </p>
        </div>
      </div>
    </div>
  );
}
