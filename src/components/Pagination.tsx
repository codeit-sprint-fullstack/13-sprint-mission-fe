"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i += 1) pages.push(i);

  const buttonClass = "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[15px] font-semibold text-gray-400 transition hover:border-panda-primary hover:text-panda-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button className={buttonClass} type="button" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${buttonClass} ${page === currentPage ? "border-panda-primary bg-panda-primary text-white hover:text-white" : ""}`}
          type="button"
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}

      <button className={buttonClass} type="button" disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)}>
        ›
      </button>
    </div>
  );
}
