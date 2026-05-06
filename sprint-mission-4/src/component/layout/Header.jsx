import React from "react";
import logo from "../../assets/logo.png";
import logos from "../../assets/logos.png";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="nav-wrap">
        <nav className="nav">
          <picture>
            <source className="logo" media="(min-width: 480px)" srcSet={logo} />
            <img src={logos} className="logo" />
          </picture>
          <ul className="nav-ul">
            <li className="nav-li">자유게시판</li>
            <li className="nav-li">중고마켓</li>
          </ul>
        </nav>
        <button className="login-button">로그인</button>
      </div>
    </header>
  );
}
