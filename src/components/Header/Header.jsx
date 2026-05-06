import React from "react";
import { Link } from "react-router-dom";
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
          <a>
            <div className={styles.navBtn}>자유게시판</div>
          </a>
          <a>
            <div className={styles.navBtn}>중고마켓</div>
          </a>
        </nav>
      </div>
      <Link to="/login">
        <Button variant={"rectangle"}>로그인</Button>
      </Link>
    </header>
  );
}
