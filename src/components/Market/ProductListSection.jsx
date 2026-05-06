
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

function ProductListSection({ 
  products, 
  page, 
  onPageChange, 
  totalPages, 
  keyword, 
  onKeywordChange, 
  orderBy, 
  onOrderChange 
}) {

  
  return (
    <section className="product-list-section">
      <div className="list-header">
        <h2 className="section-title">판매 중인 상품</h2>
        <SearchBar 
          keyword={keyword} 
          onKeywordChange={onKeywordChange}
          orderBy={orderBy} 
          onOrderChange={onOrderChange}
        />
      </div>

      <div className="product-grid list-grid">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={onPageChange} 
      />
    </section>
  );
}

export default ProductListSection;