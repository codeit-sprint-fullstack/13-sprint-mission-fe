import React from "react";
import styles from "../css/SectionTitle.module.css";

const SectionTitle = ({ title = "title", children }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default SectionTitle;
