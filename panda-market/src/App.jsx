import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import ItemList from "./pages/ItemList";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemlist" element={<ItemList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
