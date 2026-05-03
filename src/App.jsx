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
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header />
              <ProductPage />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
