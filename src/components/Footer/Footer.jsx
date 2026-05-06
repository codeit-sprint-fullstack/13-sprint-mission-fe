import React from "react";
import styles from "./Footer.module.css";
import { icFacebook, icInstagram, icTwitter, icYoutube } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.section}>@codeit-2024</div>
      <div className={styles.section}>
        <a>Privacy Policy</a>
        <a>FAQ</a>
      </div>
      <div className={styles.icSection}>
        <a>
          <img src={icFacebook} className={styles.icon} />
        </a>
        <a>
          <img src={icTwitter} className={styles.icon} />
        </a>
        <a>
          <img src={icYoutube} className={styles.icon} />
        </a>
        <a>
          <img src={icInstagram} className={styles.icon} />
        </a>
      </div>
    </footer>
  );
}
