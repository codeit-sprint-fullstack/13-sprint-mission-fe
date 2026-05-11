import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import ItemsPage from "./pages/ItemsPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/items" element={<ItemsPage />} />

        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
