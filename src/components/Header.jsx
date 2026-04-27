export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">🐼 판다마켓</a>
        <nav>
          <a href="#">자유게시판</a>
          <a href="/" className="active">중고마켓</a>
        </nav>
        <button className="btn-login">로그인</button>
      </div>
    </header>
  )
}
