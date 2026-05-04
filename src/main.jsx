import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";
import Footer from "./Footer";
import ProductList from "./ProductList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <ProductList />
    <Footer />
  </StrictMode>,
);
