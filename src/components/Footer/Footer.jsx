import "./Footer.css";
import facebookIc from "../../assets/icon/ic_facebook.svg";
import instagramIc from "../../assets/icon/ic_instagram.svg";
import twitterIc from "../../assets/icon/ic_twitter.svg";
import youtubeIc from "../../assets/icon/ic_youtube.svg";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="co-info">©codeit - 2024</div>
        <div className="footer-a">
          <a className="privacy" href="./page/privacy.html">
            Privacy Policy
          </a>
          <a className="FAQ" href="./page/faq.html">
            FAQ
          </a>
        </div>
        <div className="icon">
          <a href="https://www.facebook.com/">
            <img src={facebookIc} alt="페이스북 아이콘" />
          </a>
          <a href="https://x.com/">
            <img src={twitterIc} alt="트위터 아이콘" />
          </a>
          <a href="https://www.youtube.com/">
            <img src={youtubeIc} alt="유튜브 아이콘" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={instagramIc} alt="인스타그램 아이콘" />
          </a>
        </div>
      </div>
    </footer>
  );
}
