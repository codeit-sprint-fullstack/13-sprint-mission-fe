import React from "react";
import styles from "./Card.module.css";

export default function Card({ tag, title, text, flip = false, ...imgProps }) {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles["card"]} ${flip && styles["flip"]}`}>
        <img {...imgProps} className={styles.cardImg} />
        <div className={styles.cardContent}>
          <div className="flipped-card-div">
            <p className={styles.cardTag}>{tag}</p>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
