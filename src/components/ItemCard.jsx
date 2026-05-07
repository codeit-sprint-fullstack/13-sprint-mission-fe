import React from "react";
import { useState } from "react";
import heart from "../assets/icon/heart.svg";
import heartFill from "../assets/icon/heart-fill.svg";
import styles from "../css/ItemCard.module.css";
import imgPlaceholder from "../assets/img/img-placeholder.svg";

export default function ItemCard({ id, image, name, price, favoriteCount }) {
  const [like, setLike] = useState(false);
  const isLiked = like ? heartFill : heart;

  // 배열 형태의 이미지 데이터가 props로 들어왔다.
  const thumbnail = (image) => {
    if (!image || image.length === 0) {
      return imgPlaceholder;
    }
    return image[0];
  };

  return (
    //리액트로웹사이트만들기 05~NotFound 24분 -> 카드링크붙이기 시연
    <div className={styles.wrapper}>
      <img className={styles.image} src={thumbnail(image)} />
      <div>
        <h3 className={`${styles.title} text-md-medium`}>{name}</h3>
        <p className={`${styles.price} text-lg-bold`}>{`${price}원`}</p>
        <div className={styles.container}>
          <img
            className={styles.likeIcon}
            onClick={() => setLike((prev) => !prev)}
            src={isLiked}
          />
          <p className={`${styles.favoriteCount} text-xs-medium`}>
            {favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}
