import Image from "next/image";
import BtnLeft from "@/assets/svg/ic_arrow_left.svg";
import BtnRight from "@/assets/svg/ic_arrow_right.svg";

const PAGE_BLOCK = 5;

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentBlock = Math.ceil(currentPage / PAGE_BLOCK);
  const startPage = (currentBlock - 1) * PAGE_BLOCK + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK - 1, totalPages);
  const pages = Array.from(
    { length: Math.max(endPage - startPage + 1, 0) },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex gap-2 items-center justify-center mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        aria-label="이전 페이지"
      >
        <Image src={BtnLeft} alt="이전" width={15} height={15} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full border text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-primary-100 text-white border-primary-100"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        aria-label="다음 페이지"
      >
        <Image src={BtnRight} alt="다음" width={15} height={15} />
      </button>
    </div>
  );
}
