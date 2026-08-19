"use client";

import { FormEvent, useEffect, useState } from "react";

import Image from "next/image";
import searchIcon from "@/assets/icons/ic_search.svg";

interface SearchBarProps {
  className?: string;
  currentKeyword?: string;
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  className = "",
  currentKeyword = "",
  onSearch,
  placeholder = "검색어를 입력해주세요",
}: SearchBarProps) {
  const [keyword, setKeyword] = useState(currentKeyword || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(currentKeyword || "");
    }, 0);

    return () => clearTimeout(timer);
  }, [currentKeyword]);

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword.trim());
    }
  }

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={`bg-secondary-100 flex h-10.5 w-81.25 flex-col rounded-xl py-[0.56rem] pr-5 pl-4 ${className}`}
    >
      <div className="flex h-full items-center gap-1">
        <Image src={searchIcon} alt="검색 아이콘" width={24} height={24} />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          className="text-secondary-900 placeholder:text-secondary-400 w-full items-center bg-transparent text-[1rem] font-normal outline-none"
        />
      </div>
    </form>
  );
}
