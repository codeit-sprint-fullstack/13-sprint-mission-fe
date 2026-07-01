"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Dropdown.module.css";

export default function Dropdown({ onList }) {
  const [currentValue, setCurrentValue] = useState("recent");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className={styles.relative}>
      <button onClick={handleToggle} className={`${styles.wrapper} text-lg-regular`}>
        <span>{currentValue === "recent" ? "최신순" : "좋아요순"}</span>
        <Image
          src={isDropdownOpen ? "/icon/arrow-up.svg" : "/icon/arrow-down.svg"}
          width={24}
          height={24}
          alt="정렬"
        />
      </button>
      {isDropdownOpen && (
        <div className={styles.container}>
          <span
            className={`${styles.list} text-lg-regular`}
            onClick={() => { handleToggle(); setCurrentValue("recent"); onList("recent"); }}
          >
            최신순
          </span>
          <span
            className={`${styles.list} text-lg-regular`}
            onClick={() => { handleToggle(); setCurrentValue("favorite"); onList("favorite"); }}
          >
            좋아요순
          </span>
        </div>
      )}
    </div>
  );
}
