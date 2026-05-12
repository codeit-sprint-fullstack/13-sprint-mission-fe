import React from "react";
import "./Header.css";
import pandaface from "../../assets/로그인 판다 얼굴.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <nav className="logo-name">
          <NavLink to="./" className="logo-a-box">
            <img src={pandaface} alt="판다 얼굴" className="logo-img" />
            <span className="logo-text">판다 마켓</span>
          </NavLink>
          <div className="header-links">
            <a href="./" className="freeboard">
              자유게시판
            </a>
            <NavLink to="/items" className="usedmarket">
              중고마켓
            </NavLink>
          </div>
        </nav>
        <button
          type="button"
          className="login-button"
          onClick={() => (window.location.href = "./")}
        >
          로그인
        </button>
      </div>
    </header>
  );
}
