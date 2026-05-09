import React from "react";
import { Link } from "react-router";

import Button from "@/components/common/Button/Button";
import styles from "@/components/landing/Hero.module.css";

export default function Hero({ variant = "top", data }) {
  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{data.title}</h1>
          {variant === "top" && (
            <Link to='items'>
              <Button variant='secondary'>구경하러 가기</Button>
            </Link>
          )}
        </div>
        <img
          className={styles.heroImage}
          src={data.imgUrl}
          alt='히어로 이미지'
        />
      </div>
    </section>
  );
}
