"use client";

export default function Pagination({ totalPages, page, setPage }) {
  if (!totalPages || totalPages <= 0) return null;

  const pageLimit = 5;
  const startPage = Math.floor((page - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`text-md flex h-10 w-10 items-center justify-center rounded-full border transition ${
            page === num
              ? "bg-primary-100 border-primary-100 font-semibold text-white"
              : "border-gray-200 font-semibold text-gray-500 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 font-semibold text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
