"use client";

import { PAGE_LIMIT } from "@/constants/common";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const startPage = Math.floor((currentPage - 1) / PAGE_LIMIT) * PAGE_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="mt-10.75 mb-35 flex items-center justify-center gap-1">
      <button
        className="text-cool-gray-600 border-secondary-100 flex h-10 w-10 items-center justify-center rounded-[40px] border hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`text-cool-gray-600 flex h-10 w-10 items-center justify-center rounded-[40px] border text-lg font-semibold transition-colors ${
            num === currentPage
              ? "bg-primary-100 font-bold text-white"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        className="text-cool-gray-600 flex h-10 w-10 items-center justify-center rounded-[40px] border border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
