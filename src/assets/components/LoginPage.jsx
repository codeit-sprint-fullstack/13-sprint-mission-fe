import { useState } from "react";
import "../css/LoginPage.css";
import Logo from "../Image/login-header.png";
import google from "../Image/google-favicon.png";
import kakao from "../Image/kakao-favicon.png";
import visiblebtn from "../Image/btn_visibility_off_24px.png";
import "../css/root.css";
import { Link } from "react-router-dom";

export default function LoginPageHome() {
  // 비밀번호 보임/숨김 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <section className="login-section">
        <header className="head-container">
          <div className="home-logo">
            <a href="/" className="home-logo">
              <img src={Logo} alt="판다마켓 로고" />
              <div className="logo-text">
                <a href="/" className="logo-text">
                  판다마켓
                </a>
              </div>
            </a>
          </div>
        </header>
        <main className="login-body">
          <form className="input-group">
            <div className="email-title">이메일 </div>
            <div className="email-container">
              <input
                type="email"
                className="email-input"
                id="email"
                name="user-email"
                placeholder="user@example.com"
                required
              />
            </div>

            <div className="pw-title">비밀번호</div>
            <div className="pw-container">
              <input
                type={showPassword ? "text" : "password"} // 상태에 따라 변경
                id="password"
                className="pw-input"
                name="user-password"
                placeholder="비밀번호를 입력해주세요"
                required
              />

              <button
                type="button"
                className="visible-btn"
                onClick={togglePassword}
              >
                <img src={visiblebtn} alt="비밀번호 보기/숨기기" />
              </button>
            </div>
          </form>
          <button className="login-btn">로그인</button>
          <div className="simple-lgn">
            <div className="simple-inner">
              <p className="simple-text">간편 로그인하기</p>
              <div className="favicon">
                <a href="https://www.google.co.kr" target="_blank">
                  <img src={google} alt="구글 아이콘" />
                </a>
                <a href="https://www.kakaocorp.com/page/" target="_blank">
                  <img src={kakao} alt="카카오톡 아이콘" />
                </a>
              </div>
            </div>
          </div>
        </main>
        <footer className="login-footer">
          <div className="isUser">판다마켓이 처음이신가요?</div>

          <div className="to-signup">
            <Link to="/signup">회원가입</Link>
          </div>
        </footer>
      </section>
    </>
  );
}
