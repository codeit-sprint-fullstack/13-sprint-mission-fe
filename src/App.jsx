import { Routes, Route } from "react-router-dom";

import MarketPage from "./pages/MarketPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ItemDetailPage from "./pages/ItemDetailPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
