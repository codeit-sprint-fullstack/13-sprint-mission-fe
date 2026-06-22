"use client";

import Image from "next/image.js";
import searchIcon from "@/asset/icon/ic_search.png";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useDebouncing from "@/utils/useDebouncing.js";
import useUpdateQuery from "@/utils/useUpdateQuery.js";
import { useSearchParams } from "next/navigation.js";

export default function SearchBox({ className = "" }) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const debouncedKeyword = useDebouncing(keyword, 500);
  const updateQuery = useUpdateQuery();

  useEffect(() => {
    const current = searchParams.get("keyword") ?? "";
    if (current === debouncedKeyword) return;

    updateQuery("keyword", debouncedKeyword);
  }, [updateQuery, debouncedKeyword, searchParams]);

  return (
    <div
      className={clsx(
        "w-72 h-10.5 md:w-140 lg:w-full lg:max-w-263.5 pl-4 pr-5 py-2.25 flex gap-1 bg-secondary-gray-100 rounded-xl",
        className,
      )}
    >
      <Image className={clsx("w-6 h-6")} src={searchIcon} alt="검색 아이콘" />
      <input
        className={clsx(
          "flex-1 text-400-16 placeholder:text-secondary-gray-400 ",
        )}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      ></input>
    </div>
  );
}
