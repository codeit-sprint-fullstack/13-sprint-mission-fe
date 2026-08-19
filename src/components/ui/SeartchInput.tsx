"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchInput({ defaultValue = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(defaultValue);
  const [debouncedKeyword] = useDebounce(keyword, 300);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (debouncedKeyword) {
      newParams.set("keyword", debouncedKeyword);
    } else {
      newParams.delete("keyword");
    }
    newParams.set("page", "1");

    const newQuery = newParams.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      router.replace(`${pathname}?${newQuery}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-[24px] leading-none text-gray-400">
        ⌕
      </span>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색할 상품을 입력해주세요"
        className="w-full rounded-[12px] bg-gray-100 h-[54px] tablet:h-[42px] py-[9px] pl-14 tablet:pl-12 pr-5 text-[16px] text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
}
