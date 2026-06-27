"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import SearchIcon from "@/assets/svg/ic_search.svg";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timerRef = useRef(null);

  const handleChange = (e) => {
    clearTimeout(timerRef.current);
    const keyword = e.target.value;
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (keyword) {
        params.set("keyword", keyword);
      } else {
        params.delete("keyword");
      }
      router.push(`?${params.toString()}`);
    }, 400);
  };

  return (
    <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-lg px-4 py-2">
      <Image
        src={SearchIcon}
        alt="검색"
        width={16}
        height={16}
        className="shrink-0"
      />
      <input
        type="text"
        defaultValue={searchParams.get("keyword") ?? ""}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
      />
    </div>
  );
}
