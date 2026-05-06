
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 0) return null;

  const pageLimit = 5;
  const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button 
        className="pagination-arrow" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      
      {pages.map((num) => (
        <button 
          key={num}
          className={`pagination-number ${currentPage === num ? 'active' : ''}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      
      <button 
        className="pagination-arrow" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;