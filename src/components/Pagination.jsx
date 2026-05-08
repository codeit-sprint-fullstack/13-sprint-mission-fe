import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const range = new Set([1, totalPages]);
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= totalPages) range.add(i);
  }

  const pages = [...range].sort((a, b) => a - b);
  const buttons = [];
  let prev = 0;

  for (const page of pages) {
    if (page - prev > 1) {
      buttons.push(<span key={`ellipsis-${page}`} className={styles.ellipsis}>···</span>);
    }
    buttons.push(
      <button
        key={page}
        className={page === currentPage ? styles.active : ''}
        onClick={() => onPageChange(page)}
        disabled={page === currentPage}
      >
        {page}
      </button>
    );
    prev = page;
  }

  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
      {buttons}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
    </div>
  );
}
