import React from "react";
import styles from "../../css/Button.module.css";

export default function LinkButton({
  href,
  size,
  type = "filled",
  disabled = false,
  children = "button",
}) {
  return (
    <a href={href} className={`${styles.btn} ${styles[size]} ${styles[type]}`}>
      {children}
    </a>
  );
}
