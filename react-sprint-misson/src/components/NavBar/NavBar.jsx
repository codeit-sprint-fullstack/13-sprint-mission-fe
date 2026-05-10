import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/board"
        className={({ isActive }) =>
          `${styles.navTxt} ${isActive ? styles.active : ""}`
        }
      >
        자유게시판
      </NavLink>

      <NavLink
        to="/items"
        className={({ isActive }) =>
          `${styles.navTxt} ${isActive ? styles.active : ""}`
        }
      >
        중고마켓
      </NavLink>
    </nav>
  );
}
