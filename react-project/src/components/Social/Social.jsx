import React from "react";
import { Link } from "react-router-dom";
import styles from "./Social.module.css";
import { icGoogle, icKakao } from "@/assets/icons";

export default function Social() {
  return (
    <div className={styles.socialContainer}>
      <p className={styles.socialText}>간편 로그인하기</p>
      <div className={styles.socials}>
        <Link to="https://www.google.com/">
          <img src={icGoogle} className={styles.social} />
        </Link>
        <Link to="https://www.kakaocorp.com/">
          <img src={icKakao} className={styles.social} />
        </Link>
      </div>
    </div>
  );
}
