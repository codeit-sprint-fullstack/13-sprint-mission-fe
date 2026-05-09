import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <img
        src="/img/main/img_default.svg"
        alt="상품 기본 이미지"
        className={styles.image}
      />

      <p className={styles.name}>{product.name}</p>

      <strong className={styles.price}>
        {product.price.toLocaleString()}원
      </strong>

      <span className={styles.favorite}>♡ {product.favoriteCount}</span>
    </article>
  );
}

export default ProductCard;
