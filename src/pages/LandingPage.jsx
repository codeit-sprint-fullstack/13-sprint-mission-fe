import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import homeTop from "../assets/images/Img_home_top.png";
import home01 from "../assets/images/Img_home_01.png";
import home02 from "../assets/images/Img_home_02.png";
import home03 from "../assets/images/Img_home_03.png";
import homeBottom from "../assets/images/Img_home_bottom.png";

function LandingPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                일상의 모든 물건을 <br />
                거래해 보세요
              </h1>
              <Link to="/items" className="btn btn--primary">
                구경하러 가기
              </Link>
            </div>
            <div className={styles.heroVisual}>
              <img src={homeTop} alt="판다끼리 중고 거래 하고 있는 이미지" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredProducts}>
        <div className="container">
          <div className={styles.featuredProductsInner}>
            <div className={styles.featuredProductsMedia}>
              <img src={home01} alt="인기 중고 물품들 모음" />
            </div>
            <div className={styles.featuredProductsContent}>
              <span className={styles.featuredProductsLabel}>Hot Item</span>
              <h2 className={styles.featuredProductsTitle}>
                인기 상품을
                <br />
                확인해 보세요
              </h2>
              <p className={styles.featuredProductsDescription}>
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.featuredProducts} ${styles.featuredProductsReverse}`}
      >
        <div className="container">
          <div className={styles.featuredProductsInner}>
            <div className={styles.featuredProductsMedia}>
              <img src={home02} alt="인기 중고 물품들 모음" />
            </div>
            <div className={styles.featuredProductsContent}>
              <span className={styles.featuredProductsLabel}>Search</span>
              <h2 className={styles.featuredProductsTitle}>
                구매를 원하는 <br />
                상품을 검색하세요
              </h2>
              <p className={styles.featuredProductsDescription}>
                구매하고 싶은 물품은 검색해서 <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredProducts}>
        <div className="container">
          <div className={styles.featuredProductsInner}>
            <div className={styles.featuredProductsMedia}>
              <img src={home03} alt="인기 중고 물품들 모음" />
            </div>
            <div className={styles.featuredProductsContent}>
              <span className={styles.featuredProductsLabel}>Register</span>
              <h2 className={styles.featuredProductsTitle}>
                판매를 원하는 <br />
                상품을 등록하세요
              </h2>
              <p className={styles.featuredProductsDescription}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.hero} ${styles.heroTrust}`}>
        <div className="container">
          <div className={`${styles.heroInner} ${styles.heroInnerReverse}`}>
            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>
                믿을 수 있는 <br />
                판다마켓 중고 거래
              </h2>
            </div>
            <div className={styles.heroVisual}>
              <img src={homeBottom} alt="판다끼리 중고 거래 하고 있는 이미지" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
