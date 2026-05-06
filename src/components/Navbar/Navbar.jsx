import logo from "../../assets/logo.svg";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <a
              href="/"
              className={styles.headerLogo}
              aria-label="판다마켓 홈으로 이동"
            >
              <img src={logo} alt="판다마켓 로고" width="40" height="41" />

              <span className={styles.headerLogoText}>판다마켓</span>
            </a>

            <nav className={styles.headerMenu} aria-label="메인 메뉴">
              <a href="/" className={styles.headerMenuLink}>
                자유게시판
              </a>

              <a href="/" className={styles.headerMenuLink}>
                중고마켓
              </a>
            </nav>
          </div>

          <a href="/login" className={styles.headerLogin}>
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
