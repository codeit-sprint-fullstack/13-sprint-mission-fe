import React, { useEffect, useState } from "react";
import arrowDown from "../assets/icon/arrow-down.svg";
import arrowUp from "../assets/icon/arrow-up.svg";
import styles from "../css/Dropdown.module.css";

const Dropdown = ({ onList }) => {
  // 현재 정렬 상태
  const [currentValue, setCurrentValue] = useState("recent");
  // 드롭다운 오픈 여부
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 아이콘 방향
  const [arrowIcon, setarrowIcon] = useState(arrowDown);

  // 아이콘 방향 바꿔지는 함수
  const arrowToggle = () => {
    setarrowIcon(() => (isDropdownOpen ? arrowDown : arrowUp));
  };

  // 드롭다운 오픈 여부 함수
  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    arrowToggle();
  };

  return (
    <div>
      {/* 키보드 조작을 고려해서 div보다는 btn사용 */}
      <button
        className={styles.button}
        onClick={handleToggle}
        className={`${styles.wrapper} text-lg-regular`}
      >
        <label>{currentValue === "recent" ? "최신순" : "좋아요순"}</label>
        <img src={arrowIcon} />
      </button>
      {isDropdownOpen && (
        <div className={styles.container}>
          <span
            className={`${styles.list} text-lg-regular`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
              setCurrentValue("recent");
              onList("recent");
            }}
          >
            최신순
          </span>
          <span
            className={`${styles.list} text-lg-regular`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
              setCurrentValue("favorite");
              onList("favorite");
              console.log("favorite::", currentValue);
            }}
          >
            좋아요순
          </span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
