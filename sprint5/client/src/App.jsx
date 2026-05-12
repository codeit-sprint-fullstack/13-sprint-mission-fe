import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import GNB from "./components/GNB";
import Landing from "./pages/Landing";
import Items from "./pages/Items";
import Registration from "./pages/Registration";
import "./styles/global.css";

import facebookIcon from "./images/social/facebook-logo.svg";
import twitterIcon from "./images/social/twitter-logo.svg";
import youtubeIcon from "./images/social/youtube-logo.svg";
import instagramIcon from "./images/social/instagram-logo.svg";

function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      {!isLanding && <GNB />}

      <div className={isLanding ? "" : "with-header"}>
        <Routes>
          <Route path="/" element={<Landing />} />{" "}
          <Route path="/items" element={<Items />} />{" "}
          <Route path="/registration" element={<Registration />} />{" "}
          <Route path="/login" element={<div>로그인 페이지 준비 중...</div>} />
        </Routes>
      </div>

      {!isLanding && (
        <footer>
          <div className="wrapper">
            {" "}
            <div>©codeit - 2024</div>
            <div id="footerMenu">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/faq">FAQ</Link>
            </div>
            <div id="socialMedia">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="페이스북" width="20" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitterIcon} alt="트위터" width="20" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtubeIcon} alt="유튜브" width="20" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="인스타그램" width="20" />
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
export default App;
