import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Main from "./assets/components/Main";
import ProductPage from "./assets/components/ProductPage";
import LoginPage from "./assets/components/LoginPage";
import SignupPage from "./assets/components/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />

        {/* 상품 페이지 */}
        <Route
          path="/product"
          element={
            <>
              <Header />
              <ProductPage />
              <Footer />
            </>
          }
        />

        {/* 로그인 페이지 (헤더/푸터 없음) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 회원가입 페이지 <헤더/푸터 없음) */}
        {/* 로그인 페이지 (헤더/푸터 없음) */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
