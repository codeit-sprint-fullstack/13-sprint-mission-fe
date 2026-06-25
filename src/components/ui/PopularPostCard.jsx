"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getDate } from "@/utils/getDate";

export default function PopularPostCard({ data }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <article
      onClick={() => router.push(`/board/${data.id}`)}
      className="w-fit px-[24px] pb-[16px] bg-secondary-50 rounded-lg cursor-pointer"
    >
      <div className="w-fit flex gap-[5px] bg-primary px-[24px] py-[2px] text-white rounded-br-[16px] rounded-bl-[16px]">
        <Image
          src="/icons/ic_medal.svg"
          alt="medal icon"
          width={16}
          height={16}
        />
        <p>Best</p>
      </div>
      <div className="flex gap-[8px] mt-[16px] mb-[18px]">
        <h1 className="w-[256px] text-[20px]/[32px] font-semibold">
          {data.title}
        </h1>
        <div className="w-[72px] h-[72px] flex justify-center items-center border-secondary-200 border-[1px] border-radis rounded-md">
          <Image
            src={"/images/item.png"}
            alt="product image"
            width={45}
            height={45}
          />
        </div>
      </div>
      <footer className="flex justify-between text-[14px] font-normal">
        <div className="flex text-secondary-600 gap-[8px]">
          <div>{data.writer.nickname}</div>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsClicked((prev) => !prev);
            }}
            className="flex text-secondary-500 gap-[4px]"
          >
            <Image
              src={
                isClicked
                  ? "/icons/ic_heart_full.svg"
                  : "/icons/ic_heart_empty.svg"
              }
              alt="heart icon"
              width={16}
              height={16}
            />
            <p>{data.likeCount > 9999 ? "9999+" : data.likeCount}</p>
          </div>
        </div>
        <div className="text-secondary-400">{getDate(data.createdAt)}</div>
      </footer>
    </article>
  );
}
