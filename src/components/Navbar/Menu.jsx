import React from "react";
import styles from "../../css/Navbar.module.css";
import logo from "../../assets/logo/logo-panda-market.svg";
import { NavLink } from "react-router";
import Items from "../../pages/Items";
import Home from "../../pages/Home";

export default function NavbarWith() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <a href="./">
          <img className={styles.logo} src={logo} alt="판다마켓" />
        </a>
        <div className={styles.menu}>
          <NavLink to="/" className={styles.navLink}>
            자유게시판
          </NavLink>
          <NavLink to={Items} className={styles.navLink}>
            중고마켓
          </NavLink>
        </div>
        <a href="/login" className={`${styles.loginButton} text-lg-semibold`}>
          로그인
        </a>
      </div>
    </header>
  );
}
