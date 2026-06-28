import Link from "next/link";
import styles from "./Button.module.css";

export default function LinkButton({ href, size, type = "filled", disabled = false, children = "button" }) {
  return (
    <Link href={href} className={`${styles.btn} ${size ? styles[size] : ""} ${styles[type]}`}>
      {children}
    </Link>
  );
}
