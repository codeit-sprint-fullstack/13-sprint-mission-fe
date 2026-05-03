import { useState } from "react";
import "./App.css";
import "./styles/reset.css";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Content from "./component/layout/Content";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </>
  );
}

export default App;
