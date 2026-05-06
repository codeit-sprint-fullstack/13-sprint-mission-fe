import "../../../styles/pagination.css";

function Pagination({ page, setPage, totalCount, pageSize }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const currentGroup = Math.floor((page - 1) / 5);
  const startPage = currentGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const isFirstGroup = startPage === 1;
  const isLastGroup = endPage === totalPages;

  return (
    <div className="pagination">
      <button disabled={isFirstGroup} onClick={() => setPage(startPage - 1)}>
        {"<"}
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={page === num ? "active" : ""}
        >
          {num}
        </button>
      ))}

      <button disabled={isLastGroup} onClick={() => setPage(endPage + 1)}>
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
