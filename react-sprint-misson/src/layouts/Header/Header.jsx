import React from "react";
import logo from "@/assets/logos/logo.svg";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/NavBar/NavBar";

export default function Header() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="판다마켓 로고" className={styles.logoImage} />
            <span className={styles.logoText}>판다마켓</span>
          </Link>
          {!isLanding && <Navbar />}
        </div>
        <a href="/login" className={styles.loginBtn}>
          로그인
        </a>
      </nav>
    </header>
  );
}
