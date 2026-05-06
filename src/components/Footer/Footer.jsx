import React from "react";
import "./Footer.css";
import fbIcon from "../../assets/ic_facebook.svg";
import ttIcon from "../../assets/ic_twitter.svg";
import ytIcon from "../../assets/ic_youtube.svg";
import igIcon from "../../assets/ic_instagram.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-span-box">
        <span className="footer-first-text"> @codeit - 2024 </span>
        <div className="footer-center-box">
          <a href="./Html/privacy.html" className="privacy-a">
            Privacy Policy
          </a>
          <a href="./Html/faq.html" className="FAQ-a">
            FAQ
          </a>
        </div>
        <div className="footer-icon-box">
          <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
            <img src={fbIcon} />
          </a>
          <a href="https://x.com/?lang=ko" target="_blank">
            <img src={ttIcon} />
          </a>
          <a
            href="https://www.youtube.com/?app=desktop&hl=ko&gl=KR"
            target="_blank"
          >
            <img src={ytIcon} />
          </a>
          <a href={"https://www.instagram.com/?hl=ko"} target="_blank">
            <img src={igIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}
