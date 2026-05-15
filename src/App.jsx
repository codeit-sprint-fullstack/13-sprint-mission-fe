import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import Registration from "./pages/Registration/Registration";
import Gnb from "./components/Gnb/Gnb.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  return (
    <>
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </>
  );
}
