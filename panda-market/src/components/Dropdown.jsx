import React, { useEffect, useState } from "react";
import arrowDown from "../assets/icon/arrow-down.svg";
import arrowUp from "../assets/icon/arrow-up.svg";

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
      <div onClick={handleToggle}>
        <label>{currentValue === "recent" ? "최신순" : "좋아요순"}</label>
        <img src={arrowIcon} />
      </div>
      {isDropdownOpen && (
        <div>
          {/* 드롭다운 기능 만들다가 작업 종료 */}
          <li
            onClick={() => {
              setCurrentValue("recent");
              onList("recent");
              console.log("recent::", currentValue);
            }}
          >
            최신순
          </li>
          <li
            onClick={() => {
              setCurrentValue("favorite");
              onList("favorite");
              console.log("favorite::", currentValue);
            }}
          >
            좋아요순
          </li>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
