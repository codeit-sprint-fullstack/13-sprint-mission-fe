import React from "react";
import styles from "../styles/Common.module.css";
import youtube from "../assets/icons/ic_youtube.png";
import twitter from "../assets/icons/ic_twitter.png";
import instagram from "../assets/icons/ic_instagram.png";
import facebook from "../assets/icons/ic_facebook.png";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
    <>
        <nav className={styles.footerNavBar}>
          <p class={styles.footerInfoTxt,styles.footerStatTxt}>@codeit - 2024</p>

          <ul class={styles.footerCenterTxt}>
            <li className={styles.footerInfoTxt}>
              <a href="./view/privacy.html">Privacy Policy</a>
            </li>
            <li className={styles.footerInfoTxt}>
              <a href="./view/faq.html">FAQ</a>
            </li>
          </ul>

          <ul className={styles.footerSnsUl}>
            <li class="footer-info-text">
              <a
                href="https://www.facebook.com/?locale=ko_KR"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook 이미지" />
              </a>
            </li>
            <li className={styles.footerInfoTxt}>
              <a
                href="https://x.com/?lang=ko"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="twitter 이미지" />
              </a>
            </li>
            <li className={styles.footerInfoTxt}>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtube} alt="youtube 이미지" />
              </a>
            </li>
            <li className={styles.footerInfoTxt}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram 이미지" />
              </a>
            </li>
          </ul>
        </nav>
      </>
    </footer>
  );
}
