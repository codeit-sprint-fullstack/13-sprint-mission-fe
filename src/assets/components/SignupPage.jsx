import { useState } from "react";
import "../css/SignupPage.css";
import Logo from "../Image/login-header.png";
import google from "../Image/google-favicon.png";
import kakao from "../Image/kakao-favicon.png";
import visiblebtn from "../Image/btn_visibility_off_24px.png";
import "../css/root.css";
import { Link } from "react-router-dom";
export default function SignupPage() {
  // 비밀번호 보임/숨김 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <section id="singup-section">
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
            <div className="email-title">닉네임 </div>
            <div className="email-container">
              <input
                type="text"
                className="email-input"
                id="email"
                name="user-nickname"
                placeholder="닉네임을 입력해주세요"
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
            <div className="pw-title">비밀번호 확인</div>
            <div className="pw-container">
              <input
                type={showPassword ? "text" : "password"} // 상태에 따라 변경
                id="password"
                className="pw-input"
                name="user-password"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
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
          <button className="login-btn">회원가입</button>
          <div className="simple-lgn">
            <div className="simple-inner">
              <p className="simple-text">간편 회원가입하기</p>
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
          <div className="isUser">이미 회원이신가요?</div>

          <div className="to-signup">
            <Link to="/login">로그인</Link>
          </div>
        </footer>
      </section>
    </>
  );
}
