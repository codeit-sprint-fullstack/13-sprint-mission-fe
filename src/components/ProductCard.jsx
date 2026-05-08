import { useState } from 'react';
import styles from './ProductCard.module.css';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  return `${Math.floor(diff / 2592000)}달 전`;
}

export default function ProductCard({ product, isBest = false }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = product.images?.[0] || `https://picsum.photos/seed/${product.id}/400/400`;

  return (
    <li className={`${styles.card} ${isBest ? styles.best : ''}`}>
      <div className={styles.imgWrap}>
        {imgError ? (
          <div className={styles.placeholder}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
        ) : (
          <img src={imgSrc} alt={product.name} onError={() => setImgError(true)} />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.tags}>
          {(product.tags || []).slice(0, 2).map((t) => (
            <span key={t} className={styles.tag}># {t}</span>
          ))}
        </div>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.price.toLocaleString()}원</p>
        <div className={styles.footer}>
          <span className={styles.like}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {product.favoriteCount ?? 0}
          </span>
          <span className={styles.date}>{timeAgo(product.createdAt)}</span>
        </div>
      </div>
    </li>
  );
}
