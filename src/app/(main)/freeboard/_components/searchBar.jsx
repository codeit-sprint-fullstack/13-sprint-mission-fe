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
      <div className="flex w-[288px] items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 md:w-[242px] lg:w-[325px]">
        <Image src="/image/ic_search.svg" alt="search" width={20} height={20} />
        <input
          type="text"
          placeholder="게시글을 검색해보세요"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="text-md w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <button
        onClick={() => router.push("/freeboard/write")}
        className="bg-primary-100 text-md hidden rounded-xl px-5 py-2 font-semibold whitespace-nowrap text-white transition hover:opacity-90 md:block"
      >
        게시글 등록하기
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-xl border border-gray-200 p-2 md:w-32 md:justify-between md:px-5 md:py-2"
        >
          <Image
            src="/image/ic_sort.svg"
            alt="sort"
            width={24}
            height={24}
            className="md:hidden"
          />
          <span className="text-md hidden text-gray-800 md:block">
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
                className="text-md cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
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
