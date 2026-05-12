import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-all"]}>
          <p className={styles.codeit}>©codeit - 2024</p>

          <div className={styles["footer-mid"]}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/faq">FAQ</a>
          </div>

          <div className={styles["icon-sns"]}>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_facebook.png" alt="facebook" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_twitter.png" alt="twitter" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_youtube.png" alt="youtube" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src="/img/main/ic_instagram.png" alt="instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
