import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemsPage from "./pages/ItemsPage";
import RegistrationPage from "./pages/ RegistrationPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
