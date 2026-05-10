import React from "react";

import { Link } from "react-router-dom";

import styles from "@/components/Footer.module.css";

import { SOCIAL_CONFIG } from "@/constants/constants";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>&copy;codeit - 2024</p>

        <ul className={styles.menuContainer}>
          <li>
            <Link to='/privacy' className={styles.menu}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to='/faq' className={styles.menu}>
              FAQ
            </Link>
          </li>
        </ul>

        <ul className={styles.socials}>
          {SOCIAL_CONFIG.map((info) => (
            <li key={info.id}>
              <a className={styles.socialLink} href={info.url} target='_blank'>
                <img src={info.icon} alt={info.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
