import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductRegisterPage from "./pages/ProductRegisterPage/ProductRegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ProductListPage />} />
          <Route path="/registration" element={<ProductRegisterPage />} />
          <Route path="/items/:id" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
