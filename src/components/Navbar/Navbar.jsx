import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Link
              to="/"
              className={styles.headerLogo}
              aria-label="판다마켓 홈으로 이동"
            >
              <img src={logo} alt="판다마켓 로고" width="40" height="41" />
              <span className={styles.headerLogoText}>판다마켓</span>
            </Link>

            <nav className={styles.headerMenu} aria-label="메인 메뉴">
              <NavLink
                to="/board"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.headerMenuLink
                }
              >
                자유게시판
              </NavLink>

              <NavLink
                to="/items"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.headerMenuLink
                }
              >
                중고마켓
              </NavLink>
            </nav>
          </div>

          <Link to="/login" className={styles.headerLogin}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
