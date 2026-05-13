import React from "react";
import "../css/Footer.css";
import facebookIcon from "../assets/icon/facebook.svg";
import twitterIcon from "../assets/icon/twitter.svg";
import youtubeIcon from "../assets/icon/youtube.svg";
import instagramIcon from "../assets/icon/instagram.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copyright">©codeit - 2024</span>
      <nav className="footer-nav">
        <a className="footer-nav-link" href="/privacy">
          Privacy Policy
        </a>
        <a className="footer-nav-link" href="/faq">
          FAQ
        </a>
      </nav>
      <div className="footer-social">
        <a
          className="footer-social-link"
          href="https://facebook.com"
          target="_blank"
        >
          <img src={facebookIcon} alt="facebook" />
        </a>
        <a className="footer-social-link" href="https://x.com" target="_blank">
          <img src={twitterIcon} alt="twitter" />
        </a>
        <a
          className="footer-social-link"
          href="https://youtube.com"
          target="_blank"
        >
          <img src={youtubeIcon} alt="youtube" />
        </a>
        <a
          className="footer-social-link"
          href="https://instagram.com"
          target="_blank"
        >
          <img src={instagramIcon} alt="instagram" />
        </a>
      </div>
    </footer>
  );
}
