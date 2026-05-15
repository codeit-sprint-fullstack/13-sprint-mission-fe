import { Link, NavLink } from "react-router";
import "./Gnb.css";

export default function Gnb() {
  return (
    <div>
      <Link to="/">판다마켓</Link>
      <div>자유게시판</div>
      <NavLink to="/items">중고마켓</NavLink>
      <div>로그인</div>
    </div>
  );
}
