
import "./Footer.css";
import { Link } from "react-router";
import facebook from "../assets/image/ic_facebook.png";
import twitter from "../assets/image/ic_twitter.png";
import instagram from "../assets/image/ic_instagram.png";
import youtube from "../assets/image/ic_youtube.png";

export default function Footer() {
  return (
<footer>
  <div className="footer-inner">
    <p>&copy;codeit - 2024</p>
    <ul className="footer-links">
      <li>
        <Link to="/privacy">Privacy Policy</Link>
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
    </ul>
    <ul className="footer-sns">
      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook
          } alt="페이스북" />
        </a>
      </li>
      <li>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="트위터" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube} alt="유튜브" />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="인스타그램" />
        </a>
      </li>
    </ul>
  </div>
</footer>
  );
}