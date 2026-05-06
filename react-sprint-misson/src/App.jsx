import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Products from "./pages/Products";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/items" element={<Products />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
