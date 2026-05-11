// App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Registration from "./pages/Registration";

function App() {
  return (
    // className="App"
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
