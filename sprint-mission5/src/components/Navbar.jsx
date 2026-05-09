import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <div className={styles["header-left"]}>
          <Link to="/" className={styles["logo-link"]}>
            <img src="/img/login/logo.png" alt="판다마켓 로고" />
          </Link>

          <nav className={styles["nav-links"]}>
            <Link to="/" className={styles["nav-link"]}>
              자유게시판
            </Link>

            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive
                  ? `${styles["nav-link"]} ${styles.active}`
                  : styles["nav-link"]
              }
            >
              중고마켓
            </NavLink>
          </nav>
        </div>

        <div className={styles["header-right"]}>
          <Link to="/login" className={styles["login-button"]}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
