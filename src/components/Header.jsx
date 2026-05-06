
import "./Header.css";
import pandaLogo from "../assets/Image/login-header.png";
import { Link } from "react-router";

export default function Nav() {
  const handleLoginClick = () => {
    alert("로그인 페이지로 이동합니다!");
  };
  return (
    <nav>
      <div className="nav-container">
        <a className="logo-wrap" href="/">
          <img className="logo-icon" src={pandaLogo} alt="판다마켓 로고" />
          <span className="logo">판다마켓</span>
        </a>

          <div className="menu">
            <Link to="/community">자유게시판</Link>
            <Link to="/market">중고마켓</Link>
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
  );
}