import "../../styles/globalHeader.css";
import { useMediaQuery } from "react-responsive";

function GlobalHeader() {
  const isMobileView = useMediaQuery({ maxWidth: 767 });

  return (
    <header className="global-header">
      <div className="header-brand-nav">
        <a href="/">
          <img src={isMobileView ? "/logo_mobile.png" : "/logo.svg"} alt="판다마켓 로고" />
        </a>
        <nav className="header-navigation">
          <a href="#" className="nav-link">
            <span className="nav-text">자유게시판</span>
          </a>
          <a href="#" className="nav-link">
            <span className="nav-text">중고마켓</span>
          </a>
        </nav>
      </div>
      <a href="#" className="btn-login">
        로그인
      </a>
    </header>
  );
}

export default GlobalHeader;