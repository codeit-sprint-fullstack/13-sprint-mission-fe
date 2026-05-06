import pandalogo from "../Image/header-img.png";
import "../css/Header.css";
import "../css/root.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header">
      <div className="market-logo">
        <Link to="/">
          <img
            className="logo-mark"
            src={pandalogo}
            alt="판다마켓 로고 이미지"
          />
          <p id="logo-title">판다마켓</p>
        </Link>
        <p className="community">자유게시판</p>
        <NavLink
          to="/items"
          className={({ isActive }) =>
            isActive ? "second-hands active" : "second-hands"
          }
        >
          중고마켓
        </NavLink>
      </div>

      <div className="login-container">
        <Link to="/login" className="lgn-btn">
          로그인
        </Link>
      </div>
    </header>
  );
}
