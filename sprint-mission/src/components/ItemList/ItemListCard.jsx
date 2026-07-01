"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./ItemListCard.module.css";

export default function ItemListCard({ id, image, name, price, favoriteCount }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(favoriteCount);

  const thumbnail = image && image.length > 0 ? image[0] : "/img/img-placeholder.svg";

  return (
    <Link href={`/items/${id}`} className={styles.wrapper}>
      <img className={styles.image} src={thumbnail} alt={name} />
      <div>
        <h3 className={`${styles.title} text-md-medium`}>{name}</h3>
        <p className={`${styles.price} text-lg-bold`}>{price.toLocaleString()}원</p>
        <div
          className={styles.container}
          onClick={(e) => {
            e.preventDefault();
            setLike((prev) => !prev);
            setLikeCount((prev) => (like ? prev - 1 : prev + 1));
          }}
        >
          <img
            className={styles.likeIcon}
            src={like ? "/icon/heart-fill.svg" : "/icon/heart.svg"}
            alt="좋아요"
          />
          <p className="text-xs-medium">{likeCount}</p>
        </div>
      </div>
    </Link>
  );
}
