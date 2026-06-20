import Image from "next/image";
import React from "react";
import searchImg from "../../assets/ic_search.png";

export default function Input() {
  return (
    <div className="flex gap-[0.625rem] shrink-0 w-[65.875rem] h-[2.625rem] items-start py-[0.5625rem] px-[1.25rem] bg-[#F3F4F6] rounded-[0.75rem]">
      <Image src={searchImg} alt="검색이미지"></Image>
      <input
        className="w-full font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
        placeholder="검색할 상품을 입력해주세요"
      />
    </div>
  );
}
