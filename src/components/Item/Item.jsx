import React from "react";
import { icHeartEmpty } from "@/assets/icons";
import { defaultImg } from "@/assets/img";
import styles from "./Item.module.css";

export default function Item({ data }) {
  return (
    <div className={styles.container}>
      <img
        src={data.images[0] || defaultImg}
        loading="lazy"
        onError={(e) => {
          e.target.src = defaultImg;
        }}
        className={styles.img}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{data.name}</h2>
        <h3 className={styles.price}>{data.price.toLocaleString()}원</h3>
        <div className={styles.meta}>
          <img src={icHeartEmpty} />
          {data.favoriteCount}
        </div>
      </div>
    </div>
  );
}
