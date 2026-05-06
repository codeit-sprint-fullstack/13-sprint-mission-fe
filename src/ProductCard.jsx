import styles from "./ProductCard.module.css";
import defaultImage from "./assets/defaultImage.png";

function ProductCard({ item }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImage}
        src={item.images?.[0] || defaultImage}
        alt={item.name}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = defaultImage;
        }}
      />

      <p className={styles.cardName}>{item.name}</p>

      <h3 className={styles.cardPrice}>{item.price.toLocaleString()}원</h3>

      <span className={styles.favorite}>♡ {item.favoriteCount}</span>
    </div>
  );
}

export default ProductCard;
