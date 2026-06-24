"use client";

import Image from "next/image";
import React, { useState } from "react";
import ic_sort from "@/assets/icons/ic_sort.svg";
import ic_arrow_down from "@/assets/icons/ic_arrow_down.svg";

export default function Dropdown({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("최신순");

  const handleSortClick = (laberl, value) => {
    setSelectedLabel(laberl);
    onSortChange(value);
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex gap-6 items-center justify-center w-[130px] h-[42px]  border border-gray-200 rounded-xl"
      >
        <p className="text-lg font-normal">최신순</p>
        <Image alt="드롭다운 버튼" src={ic_arrow_down} width={24} height={24} />
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden cursor-pointer flex justify-center items-center w-10.5 h-10.5 rounded-xl border border-gray-200 bg-white"
      >
        <Image
          src={ic_sort}
          alt="드롭다운 버튼"
          width={24}
          height={24}
          className="max-w-none "
        />
      </button>
      {isOpen && (
        <ul className="mt-1 absolute flex flex-col items-center w-[130px] right-0 ">
          <li
            onClick={() => handleSortClick("최신순", "latest")}
            className="cursor-pointer h-[42px] border border-gray-200 w-full bg-white flex justify-center items-center rounded-t-xl"
          >
            최신순
          </li>
          <li
            onClick={() => handleSortClick("오래된순", "oldest")}
            className="cursor-pointer h-[42px] border border-gray-200 w-full bg-white flex justify-center items-center rounded-b-xl"
          >
            오래된순
          </li>
        </ul>
      )}
    </div>
  );
}
