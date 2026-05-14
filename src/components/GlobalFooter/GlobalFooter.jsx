import "../../styles/globalFooter.css";

function GlobalFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-copyright">@codeit - 2026</div>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">FAQ</a>
      </div>
      <ul className="social-media-list">
        <li className="social-media-item">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/facebook-logo.svg" alt="페이스북" />
          </a>
        </li>
        <li className="social-media-item">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/twitter-logo.svg" alt="트위터" />
          </a>
        </li>
        <li className="social-media-item">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/youtube-logo.svg" alt="유튜브" />
          </a>
        </li>
        <li className="social-media-item">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram-logo.svg" alt="인스타그램" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default GlobalFooter;