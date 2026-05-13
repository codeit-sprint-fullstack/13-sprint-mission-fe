import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import LandingPage from "./pages/LandingPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.routesWrapper}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/items" element={<ItemPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
