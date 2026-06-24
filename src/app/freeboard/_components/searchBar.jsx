"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar({ keyword, orderBy }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const selected = orderBy === "like" ? "좋아요순" : "최신순";

  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "like" },
  ];

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-1 rounded-xl bg-gray-100 py-2.25 pr-5 pl-4 font-normal">
        <Image src="/image/ic_search.svg" alt="search" width={20} height={20} />
        <input
          type="text"
          placeholder="검색할 게시글을 입력해 주세요"
          defaultValue={keyword}
          onChange={(e) =>
            router.replace(
              `/freeboard?keyword=${e.target.value}&orderBy=${orderBy}`,
            )
          }
          className="w-full bg-transparent text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-xl border border-gray-200 p-2.25 md:h-10.5 md:w-32.5 md:justify-between md:rounded-xl md:bg-white md:px-5 md:py-3"
        >
          <Image
            src="/image/ic_sort.svg"
            alt="sort"
            width={24}
            height={24}
            className="md:hidden"
          />
          <span className="hidden text-md text-gray-800 md:block">
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
                  router.replace(
                    `/freeboard?keyword=${keyword}&orderBy=${option.value}`,
                  );
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
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
