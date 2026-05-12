import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header id="header">
      <div className="inner">
        <div className="innerLaft">
          <a className="logo" href="/">
            <img src={logo} alt="" />
          </a>
          <div className="navTextBox">
            <NavLink to="/freeboard" className="navText">
              자유게시판
            </NavLink>
            <NavLink to="/items" className="navText">
              중고마켓
            </NavLink>
          </div>
        </div>
        <a className="login" href="/">
          로그인
        </a>
      </div>
    </header>
  );
}
