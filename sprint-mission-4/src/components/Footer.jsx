import React from "react";
import "./Footer.css";
import facebook from "../assets/ic_facebook.svg";
import twitter from "../assets/ic_twitter.svg";
import instagram from "../assets/ic_instagram.svg";
import youtube from "../assets/ic_youtube.svg";
// 상단 네비게이션 바, 푸터는 랜딩 페이지와 동일한 스타일과 규칙으로 만들어주세요

export default function Footer() {
  return (
    <>
      <footer>
        <div class="footer-inner">
          <span class="footer-copy">©codeit - 2024</span>
          <div class="footer-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
          </div>
          <div class="footer-sns">
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
