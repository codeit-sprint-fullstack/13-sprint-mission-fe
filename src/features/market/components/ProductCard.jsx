import { getProductImage } from "../utils/imageMap";
// import { formatPrice } from "../utils/format";
import "../../../styles/product.css";

function ProductCard({ item, onLike, likedMap }) {
  const image = item.image || getProductImage(item.id);
  const displayLike = item.favoriteCount + (likedMap?.[item.id] || 0);

  return (
    <div className="product-card">
      <img src={image} alt={item.name} />

      <div className="content">
        <p className="name">{item.name}</p>
        <p className="price">{item.price}원</p>

        <button onClick={() => onLike(item.id)}>❤️ {displayLike}</button>
      </div>
    </div>
  );
  // const image = item.image || getProductImage(item.id);
  // return (
  //   <div className="product-card">
  //     <img src={image} alt={item.name} />
  //     <p className="name">{item.name}</p>
  //     <p className="price">{formatPrice(item.price)}원</p>
  //     <span>❤️ {item.favoriteCount}</span>
  //   </div>
  // );
}

export default ProductCard;
