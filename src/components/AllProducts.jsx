import { useState, useEffect, useRef } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { useProductList } from '../hooks/useProductList'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

const ALL_PAGE_SIZE = { desktop: 10, tablet: 6, mobile: 4 }

export default function AllProducts() {
  const breakpoint = useBreakpoint()
  const pageSize = ALL_PAGE_SIZE[breakpoint]

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [orderBy, setOrderBy] = useState('recent')
  const timerRef = useRef(null)

  useEffect(() => { setPage(1) }, [breakpoint])

  const { list, totalCount, isLoading, error } = useProductList({ page, pageSize, keyword, orderBy })
  const totalPages = Math.ceil(totalCount / pageSize)

  function handleInput(e) {
    const val = e.target.value
    setInputValue(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setKeyword(val.trim())
      setPage(1)
    }, 400)
  }

  function handleSort(e) {
    setOrderBy(e.target.value)
    setPage(1)
  }

  return (
    <section className="section container">
      <div className="section-header">
        <h2>판매 중인 상품</h2>
        <div className="section-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="검색할 상품을 입력해주세요"
              value={inputValue}
              onChange={handleInput}
            />
          </div>
          <button className="btn-register">+ 상품 등록하기</button>
          <select className="sort-select" value={orderBy} onChange={handleSort}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      <ul className="product-list">
        {isLoading && <li className="empty">불러오는 중...</li>}
        {error && <li className="empty">데이터를 불러오지 못했습니다.</li>}
        {!isLoading && !error && list.length === 0 && (
          <li className="empty">검색 결과가 없습니다.</li>
        )}
        {list.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  )
}
