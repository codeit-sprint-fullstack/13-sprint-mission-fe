import { useBreakpoint } from '../hooks/useBreakpoint'
import { useProductList } from '../hooks/useProductList'
import ProductCard from './ProductCard'

const BEST_PAGE_SIZE = { desktop: 4, tablet: 2, mobile: 1 }

export default function BestProducts() {
  const breakpoint = useBreakpoint()
  const pageSize = BEST_PAGE_SIZE[breakpoint]

  const { list, isLoading, error } = useProductList({
    page: 1,
    pageSize,
    keyword: '',
    orderBy: 'favorite',
  })

  return (
    <section className="section container">
      <div className="section-header">
        <h2>🏆 베스트 상품</h2>
      </div>
      <ul className="best-list">
        {isLoading && <li className="empty">불러오는 중...</li>}
        {error && <li className="empty">데이터를 불러오지 못했습니다.</li>}
        {!isLoading && !error && list.length === 0 && (
          <li className="empty">베스트 상품이 없습니다.</li>
        )}
        {list.map((product) => (
          <ProductCard key={product.id} product={product} isBest />
        ))}
      </ul>
    </section>
  )
}
