"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalCount,
  pageSize,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const btnBase =
    "w-10 h-10 rounded-full flex items-center justify-center text-sm cursor-pointer border border-gray-200 text-gray-500";

  return (
    <div className="flex justify-center items-center gap-1 my-8 mb-35">
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${btnBase} disabled:opacity-30`}
      >
        &lt;
      </button>

      {(() => {
        const VISIBLE = 5;
        const startPage =
          Math.floor((currentPage - 1) / (VISIBLE - 1)) * (VISIBLE - 1) + 1;
        const endPage = Math.min(startPage + VISIBLE - 1, totalPages);
        return Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        );
      })().map((page) => (
        <button
          key={page}
          onClick={() => handlePage(page)}
          className={`${btnBase} ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${btnBase} disabled:opacity-30`}
      >
        &gt;
      </button>
    </div>
  );
}
