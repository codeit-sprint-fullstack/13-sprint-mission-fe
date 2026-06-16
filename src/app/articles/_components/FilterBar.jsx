"use client";

import { SORT_OPTIONS } from "@/lib/constants/constants";
import Image from "next/image";
import { useState, useCallback } from "react";

import IcSearch from "@/app/assets/ic_search.svg";
import IcArrowDown from "@/app/assets/ic_arrow_down.svg";
import IcSort from "@/app/assets/ic_sort.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function FilterBar({ search = "", order = "recent" }) {
  const [showOptions, setShowOptions] = useState(false); // 필터 옵션 토글

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLabel = SORT_OPTIONS.find((o) => o.value === order)?.label; // 현재 필터 옵션 텍스트

  function updateParams(updates) {
    const params = new URLSearchParams({
      search: searchParams.get("search") ?? "",
      order: searchParams.get("order") ?? "recent",
    });
    Object.entries(updates).forEach(([k, v]) => params.set(k, v));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSelectSort(value) {
    setShowOptions(false);
    updateParams({ order: value });
  }

  const handleKeyword = useDebounce(
    (value) => updateParams({ search: value, page: 1 }),
    300,
  );

  return (
    <article className='flex flex-wrap md:flex-nowrap items-center gap-[16px]'>
      <div className='relative flex flex-1 order-3 md:order-1'>
        <Image
          className='absolute top-[50%] left-[16px] z-search-icon w-[24px] h-[24px] -translate-y-1/2'
          src={IcSearch}
          alt='검색 아이콘'
          width={24}
          height={24}
        />
        <input
          type='text'
          name='searchInput'
          placeholder='검색할 상품을 입력해주세요'
          className='flex flex-col items-start w-full h-[42px] py-[9px] pr-[44px] pl-[44px] rounded-xl text-secondary-900 bg-cool-gray-100 leading-[calc(26/16)] placeholder:text-secondary-400'
          defaultValue={search}
          onChange={(e) => handleKeyword(e.target.value)}
        />
      </div>

      <div className='relative order-4 md:order-1'>
        <div
          className='flex items-center justify-between gap-[5px] w-[42px] md:w-[130px] h-[42px] md:h-[42px] py-[12px] px-[20px] p-[16px] rounded-xl border border-cool-gray-200 bg-white cursor-pointer'
          onClick={() => setShowOptions(!showOptions)}
        >
          <div className='hidden md:block pointer-events-none md:pointer-events-auto leading-[calc(26/16)] text-secondary-800'>
            {currentLabel}
          </div>
          <Image
            className='hidden md:absolute md:block pointer-events-none md:pointer-events-auto right-[20px]'
            src={IcArrowDown}
            alt='PC 정렬 화살표 방향'
            width={24}
            height={24}
          />
          <Image
            className='absolute block md:hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:pointer-events-none'
            src={IcSort}
            alt='모바일 정렬 화살표 방향'
            width={24}
            height={24}
          />
        </div>

        {showOptions && (
          <ul className='absolute top-[50px] right-0 z-sort-select flex flex-col items-start w-[130px] rounded-xl border border-cool-gray-200 bg-white overflow-hidden'>
            {SORT_OPTIONS.map((option) => (
              <li
                key={option.value}
                className='w-full first:border-b border-cool-gray-200 '
              >
                <button
                  type='button'
                  className='flex items-center justify-center w-full h-[42px] pt-[9px] pb-[7px] leading-[calc(26/16)] text-secondary-800 transition-all duration-300 cursor-pointer hover:text-white hover:bg-primary-100'
                  onClick={() => handleSelectSort(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
