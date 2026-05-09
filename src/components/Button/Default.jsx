import React from "react";
import styles from "../../css/Button.module.css";

const Button = ({
  size,
  variant = "filled",
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="text-lg-semibold">{children}</span>
    </button>
  );
};

export default Button;
