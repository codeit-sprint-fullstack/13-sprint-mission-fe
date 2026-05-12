import "./App.css";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Market from "./pages/Market";
import Footer from "./components/Footer";
import ProductCreate from "./pages/ProductCreatePage";
import ItemDetail from "./pages/ItemDetail";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/items" element={<Market />} />
        <Route path="/registration" element={<ProductCreate />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
