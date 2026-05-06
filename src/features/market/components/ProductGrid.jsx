import ProductCard from "./ProductCard";
import "../../../styles/grid.css";

function ProductGrid({ products, type, onLike, likedMap }) {
  return (
    <div className={`grid ${type}`}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onLike={onLike}
          likedMap={likedMap}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
