import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components";
import styles from "./Hero.module.css";

export default function Hero({ text, img, children }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroText}>{text}</h2>
          {children}
        </div>
        <img src={img} alt="hero image" className={styles.heroImg} />
      </div>
    </section>
  );
}
