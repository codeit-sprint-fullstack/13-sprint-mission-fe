import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LinkButton from "../components/LinkButton";

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container">
        <LinkButton href="/itemlist">상품리스트 스프린트4</LinkButton>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
