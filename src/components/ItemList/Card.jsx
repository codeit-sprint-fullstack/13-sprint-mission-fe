import React, { useEffect } from "react";
import { useState } from "react";
import heart from "../../assets/icon/heart.svg";
import heartFill from "../../assets/icon/heart-fill.svg";
import styles from "../../css/ItemCard.module.css";
import imgPlaceholder from "../../assets/img/img-placeholder.svg";

export default function ItemCard({
  key,
  id,
  image,
  name,
  price,
  favoriteCount,
}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(favoriteCount);
  const [error, setError] = useState(null);
  const isLiked = like ? heartFill : heart;

  const thumbnail = (image) => {
    if (!image || image.length === 0) {
      return imgPlaceholder;
    }
    return image[0];
  };

  useEffect(() => {
    async function postData() {
      try {
        const res = await fetch(
          `https://one3-sprint-mission-be.onrender.com/products/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favoriteCount: likeCount }),
          },
        );
      } catch (err) {
        setError(err.message);
      }
    }
    postData();
  }, [likeCount]);

  return (
    //리액트로웹사이트만들기 05~NotFound 24분 -> 카드링크붙이기 시연
    <div className={styles.wrapper}>
      <img className={styles.image} src={thumbnail(image)} />
      <div>
        <h3 className={`${styles.title} text-md-medium`}>{name}</h3>
        <p className={`${styles.price} text-lg-bold`}>{`${price}원`}</p>
        <div
          className={styles.container}
          onClick={() => {
            setLike((prev) => !prev);
            setLikeCount(likeCount + 1); // 하트 토글 기능과는 모순되나 좋아요수 구현을 위해 붙여본 부분으로 UX측면이 아닌 기능 구현으로 봐주세요
          }}
        >
          <img className={styles.likeIcon} src={isLiked} />
          <p className={`${styles.favoriteCount} text-xs-medium`}>
            {likeCount}
          </p>
        </div>
      </div>
    </div>
  );
}
