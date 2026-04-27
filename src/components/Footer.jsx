export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">©2024 판다마켓. All rights reserved.</span>
        <nav className="footer-nav">
          <a href="#">개인정보처리방침</a>
          <a href="#">FAQ</a>
        </nav>
        <div className="footer-sns">
          <a href="#" aria-label="페이스북">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="트위터">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="#" aria-label="유튜브">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
