import React from "react";
import styles from "./Button.module.css";

export default function Button({
  variant,
  children,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn-${variant}`]}`}
    >
      {children}
    </button>
  );
}
