import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router";
import font from "../../styles/typography.module.css";

export default function Header() {
  // const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles["nav-wrap"]}>
        <nav className={styles.nav}>
          <div className={styles["nav-left"]}>
            <img className={styles.logo} src={logo}></img>
            <ul className={styles["nav-list"]}>
              <li className={styles["nav-item"]}>자유게시판</li>
              <li className={styles["nav-item"]}>중고마켓</li>
            </ul>
          </div>
          <button className={`${styles.button} ${font["text-lg-semibold"]}`}>
            로그인
          </button>
        </nav>
      </div>
    </header>
  );
}
