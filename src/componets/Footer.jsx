import React from "react";
import "/src/css/footerStyle.css";

export default function footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-left">©codeit - 2024</p>
        <div className="footer-center">
          <a href="html/privacy.html">Privacy Policy</a>
          <a href="html/faq.html">FAQ</a>
        </div>
        <div className="footer-right">
          <a href="https://www.facebook.com" target="_blank">
            <img src="./src/assets/ic_facebook.png" />
          </a>

          <a href="https://x.com/home" target="_blank">
            <img src="./src/assets/ic_twitter.png" />
          </a>

          <a href="https://www.youtube.com/" target="_blank">
            <img src="./src/assets/ic_youtube.png" />
          </a>

          <a href="https://www.instagram.com/" target="_blank">
            <img src="./src/assets/ic_instagram.png" />
          </a>
        </div>
      </div>
    </footer>
  );
}
