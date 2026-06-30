"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar({
  keyword,
  onKeywordChange,
  orderBy,
  onOrderChange,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const selected = orderBy === "favorite" ? "좋아요순" : "최신순";

  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* 검색창 */}
      <div className="flex w-[288px] items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 md:w-[242px] lg:w-[325px]">
        <Image src="/image/ic_search.svg" alt="search" width={24} height={24} />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="w-full bg-gray-100 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      {/* 상품 등록 버튼 - 태블릿/PC만 */}
      <button
        onClick={() => router.push("/registration")}
        className="bg-primary-100 hidden w-[133px] rounded-lg px-[23px] py-3 text-lg font-semibold whitespace-nowrap text-white transition hover:opacity-90 md:block"
      >
        상품 등록하기
      </button>

      {/* 드롭다운 */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-xl border border-gray-200 p-[9px] md:w-[130px] md:justify-between md:px-5 md:py-3"
        >
          <Image
            src="/image/ic_sort.svg"
            alt="sort"
            width={24}
            height={24}
            className="md:hidden"
          />
          <span className="hidden text-lg text-gray-800 md:block">
            {selected}
          </span>
          <Image
            src="/image/ic_arrow_down.svg"
            alt="arrow"
            width={24}
            height={24}
            className="hidden md:block"
          />
        </button>
        {isOpen && (
          <ul className="absolute right-0 z-10 mt-1 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onOrderChange(option.value);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
