// Vite asset import: 빌드 시 적절한 경로로 자동 변환됨.
// 두 로고를 둘 다 import해두고 CSS로 화면 너비에 따라 보일/숨길 제어.
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/panda-logo.png";
import logoTypo from "../../assets/logo/panda-logo-typo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    // <header>: 페이지/섹션의 머리말 영역을 의미하는 시맨틱 태그.
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {/* aria-label: 스크린리더에 "판다마켓 홈으로 이동"으로 읽혀줌 (접근성) */}
          <Link to="/" aria-label="판다마켓 홈으로 이동">
            {/* 두 로고 모두 렌더하지만 CSS의 display 속성으로 한 번에 하나만 보임.
                Desktop/Tablet: logoImg 보임 / logoImgSm 숨김
                Mobile (≤743px): logoImg 숨김 / logoImgSm 보임 */}
            <img src={logo} alt="판다마켓" className={styles.logoImg} />
            <img src={logoTypo} alt="판다마켓" className={styles.logoImgSm} />
          </Link>
          <nav className={styles.nav}>
            <a className={styles.navLink}>자유게시판</a>
            {/* 현재 페이지 메뉴는 active 클래스 추가 → 다른 색상으로 표시.
                두 클래스를 백틱 템플릿으로 합침. */}
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              중고마켓
            </NavLink>
          </nav>
        </div>
        <a className={styles.loginBtn}>로그인</a>
      </div>
    </header>
  );
}
