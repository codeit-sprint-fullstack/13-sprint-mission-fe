import styles from "./Button.module.css";

export default function Button({ size, variant = "filled", disabled = false, children, onClick }) {
  return (
    <button
      className={`${styles.btn} ${size ? styles[size] : ""} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="text-lg-semibold">{children}</span>
    </button>
  );
}
