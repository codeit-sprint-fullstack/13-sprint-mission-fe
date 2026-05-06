
import "./Footer.css";
import facebook from "../assets/Image/ic_facebook.png";
import twitter from "../assets/Image/ic_twitter.png";
import instagram from "../assets/Image/ic_instagram.png";
import youtube from "../assets/Image/ic_youtube.png";

export default function Footer() {
  return (
<footer>
  <div className="footer-inner">
    <p>&copy;codeit - 2024</p>
    <ul className="footer-links">
      <li>
        <a href="/pages/privacy.html">Privacy Policy</a>
      </li>
      <li>
        <a href="/pages/faq.html">FAQ</a>
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