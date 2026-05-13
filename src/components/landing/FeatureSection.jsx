import styles from "./FeatureSection.module.css";

export default function FeatureSection({
  title,
  heading,
  description,
  imgSrc,
  imgAlt,
  reverse = false,
}) {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${reverse ? styles.reverse : ""}`}>
        <img src={imgSrc} alt={imgAlt} className={styles.image} />
        <div
          className={`${styles.description} ${reverse ? styles.right : styles.left}`}
        >
          <p className={styles.title}>{title}</p>
          <div className={styles.content}>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.text}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
