import React from "react";

import { Link, NavLink } from "react-router-dom";

import styles from "@/components/Header.module.css";

export default function Header() {
  return (
    <header className={styles.gnb}>
      <div className={styles.inner}>
        <Link to='/'>
          <span className={styles.logoImg}></span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.menuContainer}>
            <li className={styles.menu}>
              <NavLink to='/board' className={styles.menuLink}>
                자유게시판
              </NavLink>
            </li>
            <li className={styles.menu}>
              <NavLink to='/items' className={styles.menuLink}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to='/login' className={styles.loginBtn}>
          로그인
        </Link>
      </div>
    </header>
  );
}
