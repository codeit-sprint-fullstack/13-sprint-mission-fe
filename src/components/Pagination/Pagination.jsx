import "../../styles/pagination.css";

function Pagination({ totalCount, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const pageLimit = 5;
  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  const pageNumbers = [];
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container" aria-label="페이지 네비게이션">
      <button
        className="btn-pagination-nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="이전 페이지"
      >
        &lt;
      </button>

      {pageNumbers.map((num) => (
        <button
          className={`btn-pagination-page ${num === currentPage ? "is-active" : ""}`}
          key={num}
          onClick={() => onPageChange(num)}
          aria-current={num === currentPage ? "page" : undefined}
        >
          {num}
        </button>
      ))}

      <button
        className="btn-pagination-nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  );
}

export default Pagination;