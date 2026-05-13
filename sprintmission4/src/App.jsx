// import { useState } from "react";
import "./App.css";
import Header from "./componets/Header.jsx";
import Footer from "./componets/Footer.jsx";
import MainCard from "./componets/MainCard.jsx";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/pretendard-std@1.3.9/dist/web/static/pretendard-std.min.css"
      ></link>
      <Header />
      <main>
        <MainCard />
      </main>
      <Footer />
    </>
  );
}

export default App;
