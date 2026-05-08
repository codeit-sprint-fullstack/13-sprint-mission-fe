import React from "react";
import styles from "../../css/Navbar.module.css";
import logo from "../../assets/logo/logo-panda-market.svg";
import { NavLink } from "react-router";
import Items from "../../pages/Items";

export default function Navbar() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <a href="./">
          <img className={styles.logo} src={logo} alt="판다마켓" />
        </a>
        <a href="/login" className={`${styles.loginButton} text-lg-semibold`}>
          로그인
        </a>
      </div>
    </header>
  );
}
