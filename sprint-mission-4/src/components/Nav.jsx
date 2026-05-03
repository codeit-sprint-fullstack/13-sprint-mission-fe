// Nav.jsx
import React from "react";
import "./Nav.css";
import pandaLogo from "../assets/판다 얼굴.svg";
// 상단 네비게이션 바, 푸터는 랜딩 페이지와 동일한 스타일과 규칙으로 만들어주세요

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
            <a href="/community">자유게시판</a>
            <a href="/items">중고마켓</a>
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
