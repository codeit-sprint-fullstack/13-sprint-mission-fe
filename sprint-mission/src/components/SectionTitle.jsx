import styles from "./SectionTitle.module.css";

export default function SectionTitle({ title = "title", children }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text-xl-bold`}>{title}</h2>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
