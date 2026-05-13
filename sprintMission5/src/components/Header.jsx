import { NavLink } from "react-router";
import "/src/css/headerStyle.css";

export default function Header() {
  return (
    <header className="header-class">
      <nav className="nav-list">
        <a href="/" className="header-logo logo-name">
          <img src="./src/assets/panda_face.svg" alt="판다마켓 로고" />
          판다마켓
        </a>
        <ul className="nav-text-area">
          <li>
            <NavLink className="nav-text" to={"/free"}>
              자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-text" to={"/items"}>
              중고마켓
            </NavLink>
          </li>
        </ul>
      </nav>
      <a href="/" className="login-btn login-text">
        로그인
      </a>
    </header>
  );
}
