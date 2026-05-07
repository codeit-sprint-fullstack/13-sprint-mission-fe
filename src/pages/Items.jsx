import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import ItemListGeneral from "../components/ItemListGeneral";
import ItemListBest from "../components/ItemListBest";

const Items = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container">
        <section>
          <ItemListBest />
        </section>
        <section>
          <ItemListGeneral />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Items;
