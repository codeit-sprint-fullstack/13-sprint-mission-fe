import React from "react";
import "./footer.css";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="copyright">@codeit - 2024</div>

        <ul className="footer-m-text">
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>

        <ul className="family-site">
          <li className="svg_facebook">
            <a href="https://www.facebook.com">
              <img src={facebook} />
            </a>
          </li>
          <li className="svg_twitter gap_2">
            <a href="https://x.com/">
              <img src={twitter} />
            </a>
          </li>
          <li className="svg_youtube gap_2">
            <a href="https://www.youtube.com">
              <img src={youtube} />
            </a>
          </li>
          <li className="svg_instagram gap_2">
            <a href="https://www.instagram.com/">
              <img src={instagram} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
