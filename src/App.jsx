import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import ItemPage from "./pages/ItemPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/items" element={<ItemPage />} />
      <Route path="/registeration" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
