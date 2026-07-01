"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ArticleSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event) => {
    const keyword = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (keyword.trim()) {
      params.set("query", keyword);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center bg-gray-100 rounded-xl gap-1 flex-1 mr-4 px-4 py-2">
      <Image src="/images/ic_search.svg" alt="" width={24} height={24} />
      <input
        type="search"
        placeholder="검색할 상품을 입력해주세요"
        defaultValue={searchParams.get("query") ?? ""}
        onChange={handleSearch}
        className="bg-transparent flex-1 outline-none text-body-md text-gray-800 placeholder:text-gray-400"
      />
    </div>
  );
}
