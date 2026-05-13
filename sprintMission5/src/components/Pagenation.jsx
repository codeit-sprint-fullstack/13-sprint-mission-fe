import "/src/css/pagenation.css";

export default function Pagenation({ currentPage, onPageChange, pages }) {
  return (
    <div className="pagination-area">
      <button
        className="nav-btn"
        onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
      >
        <img src="./src/assets/arrow_left.svg" alt="" />
      </button>
      <div className="page-numbers">
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="nav-btn"
        onClick={() => onPageChange((prev) => Math.min(pages.length, prev + 1))}
      >
        <img src="./src/assets/arrow_right.svg" alt="" />
      </button>
    </div>
  );
}
