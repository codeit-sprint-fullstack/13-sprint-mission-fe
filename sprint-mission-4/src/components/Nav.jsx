import React from "react";
import "./Nav.css";
import pandaLogo from "../assets/판다 얼굴.svg";

export default function Nav() {
  const handleLoginClick = () => {
    // 실제 서비스에서는 여기에 로그인 API 호출이나 페이지 이동 로직을 넣습니다.
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
