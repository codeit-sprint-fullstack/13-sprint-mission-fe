import React from "react";
import logo from "@/assets/logos/logo.svg";
import styles from "@/styles/Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="판다마켓 로고" className={styles.logoImage} />
            <span className={styles.logoText}>판다마켓</span>
          </Link>
          <Link to="/board" className={styles.navLink}>
            자유게시판
          </Link>
          <Link to="/items" className={styles.navLink}>
            중고마켓
          </Link>
        </div>

        <a href="/login" className={styles.loginBtn}>
          로그인
        </a>
      </nav>
    </header>
  );
}
