export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const range = new Set([1, totalPages])
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= totalPages) range.add(i)
  }
  const pages = [...range].sort((a, b) => a - b)

  const items = []
  let prev = 0
  for (const page of pages) {
    if (page - prev > 1) items.push({ type: 'ellipsis', key: `e-${page}` })
    items.push({ type: 'page', page, key: page })
    prev = page
  }

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>‹</button>
      {items.map((item) =>
        item.type === 'ellipsis' ? (
          <span key={item.key} className="pagination-ellipsis">···</span>
        ) : (
          <button
            key={item.key}
            className={item.page === currentPage ? 'active' : ''}
            onClick={() => item.page !== currentPage && onPageChange(item.page)}
          >
            {item.page}
          </button>
        )
      )}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>›</button>
    </div>
  )
}
