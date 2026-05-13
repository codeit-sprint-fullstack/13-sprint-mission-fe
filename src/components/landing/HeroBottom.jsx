import styles from "./HeroBottom.module.css";
import bottomImage from "../../assets/images/Img_home_bottom.png";

export default function HeroBottom() {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.text}>
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </p>
        <img
          src={bottomImage}
          alt="랜딩 하단 이미지"
          className={styles.bottomImg}
        />
      </div>
    </section>
  );
}
