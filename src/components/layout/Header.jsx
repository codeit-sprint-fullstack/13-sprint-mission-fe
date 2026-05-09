import { Link, NavLink } from "react-router";

import Button from "@/components/common/Button/Button";
import styles from "@/components/layout/Header.module.css";

export default function Header() {
return (
    <header className={styles.gnb}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <Link to='/'>
            <span className={styles.logoImg}></span>
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.menuContainer}>
              <li className={styles.menu}>
                <NavLink to='/board' className={styles.menuLink}>
                  자유게시판
                </NavLink>
              </li>
              <li className={styles.menu}>
                <NavLink to='/items' className={styles.menuLink}>
                  중고마켓
                </NavLink>
              </li>
            </ul>
          </nav>

          <Link to='/login'>
            <Button type='button'>로그인</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
