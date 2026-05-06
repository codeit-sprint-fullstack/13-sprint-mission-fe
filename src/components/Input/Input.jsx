import { icSearch } from "../../assets/icons";
import styles from "./Input.module.css";

export default function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  className,
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={icSearch} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
