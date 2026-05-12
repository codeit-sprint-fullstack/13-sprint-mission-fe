import "../styles/items.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image || "/images/default.png"} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{Number(product.price).toLocaleString()}원</p>
      </div>

      <span className="favorite">♡ 0</span>
    </div>
  );
}

export default ProductCard;
