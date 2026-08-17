"use client";

import { useState } from "react";
import ProductCard from "./_components/ProductCard";
import Pagenation from "@/components/common/Pagenation";

export default function ProductPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("최신순");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="mt-[5.88rem] mx-[22.5rem] mb-[23.9rem] inline-flex flex-col items-start gap-[2.5rem] font-['Pretendard']">
      <h2 className="text-[#111827] text-[1.25rem] font-bold leading-[2rem]">
        베스트 상품
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5rem]">
        <ProductCard
          prob={{
            page: 1,
            pageSize: 4,
            orderBy: "favorite",
          }}
          classname="flex flex-col items-start gap-[1rem] bg-[#fcfcfc]"
        ></ProductCard>
      </ul>

      <div className="w-[75rem] inline-flex justify-between">
        <h2 className="text-[#111827] text-[1.25rem] font-bold leading-[2rem]">
          판매중인 상품
        </h2>
        <div className="inline-flex items-center gap-[0.75rem]">
          <input
            className="flex w-[20.3125rem] h-[2.625rem] pt-[0.5625rem] pr-[1.25rem] pb-[0.5625rem] pl-[1rem] flex-col items-start gap-[0.625rem] rounded-[0.75rem] border-none bg-[#f3f4f6] outline-none"
            type="text"
            placeholder="검색 할 상품을 입력해주세요."
          />
          <button className="flex h-[2.625rem] px-[1.4375rem] py-[0.75rem] justify-center items-center gap-[0.625rem] border-none rounded-[0.5rem] bg-[#3692ff] text-[#f3f4f6] text-[1rem] font-semibold leading-[1.625rem]">
            상품 등록하기
          </button>
          <div
            className="relative flex h-[2.625rem] px-[1.25rem] py-[0.75rem] flex-col items-start gap-[0.625rem] rounded-[0.75rem] border border-[#e5e7eb] bg-white cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex justify-center items-start gap-[1.5rem] flex-1 text-[#1f2937] text-[1rem] font-normal leading-[1.625rem]">
              {selected}
              <img
                className="w-[1.5rem] h-[1.5rem]"
                src="./src/assets/ic_arrow_down.svg"
                alt="화살표 이미지"
              />
            </span>

            {isOpen && (
              <ul className="absolute left-[-1px] top-[calc(100%+0.25rem)] z-10 flex w-[8.125rem] flex-col items-start text-center line-height-[2.5rem]">
                <li
                  className="w-[8.125rem] h-[2.625rem] flex items-center justify-center rounded-t-[0.75rem] border border-[#e5e7eb] bg-white cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected("최신순");
                    setIsOpen(false);
                  }}
                >
                  최신순
                </li>
                <li
                  className="w-[8.125rem] h-[2.625rem] flex items-center justify-center rounded-b-[0.75rem] border-r border-b border-l border-[#e5e7eb] bg-white cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected("좋아요순");
                    setIsOpen(false);
                  }}
                >
                  좋아요순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[1.5rem]">
        <ProductCard
          prob={{
            page: currentPage,
            pageSize: 10,
            orderBy: selected === "최신순" ? "recent" : "favorite",
          }}
          classname="sale-product"
        ></ProductCard>
      </ul>
      <Pagenation
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      ></Pagenation>
    </div>
  );
}
