import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <section className={styles["main-blue"]}>
        <div className={styles["blue-frame"]}>
          <div className={styles["txt-box1"]}>
            <h1 className={styles["main-txt"]}>
              일상의 모든 물건을 <br />
              거래해 보세요
            </h1>

            <Link to="/items" className={styles["btn-look"]}>
              구경하러 가기
            </Link>
          </div>

          <img src="/img/main/box1-img.png" alt="손흔드는 판다" />
        </div>
      </section>

      <section className={styles["main-white"]}>
        <div className={styles["white-frame"]}>
          <Link to="/items" className={styles["image-link"]}>
            <img src="/img/main/box2-img.png" alt="인기 상품 확인" />
          </Link>

          <div className={styles["txt-frame"]}>
            <p className={styles["point-txt"]}>Hot item</p>
            <h2 className={styles["main-txt"]}>
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <p className={styles["sub-txt"]}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles["main-white"]}>
        <div className={styles["white-frame"]}>
          <div className={styles["txt-frame"]}>
            <p className={styles["point-txt"]}>Search</p>
            <h2 className={styles["main-txt"]}>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <p className={styles["sub-txt"]}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>

          <img src="/img/main/box3-img.png" alt="상품을 쉽게 찾아보세요" />
        </div>
      </section>

      <section className={styles["main-white"]}>
        <div className={styles["white-frame"]}>
          <Link to="src/assets/registration" className={styles["image-link"]}>
            <img src="/img/main/box4-img.png" alt="상품을 등록하세요" />
          </Link>

          <div className={styles["txt-frame"]}>
            <p className={styles["point-txt"]}>Register</p>
            <h2 className={styles["main-txt"]}>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <p className={styles["sub-txt"]}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles["box-between"]}>
        <div className={styles["main-blue"]}>
          <div className={styles["blue-frame"]}>
            <h2 className={styles["main-txt"]}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>

            <img src="/img/main/Img_home_bottom.png" alt="판다마켓 중고 거래" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
