"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

// 검색바 - 제출 시 URL keyword를 갱신한다. (page는 1로 초기화)
export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // e.currentTarget이 폼 자체라 elements로 name="keyword" 입력을 꺼낸다
  // (e.target은 EventTarget이라 폼 요소 접근이 안 됨 - 교안 28 참고)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("keyword");
    // namedItem은 Element | RadioNodeList | null을 반환함
    // instanceof로 좁히면 폼 구조가 바뀌어도 컴파일러가 거짓말을 안함
    if (!(input instanceof HTMLInputElement)) return;
    const keyword = input.value.trim();

    const params = new URLSearchParams(searchParams);
    if (keyword) params.set("keyword", keyword);
    else params.delete("keyword");
    params.delete("page"); // 검색하면 1페이지부터

    router.push(`/boards?${params}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <span className="absolute top-1/2 left-4 -translate-y-1/2">
        <Image
          src="/icons/ui/ic_search.svg"
          alt="검색"
          width={24}
          height={24}
        />
      </span>
      <input
        name="keyword"
        type="text"
        defaultValue={searchParams.get("keyword") ?? ""}
        placeholder="검색할 상품을 입력해주세요"
        className="h-11 w-full rounded-lg bg-gray-100 pr-4 pl-11 text-base text-gray-800 placeholder:text-gray-400"
      />
    </form>
  );
}
