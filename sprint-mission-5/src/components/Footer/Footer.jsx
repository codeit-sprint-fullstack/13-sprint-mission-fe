import React from "react";
import styles from "./Footer.module.css";
import facebook from "../../assets/svg/facebook.svg";
import youtube from "../../assets/svg/youtube.svg";
import instagram from "../../assets/svg/instagram.svg";
import twitter from "../../assets/svg/twitter.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-wrap"]}>
        <div className={styles.copyright}>@codeit - 2024</div>

        <ul className={styles["footer-nav"]}>
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>

        <ul className={styles["footer-social"]}>
          <li>
            <a href="https://www.facebook.com">
              <img className={styles.svg} src={facebook} />
            </a>
          </li>
          <li>
            <a href="https://x.com/">
              <img className={styles.svg} src={twitter} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com">
              <img className={styles.svg} src={youtube} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <img className={styles.svg} src={instagram} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
