import "./App.css";
import Footer from "./layouts/Footer/Footer.jsx";
import Header from "./layouts/Header/Header.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import MarketPage from "./pages/MarketPage/MarketPage.jsx";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/items" element={<MarketPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
