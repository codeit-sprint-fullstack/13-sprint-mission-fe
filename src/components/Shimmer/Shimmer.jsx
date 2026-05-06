import styles from "./Shimmer.module.css";

export default function Shimmer({ children, className }) {
  return <div className={`${styles.skeleton} ${className}`}>{children}</div>;
}
