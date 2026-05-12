// [메인 홈 페이지]

import React from "react";
import { Link } from "react-router-dom";

import "../styles/global.css";
import "../styles/home.css";

// 이미지 파일들을 import
import logoImg from "../images/logo/logo.svg";
import feature1Img from "../images/home/feature1-image.png";
import feature2Img from "../images/home/feature2-image.png";
import feature3Img from "../images/home/feature3-image.png";
import facebookIcon from "../images/social/facebook-logo.svg";
import twitterIcon from "../images/social/twitter-logo.svg";
import youtubeIcon from "../images/social/youtube-logo.svg";
import instagramIcon from "../images/social/instagram-logo.svg";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* 랜딩 페이지 전용 헤더 (로고와 로그인 버튼만 구성) */}
      <header className="main-header">
        <div
          className="wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link to="/">
            <img src={logoImg} alt="판다마켓 로고" width="153" />
          </Link>
          <Link to="/login" id="loginLinkButton" className="button">
            로그인
          </Link>
        </div>
      </header>

      <main className="with-header">
        {/* 메인 */}
        <section id="hero" className="banner">
          <div className="wrapper">
            <h1>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>

            <Link to="/items" className="button pill-button">
              구경하러 가기
            </Link>
          </div>
        </section>

        <section id="features" className="wrapper">
          <div className="feature">
            <img src={feature1Img} alt="인기 상품" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Hot item</h2>
              <h1>
                인기 상품을
                <br />
                확인해 보세요
              </h1>
              <p className="feature-description">
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <h2 className="feature-tag">Search</h2>
              <h1>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h1>
              <p className="feature-description">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img src={feature2Img} alt="검색 기능" width="50%" />
          </div>

          <div className="feature">
            <img src={feature3Img} alt="판매 상품 등록" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Register</h2>
              <h1>
                판매를 원하는
                <br />
                상품을 등록하세요
              </h1>
              <p className="feature-description">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section id="bottomBanner" className="banner">
          <div className="wrapper">
            <h1>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
        </section>
      </main>

      {/* 랜딩 푸터 */}
      <footer>
        <div className="wrapper">
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
    </div>
  );
};

export default LandingPage;
