import Image from "next/image";
import React from "react";
import arrowDown from "../../assets/ic_arrow_down.png";

export default function DropDown() {
  return (
    <button className="flex justify-between w-[8.125rem] h-[2.625rem] items-center px-[1.25rem] border border-[#E5E7EB] rounded-[0.75rem] bg-[#fff]">
      <span className="font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#1F2937]">
        최신순
      </span>
      <Image src={arrowDown} alt="아래 화살표"></Image>
    </button>
  );
}
