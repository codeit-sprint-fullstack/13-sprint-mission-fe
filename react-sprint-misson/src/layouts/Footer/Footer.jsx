import React from "react";
import styles from "./Footer.module.css";
import youtube from "@/assets/icons/ic_youtube.png";
import twitter from "@/assets/icons/ic_twitter.png";
import instagram from "@/assets/icons/ic_instagram.png";
import facebook from "@/assets/icons/ic_facebook.png";

export default function Footer() {
  return (
    <footer>
      <nav className={styles.footerNavBar}>
        <p className={`${styles.copyRigthTxt}`}>@codeit - 2024</p>

        <ul className={styles.footerCenterContainer}>
          <li>
            <a href="./view/privacy.html">Privacy Policy</a>
          </li>
          <li>
            <a href="./view/faq.html">FAQ</a>
          </li>
        </ul>

        <ul className={styles.footerSnsUl}>
          <li>
            <a
              href="https://www.facebook.com/?locale=ko_KR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/?lang=ko"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="youtube" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="instagram" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
