import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./page/Header.jsx";
import Products from "./page/Products.jsx";
import Footer from "./page/Footer.jsx";
import "./App.css";
import Items from "./page/Items.jsx";
import Registration from "./page/Registration.jsx";
import Home from "./page/Home.jsx";
export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Products" element={<Products />} />
        <Route path="Items" element={<Items />} />
        <Route path="Registration" element={<Registration />} />
      </Routes>
      <Footer />
    </div>
  );
}
