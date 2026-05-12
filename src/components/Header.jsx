import { NavLink } from "react-router-dom";

import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <NavLink to="/" className="logo-wrapper">
            <img src="/images/logo.png" alt="logo" className="logo" />

            <span className="logo-text">판다마켓</span>
          </NavLink>

          <div className="nav-menu">
            <span className="free-board">자유게시판</span>

            <NavLink
              to="/items"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              중고마켓
            </NavLink>
          </div>
        </div>

        <button className="login-btn">로그인</button>
      </div>
    </header>
  );
}

export default Header;
