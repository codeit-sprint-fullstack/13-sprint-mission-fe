import React from "react";

import heartIc from "@/assets/ic_heart.svg";
import styles from "@/components/Product/ProductItem.module.css";

export default function ProductItem({ products }) {
  return (
    <>
      {products?.list?.map((p) => (
        <article key={p.id} className={styles.productItem}>
          <div className={styles.imgContainer}>
            <img className={styles.productImg} src={p.images[0]} alt='test' />
          </div>
          
          <div>
            <p className={styles.title}>{p.name}</p>
            <p className={styles.price}>{p.price.toLocaleString()}원</p>
            <div className={styles.likeInfo}>
              <img
                className={styles.heartImg}
                src={heartIc}
                alt={`${p.name} 좋아요`}
              />
              <span className={styles.countNum}>{p.favoriteCount}</span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
