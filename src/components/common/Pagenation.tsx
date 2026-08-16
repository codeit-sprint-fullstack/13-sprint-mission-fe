"use client";
import { productAPI } from "@/lib/services/productApi";
import { useEffect, useState } from "react";

export default function Pagenation({
  currentPage,
  onPageChange,
}: {
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    async function getProduct() {
      const data = await productAPI.Get({
        page: 1,
        pageSize: 10,
        orderBy: "recent",
      });
      const totalSize = Math.ceil(data.totalCount / 10);
      setPages(Array.from({ length: totalSize }, (v, i) => i + 1));
    }
    getProduct();
  }, []);

  return (
    <div className="my-[5.5rem] mx-[45.5rem] min-w-[20rem] inline-flex justify-center items-start gap-[0.25rem] font-['Pretendard']">
      <button
        className="w-[2.5rem] h-[2.5rem] text-[#6b7280] text-[1rem] font-semibold text-center rounded-[2.5rem] border border-[#e5e7eb] bg-white flex items-center justify-center"
        onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
      >
        <img src="./src/assets/arrow_left.svg" alt="" />
      </button>
      <div className="flex gap-[0.25rem]">
        {pages &&
          pages.map((page) => (
            <button
              key={page}
              className={`w-[2.5rem] h-[2.5rem] text-[1rem] font-semibold text-center rounded-[2.5rem] border flex items-center justify-center transition-colors ${
                currentPage === page
                  ? "text-[#f9fafb] bg-[#2f80ed] border-[#2f80ed] leading-[1.625rem]"
                  : "text-[#6b7280] bg-white border-[#e5e7eb]"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
      </div>
      <button
        className="w-[2.5rem] h-[2.5rem] text-[#6b7280] text-[1rem] font-semibold text-center rounded-[2.5rem] border border-[#e5e7eb] bg-white flex items-center justify-center"
        onClick={() => onPageChange((prev) => Math.min(pages.length, prev + 1))}
      >
        <img src="./src/assets/arrow_right.svg" alt="" />
      </button>
    </div>
  );
}
