"use client";
import { useState } from "react";
import Image from "next/image";

import { getDate } from "@/utils/getDate";

export default function CommentItem({ data }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="bg-[#fcfcfc] border-b border-secondary-200 cursor-pointer">
      <div className="flex justify-between">
        <h1 className="text-[20px]/[32px] font-semibold">{data.title}</h1>
        <div className="flex justify-center items-center bg-white border border-secondary-100 rounded-lg w-[72px] h-[72px]">
          <Image
            src="/images/item.png"
            alt="product image"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-fit h-fit rounded-[100%] bg-secondary-300">
            <Image
              src="/icons/ic_user.svg"
              alt="user icon"
              width={24}
              height={24}
            />
          </div>
          <p className="text-secondary-600 text-[14px]/[24px]">{data.author}</p>
          <p className="text-secondary-400 text-[14px]/[24px]">
            {getDate(data.createdAt)}
          </p>
        </div>
        <div
          onClick={() => {
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
            alt="heart icon"
            width={24}
            height={24}
          />
          <p className="w-[50px] text-[16px]/[26px] text-secondary-500 font-normal">
            {data.likes > 9999 ? "9999+" : data.likes}
          </p>
        </div>
      </div>
    </div>
  );
}
