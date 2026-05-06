import "./App.css";
import Footer from "./layouts/Footer/Footer.jsx";
import Header from "./layouts/Header/Header.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import MarketPage from "./pages/MarketPage/MarketPage.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/items" element={<MarketPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
