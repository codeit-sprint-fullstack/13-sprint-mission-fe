import React from "react";
import "./Footer.css";
import facebook from "../assets/icons/ic_facebook.svg";
import twitter from "../assets/icons/ic_twitter.svg";
import instagram from "../assets/icons/ic_instagram.svg";
import youtube from "../assets/icons/ic_youtube.svg";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-inner">
          <span className="footer-copy">©codeit - 2024</span>
          <div className="footer-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
          </div>
          <div className="footer-sns">
            <a href="https://www.facebook.com" target="_blank">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <img src={youtube} alt="youtube" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <img src={instagram} alt="instagram" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
