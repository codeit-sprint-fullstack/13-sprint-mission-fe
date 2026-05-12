import styles from "./FormField.module.css";

export default function FormField({ label, htmlFor, error, children }) {
  return (
    <>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
}
