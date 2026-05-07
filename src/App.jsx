import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemlist" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
