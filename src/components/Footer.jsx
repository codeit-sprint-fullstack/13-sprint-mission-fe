import { Link } from "react-router";
import "../styles/footer.css";

import facebook from "../assets/icons/social/facebook-logo.svg";
import twitter from "../assets/icons/social/twitter-logo.svg";
import instagram from "../assets/icons/social/instagram-logo.svg";
import youtube from "../assets/icons/social/youtube-logo.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div id="footer-info">@codeit - 2026</div>
      <div id="footer-menu">
        <Link to="/">Privacy Policy</Link>
        <Link to="/">FAQ</Link>
      </div>
      <ul className="footer-social-list">
        <li className="footer-social-list-item">
          <Link
            to="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="페이스북" />
          </Link>
        </li>
        <li className="footer-social-list-item">
          <Link
            to="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="트위터" />
          </Link>
        </li>
        <li className="footer-social-list-item">
          <Link
            to="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="유튜브" />
          </Link>
        </li>
        <li className="footer-social-list-item">
          <Link
            to="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="인스타그램" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
