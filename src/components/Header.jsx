import "../styles/components/header.css";
import { useMediaQuery } from "react-responsive";
import logoMobile from "/logo_mobile.png";
import logoPC from "/logo.svg";

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className="header-container">
      <div className="header-left-section">
        <a href="/">
          <img src={isMobile ? logoMobile : logoPC} alt="판다마켓 홈" />
        </a>
        <div className="header-left-nav">
          <a href="#" className="header-menu-item">
            <span className="header-menu-item-tag">자유게시판</span>
          </a>
          <a href="#" className="header-menu-item">
            <span className="header-menu-item-tag">중고마켓</span>
          </a>
        </div>
      </div>
      <a href="#" id="login-button" className="button">
        로그인
      </a>
    </nav>
  );
}

export default Header;
