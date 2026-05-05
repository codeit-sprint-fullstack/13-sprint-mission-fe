import "../styles/components/pagination.css";
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
    <div className="pagination">
      <button
        className="forth-back-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pageNumbers.map((num) => (
        <button
          className={`page-button ${num === currentPage ? "active" : ""}`}
          key={num}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="forth-back-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
