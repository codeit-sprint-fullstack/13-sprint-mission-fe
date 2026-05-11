import React from "react";
import { NavLink, useLocation } from "react-router";
import styles from "../css/Navbar.module.css";
import logo from "../assets/logo/logo-panda-market.svg";
import Items from "../pages/Items";
import Home from "../pages/Home";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <a href="./">
          <img className={styles.logo} src={logo} alt="판다마켓" />
        </a>
        {location.pathname !== "/" && (
          <div className={styles.menu}>
            <NavLink to="/" className={`${styles.navLink} text-2lg-bold`}>
              자유게시판
            </NavLink>
            <NavLink to={Items} className={`${styles.navLink} text-2lg-bold`}>
              중고마켓
            </NavLink>
          </div>
        )}
        <a href="/login" className={`${styles.loginButton} text-lg-semibold`}>
          로그인
        </a>
      </div>
    </header>
  );
}
