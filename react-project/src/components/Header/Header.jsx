import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Button } from "@/components";
import { smLogo } from "@/assets/img";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.containerLeft}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={smLogo} className={styles.logoImg} />
            판다마켓
          </div>
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `${styles.navBtn} ${isActive ? styles.active : ""}`
            }
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              `${styles.navBtn} ${isActive ? styles.active : ""}`
            }
          >
            중고마켓
          </NavLink>
        </nav>
      </div>
      <Link to="/login">
        <Button variant={"rectangle"}>로그인</Button>
      </Link>
    </header>
  );
}
