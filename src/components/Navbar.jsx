import { Link } from "react-router";
import { NavLink } from "react-router";
import "../styles/navbar.css";
import { useMediaQuery } from "react-responsive";
import logoMobile from "/logo_mobile.png";
import logoPC from "/logo.svg";
import { BREAKPOINTS } from "../constants/common";

function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE_MAX });

  return (
    <nav className="header-container">
      <div className="header-left-section">
        <Link to="/">
          <img src={isMobile ? logoMobile : logoPC} alt="판다마켓 홈" />
        </Link>
        <div className="header-left-nav">
          <Link to="#" className="header-menu-item">
            <span className="header-menu-item-tag">자유게시판</span>
          </Link>
          <NavLink to="/items" className="header-menu-item">
            <span className="header-menu-item-tag">중고마켓</span>
          </NavLink>
        </div>
      </div>
      <Link to="/login" id="login-button" className="button">
        로그인
      </Link>
    </nav>
  );
}

export default Navbar;
