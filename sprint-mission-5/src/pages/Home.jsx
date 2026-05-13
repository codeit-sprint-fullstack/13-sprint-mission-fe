import React from "react";
import styles from "./Home.module.css";
import hero from "../assets/images/hero.png";
import sec1 from "../assets/images/section1.png";
import sec2 from "../assets/images/section2.png";
import sec3 from "../assets/images/section3.png";
import footer from "../assets/images/footer.png";
import font from "../styles/typography.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles["section-wrap"]}>
        <section className={styles["hero-section"]}>
          <div className={styles["hero-content"]}>
            <p className={`${styles["hero-title"]} ${font["text-4xl-bold"]}`}>
              일상의 모든 물건을 거래해보세요
            </p>
            <button className={`${styles.button} ${font["text-xl-semibold"]}`}>
              구경하러가기
            </button>
          </div>
          <img src={hero} className={styles["hero-img"]} />
        </section>
      </div>

      <section className={styles["main-section"]}>
        <div className={styles["main-section-wrap"]}>
          <img src={sec1} className={styles["section-img"]} />
          <div className={styles["section-content"]}>
            <span
              className={`${styles["section-tag"]} ${font["text-2lg-bold"]}`}
            >
              Hot item
            </span>
            <p
              className={`${font["text-4xl-bold"]} ${styles["section-title"]} `}
            >
              인기 상품을 확인해 보세요
            </p>
            <p
              className={`${styles["section-description"]} ${font["text-2xl-medium"]}`}
            >
              가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles["main-section"]}>
        <div className={styles["main-section-wrap"]}>
          <img
            src={sec2}
            className={`${styles["section-img"]} ${styles.order}`}
          />
          <div className={`${styles["section-content"]} ${styles.right}`}>
            <span
              className={`${styles["section-tag"]} ${font["text-2lg-bold"]} ${styles.right}`}
            >
              Search
            </span>
            <p
              className={`${styles["section-title2"]} ${font["text-4xl-bold"]}`}
            >
              구매를 원하는 상품을 검색하세요
            </p>
            <p
              className={`${styles["section-description2"]} ${font["text-2xl-medium"]}`}
            >
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles["main-section"]}>
        <div className={styles["main-section-wrap"]}>
          <img src={sec3} className={`${styles["section-img"]}`} />
          <div className={`${styles["section-content"]}`}>
            <span
              className={`${styles["section-tag"]} ${font["text-2lg-bold"]}`}
            >
              Register
            </span>
            <p
              className={`${styles["section-title3"]} ${font["text-4xl-bold"]}`}
            >
              판매를 원하는 상품을 등록하세요
            </p>
            <p
              className={`${styles["section-description3"]} ${font["text-2xl-medium"]}`}
            >
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <div className={styles["section-wrap"]}>
        <section className={styles["hero-section"]}>
          <div className={styles["hero-content"]}>
            <p className={`${styles["hero-title"]} ${font["text-4xl-bold"]}`}>
              믿을 수 있는 판다마켓 중고 거래
            </p>
          </div>
          <img src={footer} className={styles["hero-img"]} />
        </section>
      </div>
    </main>
  );
}
