import FB_IC from "../Image/ic_facebook.png";
import X_IC from "../Image/ic_twitter.png";
import INS_IC from "../Image/ic_instagram.png";
import YB_IC from "../Image/ic_youtube.png";
import "../css/Footer.css";
import "../css/root.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-page">
        <p className="copy-right">©codeit - 2024</p>
        <div className="footer-links">
          <a href="Policy.html">
            <p className="policy">Privacy Policy</p>
          </a>
          <a href="FAQ.html">
            <p className="FAQ">FAQ</p>
          </a>
        </div>
        <div className="outer-link">
          <a
            type="button"
            href="https://www.facebook.com/?locale=ko_KR"
            target="_blank"
          >
            <img className="fb-ic " src={FB_IC} alt="facebook" />
          </a>
          <a type="button" href="https://x.com/" target="_blank">
            <img className="x-ic " src={X_IC} alt="x" />
          </a>
          <a type="button" href="https://www.youtube.com/" target="_blank">
            <img className="yb-ic " src={YB_IC} alt="youtube" />
          </a>
          <a type="button" href="https://www.instagram.com/" target="_blank">
            <img className="ins-ic " src={INS_IC} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
