import "/src/css/headerStyle.css";

export default function Header() {
  return (
    <header className="header-class">
      <nav className="nav-list">
        <a href="/" className="header-logo logo-name">
          <img src="./src/assets/panda_face.svg" alt="판다마켓 로고" />
          판다마켓
        </a>
        <ul className="nav-text">
          <li>
            <a href="/">자유게시판</a>
          </li>
          <li>
            <a href="/">중고마켓</a>
          </li>
        </ul>
      </nav>
      <a href="/" className="login-btn login-text">
        로그인
      </a>
    </header>
  );
}
