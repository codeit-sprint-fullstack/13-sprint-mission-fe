
import "./Header.css";
import pandaLogo from "../assets/image/login-header.png";
import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const handleLoginClick = () => {
    alert("로그인 페이지로 이동합니다!");
  };
  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo-wrap">
          <img className="logo-icon" src={pandaLogo} alt="판다마켓 로고" />
          <span className="logo">판다마켓</span>
        </Link>

          <div className="menu">
            <Link to="/community">자유게시판</Link>
            <Link to="/items" className={location.pathname === '/items' ? 'active' : ''}>중고마켓</Link>
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