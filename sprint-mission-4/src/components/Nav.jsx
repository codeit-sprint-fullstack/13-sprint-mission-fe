// Nav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import pandaLogo from "../assets/logo/판다 얼굴.svg";

export default function Nav() {
  const handleLoginClick = () => {
    alert("로그인 페이지로 이동합니다.");
  };
  return (
    <>
      <nav>
        <div className="nav-container">
          <a className="logo-wrap" href="/">
            <img className="logo-icon" src={pandaLogo} alt="판다마켓 로고" />
            <span className="logo">판다마켓</span>
          </a>

          <div className="menu">
            <NavLink to="/community">자유게시판</NavLink>
            <NavLink to="/items">중고마켓</NavLink>
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={handleLoginClick}
          >
            로그인
          </button>
        </div>
      </nav>
    </>
  );
}
