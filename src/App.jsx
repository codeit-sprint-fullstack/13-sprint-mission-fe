import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  MarketPage,
  LoginPage,
  SignUpPage,
  HomePage,
  RegisterationPage,
  CommunityPage,
} from "@/pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="items" element={<MarketPage />} />
        <Route path="registeration" element={<RegisterationPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
