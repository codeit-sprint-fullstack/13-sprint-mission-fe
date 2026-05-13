import "./style/App.css";
import headerstyles from "./style/Header.module.css";
import logoIcon from "./assets/logo.png";
import footerstyles from "./style/Footer.module.css";
import { Link } from "react-router-dom";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { NavLink } from "react-router-dom";
import Registration from "./pages/Registration";

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
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive
                ? `${headerstyles.title} ${headerstyles.active}`
                : headerstyles.title
            }
          >
            중고마켓
          </NavLink>
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

function Items() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

function RegistrationPage() {
  return (
    <>
      <Header />
      <Registration />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

function Main() {
  return (
    <>
      <Header />
      메인페이지
      <Footer />
    </>
  );
}

export default App;
