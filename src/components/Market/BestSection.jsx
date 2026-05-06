
import ProductCard from './ProductCard';

function BestSection({ products }) {
  return (
    <section className="best-section">
      <h2 className="section-title">베스트 상품</h2>
      <div className="product-grid best-grid">
        {products.map((item) => (
          <ProductCard key={`best-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export default BestSection;