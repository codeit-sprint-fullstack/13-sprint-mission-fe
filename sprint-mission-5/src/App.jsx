import { useState } from "react";
import "./App.css";
import "./styles/reset.css";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
