// components/Dropdown.jsx
import styles from "../styles/DropDown.module.css";
import { useDropdown } from "../hooks/useDropdown";
import dropdownArrow from "../assets/icons/ic_arrow_down.png";
import mobileDropDown from "../assets/icons/ic_sort.svg";
import { useWindowSize } from "../hooks/useWindowSize";

const ORDER_OPTIONS = ["최신순", "좋아요순"];

export default function Dropdown({ onChange }) {
  const { selectRef, currentValue, showOptions, toggleOptions, handleSelect } =
    useDropdown(ORDER_OPTIONS);

  const handleClick = (value) => {
    handleSelect(value);
    onChange?.(value === "최신순" ? "recent" : "favorite");
  };

  const { type } = useWindowSize();
  const img = type === "mobile" ? mobileDropDown : dropdownArrow;

  return (
    <div className={styles.selectBox} onClick={toggleOptions} ref={selectRef}>
      <label className={styles.label}>{currentValue}</label>
      <img className={styles.arrow} src={img} alt="드롭다운 화살표" />
      <ul className={`${styles.options} ${showOptions ? styles.show : ""}`}>
        {ORDER_OPTIONS.map((option) => (
          <li
            key={option}
            className={styles.option}
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
