import { Link } from "react-router-dom";
import styles from "./HeroTop.module.css";
import topImage from "../../assets/images/Img_home_top.png";

export default function HeroTop() {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.description}>
          <h1 className={styles.text}>
            일상의 모든 물건을
            <br />
            거래해 보세요.
          </h1>
          <Link to="/items" className={styles.itemBtn}>
            구경하러 가기
          </Link>
        </div>
        <img src={topImage} alt="랜딩 상단 이미지" className={styles.topImg} />
      </div>
    </section>
  );
}
