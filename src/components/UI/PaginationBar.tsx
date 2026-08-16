import "./PaginationBar.css";
import LeftArrow from "../../assets/images/icons/arrow_left.svg?react";
import RightArrow from "../../assets/images/icons/arrow_right.svg?react";

interface PaginationBarProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (page: number) => void;
}

const PaginationBar = ({ totalPageNum, activePageNum, onPageChange }: PaginationBarProps) => {
  const maxVisiblePages = 5;
  let startPage: number;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <nav className="paginationBar" aria-label="페이지 이동">
      <button
        type="button"
        className="paginationButton"
        aria-label="이전 페이지"
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <LeftArrow />
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
          aria-label={`${page}페이지`}
          aria-current={activePageNum === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="paginationButton"
        aria-label="다음 페이지"
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <RightArrow />
      </button>
    </nav>
  );
};

export default PaginationBar;
