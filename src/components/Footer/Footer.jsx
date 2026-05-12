import React from "react";
import { Link } from "react-router-dom";
import { icFacebook, icInstagram, icTwitter, icYoutube } from "@/assets/icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.section}>@codeit-2024</div>
      <div className={styles.section}>
        <Link>Privacy Policy</Link>
        <Link>FAQ</Link>
      </div>
      <div className={styles.icSection}>
        <Link to="https://www.facebook.com/">
          <img src={icFacebook} className={styles.icon} />
        </Link>
        <Link to="https://x.com/">
          <img src={icTwitter} className={styles.icon} />
        </Link>
        <Link to="https://www.youtube.com/">
          <img src={icYoutube} className={styles.icon} />
        </Link>
        <Link to="https://www.instagram.com/">
          <img src={icInstagram} className={styles.icon} />
        </Link>
      </div>
    </footer>
  );
}
