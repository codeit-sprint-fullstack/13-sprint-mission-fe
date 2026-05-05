import React from "react";
import logo from "../assets/logos/logo.svg";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <a href="/" className={styles.logoLink}>
            <img src={logo} alt="판다마켓 로고" className={styles.logoImage} />
            <span className={styles.logoText}>판다마켓</span>
          </a>
          <a href="/board" className={styles.navLink}>
            자유게시판
          </a>
          <a href="/market" className={styles.navLink}>
            중고마켓
          </a>
        </div>

        <a href="/login" className={styles.loginBtn}>
          로그인
        </a>
      </nav>
    </header>
  );
}
