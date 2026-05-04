import React from "react";
import "./style/Footer.css";
import logo from "./IMG/ic_facebook.png";
import logo1 from "./IMG/ic_twitter.png";
import logo2 from "./IMG/ic_youtube.png";
import logo3 from "./IMG/ic_instagram.png";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <span>©codeit - 2024</span>
        </div>

        <div className="footer-center">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className="footer-right">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img
              src={logo}
              alt="Facebook"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <img
              src={logo1}
              alt="Twitter"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img
              src={logo2}
              alt="YouTube"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              src={logo3}
              alt="Instagram"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
