import "../styles/components/footer.css";

import facebook from "../assets/icons/social/facebook-logo.svg";
import twitter from "../assets/icons/social/twitter-logo.svg";
import instagram from "../assets/icons/social/instagram-logo.svg";
import youtube from "../assets/icons/social/youtube-logo.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div id="footer-info">@codeit - 2026</div>
      <div id="footer-menu">
        <a href="#">Privacy Policy</a>
        <a href="#">FAQ</a>
      </div>
      <ul className="footer-social-list">
        <li className="footer-social-list-item">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="페이스북" />
          </a>
        </li>
        <li className="footer-social-list-item">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="트위터" />
          </a>
        </li>
        <li className="footer-social-list-item">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="유튜브" />
          </a>
        </li>
        <li className="footer-social-list-item">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="인스타그램" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
