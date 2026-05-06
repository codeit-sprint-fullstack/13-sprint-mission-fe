// import { useState } from "react";
import "./App.css";
import headerstyles from "./Header.module.css";
import logoIcon from "./assets/logo.png";
import footerstyles from "./Footer.module.css";
import { Link } from "react-router-dom";
import Privacy from "./Privacy";
import FAQ from "./FAQ";
import Addproduct from "./Addproduct";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";

function Header() {
  return (
    <header className={headerstyles.header}>
      <div className={headerstyles.inner}>
        <div className={headerstyles.left}>
          <div className={headerstyles.logo}>
            <Link to="/">
              <img src={logoIcon} alt="판다마켓 로고" />
            </Link>
          </div>
          <div className={headerstyles.title}>자유게시판</div>
          <div className={headerstyles.title}>중고마켓</div>
        </div>
        <div className={headerstyles.login}>
          <Link to="/Login">로그인</Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className={footerstyles.footer}>
      <div className={footerstyles.inner}>
        <div>©codeit - 2024</div>
        <div className={footerstyles.footercenter}>
          <Link to="/Privacy">Privacy Policy</Link>
          <Link to="/FAQ">FAQ</Link>
        </div>

        <div className={footerstyles.icon}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./src/assets/ic_facebook.png" alt="페이스북" />
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./src/assets/ic_twitter.png" alt="트위터" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./src/assets/ic_youtube.png" alt="유튜브" />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./src/assets/ic_instagram.png" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
