import React from "react";

import styles from "@/components/landing/SectionBanner.module.css";

export default function SectionBanner({ data, index }) {
  return (
    <section
      className={`${styles.banner} ${index % 2 !== 0 ? styles.secondary : ""}`}
    >
      <div className={styles.bannerInner}>
        <img
          className={styles.bannerImage}
          src={data.imgUrl}
          alt={data.imgAlt}
        />
        <div className={styles.bannerContent}>
          <span className={styles.bannerCaption}>{data.caption}</span>
          <p className={styles.bannerTitle}>{data.title}</p>
          <p className={styles.bannerDesc}>{data.description}</p>
        </div>
      </div>
    </section>
  );
}
