import { PAGE_LIMIT } from "../constants/common";
import "../styles/pagination.css";
function Pagination({ totalCount, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const startPage = Math.floor((currentPage - 1) / PAGE_LIMIT) * PAGE_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePagePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handlePageNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (num) => {
    onPageChange(num);
  };

  return (
    <div className="pagination">
      <button
        className="forth-back-button"
        disabled={currentPage === 1}
        onClick={handlePagePrevClick}
      >
        &lt;
      </button>

      {pageNumbers.map((num) => (
        <button
          className={`page-button ${num === currentPage ? "active" : ""}`}
          key={num}
          onClick={() => handlePageClick(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="forth-back-button"
        disabled={currentPage === totalPages}
        onClick={handlePageNextClick}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
