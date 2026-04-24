import React from "react";
import "../css/Navbar.css";
import logo from "../assets/logo/logo-panda-market.svg";

export default function Navbar() {
  return (
    <header className="gnb">
      <div className="gnb-inner">
        <a href="./">
          <img className="gnb-logo" src={logo} alt="판다마켓" />
        </a>
        <a href="/login" className="gnb-login text-lg-semibold">
          로그인
        </a>
      </div>
    </header>
  );
}
