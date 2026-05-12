import pandaface from "../assets/pandaface.svg";
import { Link, NavLink } from "react-router";
import Items from "./Items";
export default function Header() {
  const activeStyle = {
    color: "#6392ff",
  };
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-inner-logo">
          <img src={pandaface} alt="판다얼굴" className="pandaface-img" />
          <span className="header-inner-logo-word">
            <Link to={"/"} className="link">
              판다마켓
            </Link>
          </span>
        </div>
        <div className="header-inner-frame">
          <div className="header-inner-menu">
            <span className="secondary-600-18px">자유게시판</span>
          </div>
          <div className="header-inner-menu">
            <span className="secondary-600-18px">
              <NavLink
                to={"/Items"}
                className="link"
                style={({ isActive }) => (isActive ? activeStyle : {})}
              >
                중고마켓
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      <div className="header-btn">
        <span className="cool-gray-100-16px">로그인</span>
      </div>
    </header>
  );
}
