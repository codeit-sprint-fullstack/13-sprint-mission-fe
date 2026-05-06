import { Link } from "react-router-dom";
import logo from "../../images/panda_face.png";
import "../../styles/header-layout.css";

function Header() {
  return (
    <header className="header">
      <div className="inner">
        <Link to="/" className="logo">
          <img src={logo} alt="판다마켓 로고" />
          <span>판다마켓</span>
        </Link>

        <button className="login-btn">로그인</button>
      </div>
    </header>
  );
}

export default Header;
