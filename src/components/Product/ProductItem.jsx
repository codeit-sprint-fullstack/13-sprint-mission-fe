import React from "react";

import { Link } from "react-router";

import noImage from "@/assets/images/common/img_default.svg";
import heartIc from "@/assets/images/icons/ic_heart.svg";
import styles from "@/components/Product/ProductItem.module.css";

export default function ProductItem({ products }) {
  return (
    <>
      {products?.list?.map((p) => (
        <Link to={p._id} key={p._id}>
          <article>
            <div className={styles.imgContainer}>
              <img
                className={styles.productImg}
                src={p.images?.[0] ?? noImage}
                alt={p.name}
              />
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
        </Link>
      ))}
    </>
  );
}
