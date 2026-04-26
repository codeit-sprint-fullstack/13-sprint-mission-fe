import React from "react";
import { useState } from "react";
import heart from "../assets/icon/heart.svg";
import heartFill from "../assets/icon/heart-fill.svg";
import styles from "../css/ItemCard.module.css";

export default function ItemCard({ id, image, name, price, favoriteCount }) {
  const [like, setLike] = useState(false);
  const isLiked = like ? heartFill : heart;
  return (
    <div className={styles.wrapper} key={id}>
      <img className={styles.image} src={image} />
      <div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.price}>{price}</p>
        <div className={styles.container}>
          <img
            className={styles.likeIcon}
            onClick={() => setLike((prev) => !prev)}
            src={isLiked}
          />
          <p className={styles.favoriteCount}>{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
