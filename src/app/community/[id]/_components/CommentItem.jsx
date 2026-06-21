"use client";

import DropDownList from "@/components/common/DropDownList";
import Image from "next/image";
import React, { useState } from "react";
import kebabImg from "../../../../assets/ic_kebab.png";
import profileImg from "../../../../assets/ic_profile.svg";

export default function CommentItem() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, isOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-[1.5rem] w-full pb-[0.75rem] border-b border-[#E5E7EB] bg-[#FCFCFC]">
      <div className="flex justify-between items-start gap-[0.5rem] self-stretch relative">
        <h2 className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#1F2937]">
          혹시 사용기간이 어떻게 되실까요?
        </h2>
        <Image
          className="cursor-pointer"
          src={kebabImg}
          alt="옵션 이미지"
          onClick={() => isOpen(!open)}
        ></Image>
        {open && <DropDownList></DropDownList>}
      </div>
      <div className="flex gap-[0.5rem] items-start">
        <Image
          className="w-[2rem] h-[2rem]"
          src={profileImg}
          alt="프로필 이미지"
        />
        <div className="flex flex-col items-start gap-[0.25rem]">
          <span className="font-pretendard text-[0.75rem] font-[400] leading-[1.125rem] text-[#4B5563]">
            똑똑한 판다
          </span>
          <span className="font-pretendard text-[0.75rem] font-[400] leading-[1.125rem] text-[#9CA3AF]">
            1시간전
          </span>
        </div>
      </div>
    </div>
  );
}
