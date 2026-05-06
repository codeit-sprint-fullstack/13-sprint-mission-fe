import React from "react";
import "./Header.css";
import pandaface from "../../assets/로그인 판다 얼굴.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="logo-name">
          <a href="./" className="logo-a-box">
            <img src={pandaface} alt="판다 얼굴" className="logo-img" />
            <span className="logo-text">판다 마켓</span>
          </a>
          <div className="header-links">
            <a href="./" className="freeboard">
              자유게시판
            </a>
            <a href="./" className="usedmarket">
              중고마켓
            </a>
          </div>
        </span>
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
