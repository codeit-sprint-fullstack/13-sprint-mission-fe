import styles from "./Input.module.css";

export default function Input({
  prefix,
  suffix,
  multiline = false,
  className,
  ...props
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      {prefix}
      {multiline ? <textarea {...props} /> : <input {...props} />}
      {suffix}
    </div>
  );
}
