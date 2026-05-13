import styles from "@/components/common/Button/Button.module.css";

export default function Button({
  className = "",
  variant = "primary",
  children,
  ...props
}) {
  const classNames = `${styles.button} ${styles[variant]} ${className}`;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
