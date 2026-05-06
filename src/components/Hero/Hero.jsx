import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components";
import styles from "./Hero.module.css";

export default function Hero({ text, img, children }) {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerWrapper}>
        <div className={styles.bannerContent}>
          <h2 className={styles.bannerText}>{text}</h2>
          {children}
        </div>
        <img src={img} alt="banner image" className={styles.bannerImg} />
      </div>
    </section>
  );
}
