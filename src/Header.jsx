import React from "react";
import "./style/Header.css";

function Header() {
  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="header-logo">
          <img
            src="src\assets\Group19.png"
            alt="로고"
            style={{ width: "153px", height: "51px" }}
          />
          <nav className="header-menu">
            <span className="menu-item">자유게시판</span>
            <span className="menu-item">중고마켓</span>
          </nav>
        </div>
        <div className="header-actions">
          <a href="/login" className="login-link">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
